import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'react-native';
import { store } from './App/Store/Store';
import { Provider } from 'react-redux';
import { AppMap } from './App/AppMap';
import { NotificationsIncident } from './App/Map/Screens/Notifications';
import Toast from 'react-native-toast-message';

export default function App() {

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
 
