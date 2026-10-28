import { useEffect, useState } from 'react';
import { fetchWeather } from './api/fetchWeather.js';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);

  // Aktualizujemy komunikat, gdy połączenie zostanie utracone lub przywrócone.
  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const search = async (e) => {
    e.preventDefault(); // formularz nie przeładowuje strony
    if (!query.trim()) return; // puste pole - nic nie robimy
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery(''); // czyścimy pole po udanym wyszukiwaniu
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-container">
      <h1 className="app-heading">Pogoda PWA</h1>
      <form onSubmit={search} role="search">
        <label htmlFor="city-search" className="sr-only">Nazwa miasta</label>
        <input
          id="city-search"
          type="search"
          className="search"
          placeholder="Wpisz miasto..."
          autoComplete="address-level2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button" disabled={loading}>
          Szukaj
        </button>
      </form>

      {loading && <p className="message" role="status">Pobieranie danych...</p>}
      {error && <p className="message error" role="alert">{error}</p>}

      {!online && (
        <p className="message offline" role="status">
          Brak połączenia — pokazuję ostatnio pobrane dane.
        </p>
      )}

      {weather && (
        <section className="city" aria-label={`Pogoda w mieście ${weather.name}`}>
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys?.country}</sup>
          </h2>

          <div className="city-temp">
            {Math.round(weather.main.temp)}<sup>°C</sup>
          </div>

          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              width="100"
              height="100"
            />
            <p>{weather.weather[0].description}</p>
          </div>

          <div className="weather-details">
            <p>Ciśnienie: <strong>{weather.main.pressure} hPa</strong></p>
            <p>Wilgotność: <strong>{weather.main.humidity}%</strong></p>
            <p>Wiatr: <strong>{weather.wind.speed} m/s</strong></p>
            {typeof weather.wind.gust === 'number' && (
              <p>Porywy wiatru: <strong>{weather.wind.gust} m/s</strong></p>
            )}
            {typeof weather.wind.deg === 'number' && (
              <p>Kierunek wiatru: <strong>{weather.wind.deg}°</strong></p>
            )}
            <p>Pomiar: <strong>{new Date(weather.dt * 1000).toLocaleTimeString('pl-PL', {
              hour: '2-digit', minute: '2-digit'
            })}</strong></p>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
