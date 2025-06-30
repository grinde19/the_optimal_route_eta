import axios from 'axios';

export async function geocodeAddress(address) {
  const response = await axios.get('https://api.openrouteservice.org/geocode/search', {
    params: {
      api_key: process.env.ORS_API_KEY,
      text: address,
      size: 1
    }
  });

  const features = response.data.features;
  if (!features.length) throw new Error(`No se encontraron coordenadas para la dirección: ${address}`);

  const [lon, lat] = features[0].geometry.coordinates;
  return { lat, lon };
}

export async function getTravelTime(origen, destino) {
  const origenCoord = await geocodeAddress(origen);
  console.log('🛰️ Coordenadas de origen:', origenCoord);
  const destinoCoord = await geocodeAddress(destino);
  console.log('🛰️ Coordenadas de destino:', destinoCoord);

  if (!origenCoord || !destinoCoord) {
    throw new Error(`No se pudieron obtener coordenadas para origen o destino`);
  }

  const url = 'https://api.openrouteservice.org/v2/directions/driving-car';
  const headers = {
    Authorization: `Bearer ${process.env.ORS_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const body = {
    coordinates: [
      [origenCoord.lon, origenCoord.lat],
      [destinoCoord.lon, destinoCoord.lat],
    ],
  };

  const response = await axios.post(url, body, { headers });

  const ruta = response.data.routes[0];
  const duration = ruta?.summary?.duration;

  if (typeof duration !== 'number' || isNaN(duration)) {
    throw new Error(`Duración no válida para la ruta entre "${origen}" y "${destino}"`);
  }

  const minutos = Math.ceil(duration / 60);
  return minutos;
}
