
import { formatCoords } from '../utils/formatters.js';

export function renderGoals(goals, container) {
  container.innerHTML = '';

  if (goals.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Brak zapisanych celów podróży.';
    container.appendChild(empty);
    return;
  }

  goals.forEach((goal) => {
    const li = document.createElement('li');

    li.textContent =
      `Miejsce: (${formatCoords(goal.lat, goal.lng)}) — ` +
      `temp: ${goal.weather.temperature}°C, ` +
      `wiatr: ${goal.weather.windspeed} km/h` +
      (goal.note ? ` — notatka: ${goal.note}` : '');

    container.appendChild(li);
  });
}
