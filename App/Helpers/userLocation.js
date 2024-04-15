import * as Location from 'expo-location';

export const userLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permiso de ubicación denegado');
  }

  let location = await Location.getCurrentPositionAsync({});

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
  
};
