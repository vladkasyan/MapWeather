import 'leaflet/dist/leaflet.css';
import './style.css';
import { initMap } from './modules/map.js';
import { fetchWeather } from './modules/api.js';
import { renderGoals } from './components/renderGoals.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <h1>Pogodowy Planer Podróży</h1>

  <div class="layout">

    <section class="map-section">
      <h2>Mapa świata</h2>
      <div id="map" class="map-container"></div>
    </section>
    <section class="panel-section">
      <h2>Moje cele podróży</h2>

      <div class="weather-box">
        <h3>Aktualna pogoda</h3>
        <p id="weather-info">
          Kliknij na mapę, aby pobrać prognozę pogody dla wybranego miejsca.
        </p>
      </div>

      <div class="note-box">
        <label for="note-input">Notatka do miejsca:</label>
        <input 
          type="text" 
          id="note-input" 
          placeholder="np. Paryż – zabrać parasol" 
        />
      </div>

      <button id="add-goal-btn" disabled>
        Dodaj do listy celów
      </button>

      <ul id="goals-list" class="goals-list">
      
      </ul>
    </section>
  </div>
`;

const weatherInfo = document.getElementById('weather-info');
const noteInput = document.getElementById('note-input');
const addGoalBtn = document.getElementById('add-goal-btn');
const goalsList = document.getElementById('goals-list');

const goals = [];                   
let lastSelectedPlace = null;       

initMap(async (lat, lng) => {
  weatherInfo.textContent = 'Ładowanie pogody...';
  addGoalBtn.disabled = true;

  try {
    const weather = await fetchWeather(lat, lng);

    lastSelectedPlace = { lat, lng, weather };

    weatherInfo.textContent =
      `Temperatura: ${weather.temperature}°C, ` +
      `wiatr: ${weather.windspeed} km/h`;

    addGoalBtn.disabled = false;
  } catch (err) {
    console.error(err);
    weatherInfo.textContent = 'Nie udało się pobrać pogody 😢';
  }
});

addGoalBtn.addEventListener('click', () => {
  if (!lastSelectedPlace) {
    alert('Najpierw wybierz miejsce na mapie!');
    return;
  }

  const note = noteInput.value.trim();

  const newGoal = {
    id: Date.now(),
    lat: lastSelectedPlace.lat,
    lng: lastSelectedPlace.lng,
    weather: lastSelectedPlace.weather,
    note: note
  };

  goals.push(newGoal);

  noteInput.value = '';
  addGoalBtn.disabled = true;

  renderGoals(goals, goalsList);
});

