import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'react-native';
import { store } from './App/Store/Store';
import { Provider } from 'react-redux';
import { AppMap } from './App/AppMap';
import { NotificationsIncident } from './App/Map/Screens/Notifications';
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default function App() {

  // Configuración con tu ID de cliente de Firebase (lo obtienes en la consola de Firebase)
  GoogleSignin.configure({
    webClientId: '752793504199-01r71q4n9p314vd4lfap7u4n34tc115q.apps.googleusercontent.com', // Reemplaza con tu Web Client ID de Firebase
  });

  return (
    
    <Provider store={store}>
    <StatusBar backgroundColor={'#2FC4B2'} />
    {/* <NotificationsIncident/> VVEJHFSXCN67LGR86C7AM19Q*/ }
    <AppMap></AppMap>
    <Toast />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
