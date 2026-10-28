const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '72b0113297365e613c3a3d16c037aa72';
export async function fetchWeather(query) {
 const params = new URLSearchParams({
 q: query.trim().toLowerCase(), // nazwa miasta
 units: 'metric', // stopnie Celsjusza, m/s
 lang: 'pl', // opis pogody po polsku
 appid: API_KEY,
 });
 let response;
 try {
 response = await fetch(`${URL}?${params}`);
 } catch {
 // fetch() zgłasza błąd, gdy w ogóle nie udało się połączyć z serwerem
 throw new Error('Brak połączenia z internetem.');
 }
 if (!response.ok) {
 // serwer odpowiedział, ale z kodem błędu (np. 404 - nie ma takiego miasta)
 if (response.status === 404) throw new Error('Nie znaleziono miasta.');
 if (response.status === 401) throw new Error('Nieprawidłowy lub nieaktywny klucz API.');
 throw new Error(`Błąd serwera pogody (${response.status}).`);
 }
 return response.json();
}
