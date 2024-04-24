import * as Location from 'expo-location'; // Importa todas las funciones y componentes exportados desde 'expo-location'

// Función asincrónica para obtener la ubicación del usuario
export const userLocation = async () => {
  // Solicita permisos de ubicación al usuario y obtiene el estado de los permisos
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permiso de ubicación denegado'); // Lanza un error si los permisos no fueron concedidos
  }
  let location = await Location.getCurrentPositionAsync({});
  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude, 
  };
};
