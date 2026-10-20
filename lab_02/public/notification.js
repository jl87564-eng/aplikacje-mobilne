
const permissionInfo = document.querySelector('#permission');

function updatePermissionInfo() {
  permissionInfo.textContent =
    'Notification' in window ? Notification.permission : 'brak obsługi w tej przeglądarce';
}

updatePermissionInfo();

document.querySelector('#enable').addEventListener('click', async () => {
  const permission = await Notification.requestPermission();
  console.log('Uprawnienie:', permission);
  updatePermissionInfo();
});

function showLocalNotification() {
  if (Notification.permission !== 'granted') {
    alert('Najpierw włącz powiadomienia.');
    return;
  }
  try {
    const notification = new Notification('Title', {
      body: 'Message body',
      icon: 'android.png',
    });
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  } catch (err) {
    // np. Chrome na Androidzie: "Illegal constructor" - tam działa tylko powiadomienie z service workera
    alert('Ta przeglądarka nie obsługuje new Notification(): ' + err.message);
  }
}

document.querySelector('#local').addEventListener('click', showLocalNotification);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .catch((err) => console.error('Błąd rejestracji service workera:', err));
}

async function showSwNotification() {
  if (Notification.permission !== 'granted') {
    alert('Najpierw włącz powiadomienia.');
    return;
  }
  const registration = await navigator.serviceWorker.ready;
  await registration.showNotification('Powiadomienie z service workera', {
    body: 'Kliknij, aby otworzyć aplikację.',
    icon: 'android.png',
    data: { url: './' },
  });
}

document.querySelector('#sw').addEventListener('click', showSwNotification);

const VAPID_PUBLIC_KEY = 'BLwqM76Lr3ch_mTorM2GXqOUJXsuyCJW-WYv-tXE_bhaI39UZss42Lng_aU25IOhjviZMKoUGFhqSQbTHfOjUbo';
const subscriptionField = document.querySelector('#subscription');

// Klucz VAPID jest zapisany w base64url, a pushManager.subscribe() oczekuje tablicy bajtów.
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

async function subscribePush() {
  if (!('PushManager' in window)) {
    alert('Ta przeglądarka nie obsługuje Web Push (na iPhonie: najpierw dodaj aplikację do ekranu początkowego).');
    return;
  }
  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    try {
      // Jeśli użytkownik jeszcze nie wyraził zgody, przeglądarka zapyta o nią teraz.
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    } catch (err) {
      alert('Nie udało się zasubskrybować: ' + err.message);
      return;
    } finally {
      updatePermissionInfo();
    }
  }
  subscriptionField.value = JSON.stringify(subscription, null, 2);
}

async function unsubscribePush() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await subscription.unsubscribe();
  }
  subscriptionField.value = '';
}

document.querySelector('#subscribe').addEventListener('click', subscribePush);
document.querySelector('#unsubscribe').addEventListener('click', unsubscribePush);
document.querySelector('#copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(subscriptionField.value);
    alert('Skopiowano subskrypcję do schowka.');
  } catch (err) {
    // brak dostępu do schowka - zaznaczamy tekst, żeby skopiować go ręcznie (Ctrl+C)
    subscriptionField.select();
    alert('Nie udało się skopiować automatycznie - tekst jest zaznaczony, skopiuj go ręcznie.');
  }
});

document.querySelector('#notification-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const body = document.querySelector('#body').value;
  const icon = document.querySelector('#icon').value;

  if (!title) {
    alert('Podaj tytuł powiadomienia.');
    return;
  }

  if (Notification.permission !== 'granted') {
    alert('Najpierw włącz powiadomienia.');
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  await registration.showNotification(title, {
    body: body,
    icon: icon,
    data: { url: './' },
  });
});
