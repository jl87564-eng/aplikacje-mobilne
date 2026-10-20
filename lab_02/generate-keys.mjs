import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import webpush from 'web-push';

// Klucze generujemy tylko raz - nowe klucze unieważniają wszystkie dotychczasowe subskrypcje.
if (!existsSync('vapid-keys.json')) {
  writeFileSync('vapid-keys.json', JSON.stringify(webpush.generateVAPIDKeys(), null, 2));
}
const keys = JSON.parse(readFileSync('vapid-keys.json', 'utf8'));
console.log('Klucz publiczny VAPID (wklej do public/notification.js):');
console.log(keys.publicKey);
