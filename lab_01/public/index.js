if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then((reg) => console.log('Service worker zarejestrowany, zakres:', reg.scope))
        .catch((err) => console.error('Błąd rejestracji service workera:', err));
}

let deferredPrompt = null;
const installBtn = document.querySelector('.install-button');
window.addEventListener('beforeinstallprompt', (e) => {
 // Blokujemy domyślny komunikat przeglądarki - pokażemy go po kliknięciu naszego przycisku.
 e.preventDefault();
 // Zapamiętujemy zdarzenie, aby wywołać je później.
 deferredPrompt = e;
 // Pokazujemy przycisk instalacji.
 installBtn.hidden = false;
});
installBtn.addEventListener('click', async () => {
 if (!deferredPrompt) return;
 installBtn.hidden = true;
 // Wyświetlamy okno instalacji.
 deferredPrompt.prompt();
 // Czekamy na decyzję użytkownika.
 const { outcome } = await deferredPrompt.userChoice;
 console.log(outcome === 'accepted' ? 'Użytkownik zainstalował aplikację' : 'Użytkownik anulował instalację');
 deferredPrompt = null;
});
window.addEventListener('appinstalled', () => {
 installBtn.hidden = true;
 console.log('Aplikacja została zainstalowana');
});