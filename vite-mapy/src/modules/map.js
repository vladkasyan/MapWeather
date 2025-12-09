import L from 'leaflet';

export function initMap(onLocationClick) {
  const map = L.map('map').setView([51.5, 0], 3);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  map.on('click', (event) => {
    const { lat, lng } = event.latlng;
    console.log('Klik na mapie:', lat, lng);

    if (typeof onLocationClick === 'function') {
      onLocationClick(lat, lng);
    }
  });
}
