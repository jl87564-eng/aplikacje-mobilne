// Nowa wersja service workera od razu przejmuje stronę (bez czekania na zamknięcie kart).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// Kliknięcie w powiadomienie: zamykamy je i otwieramy adres zapisany w "data.url".
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || './';
  event.waitUntil(self.clients.openWindow(url));
});

// Wiadomość z serwera: oczekujemy JSON-a {"title": "...", "body": "..."},
// ale obsługujemy też zwykły tekst (np. z przycisku "Push" w DevTools).
self.addEventListener('push', (event) => {
  let message = { title: 'Web Push', body: event.data ? event.data.text() : '' };
  try {
    message = event.data.json();
  } catch (err) {
    // to nie był JSON - zostaje tekst
  }
  event.waitUntil(
    self.registration.showNotification(message.title, {
      body: message.body,
      icon: 'android.png',
      data: { url: './' },
    })
  );
});
