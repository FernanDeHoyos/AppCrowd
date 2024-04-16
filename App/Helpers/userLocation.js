import * as Location from 'expo-location';

export const userLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permiso de ubicación denegado');
  }

  let location = await Location.getCurrentPositionAsync({});

  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
  };
  
};
