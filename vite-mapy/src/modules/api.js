const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeather(lat, lng) {
  const url = `${BASE_URL}?latitude=${lat}&longitude=${lng}&current_weather=true`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Nie udało się pobrać pogody');
  }

  const data = await response.json();

  return data.current_weather;
}
