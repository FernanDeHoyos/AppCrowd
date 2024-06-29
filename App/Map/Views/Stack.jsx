import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapForm } from './MapForm';
import { MapCollective } from './MapCollective';
import { Settings } from './Settings';
import { ListIncidents } from './ListIncidents';
import { useSelector } from 'react-redux';
import { HeaderStyle } from '../Components/HeaderStyle';
import { Profiles } from './Profiles';
import { IsConfirmed } from './IsConfirmed';
import { NotificationsIncident } from '../Screens/Notifications';





export const StackMap = () => {

  const Stack = createNativeStackNavigator();

  const { user: { name } } = useSelector((state) => state.auth)

  console.log(name);

  return (
    <>
      <Stack.Navigator initialRouteName="MapCollective">
        <Stack.Screen
          name="MapForm"
          component={MapForm}
          options={{
            headerTitle: 'Agregar incedente',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2FC4B2', // Color del encabezado
              height: 60, // Altura del encabezado
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold', // Estilo del título
              fontSize: 18, // Tamaño del título
            },
          }}
        />
        <Stack.Screen
          name="MapCollective"
          component={MapCollective}
          options={{
            headerTitle: () => <HeaderStyle name={name} />,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2FC4B2', // Color del encabezado
              height: 60, // Altura del encabezado
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold', // Estilo del título
              fontSize: 18, // Tamaño del título
            },
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitle: 'Configuraciones',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2FC4B2', // Color del encabezado
              height: 0, // Altura del encabezado
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold', // Estilo del título
              fontSize: 18, // Tamaño del título
            },
          }}
        />
        <Stack.Screen
          name="ListIncidents"
          component={ListIncidents}
          options={{
            headerTitle: 'Lista incidentes',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2FC4B2', // Color del encabezado
              height: 0, // Altura del encabezado
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold', // Estilo del título
              fontSize: 18, // Tamaño del título
            },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={Profiles}
          options={{
            headerTitle: 'Perfil',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2FC4B2', // Color del encabezado
              height: 0, // Altura del encabezado
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold', // Estilo del título
              fontSize: 18, // Tamaño del título
            },
          }}
        />

        <Stack.Screen
          name="noConfirmed"
          component={IsConfirmed}
          options={{
            headerTitle: 'En espera',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2FC4B2', // Color del encabezado
              height: 0, // Altura del encabezado
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold', // Estilo del título
              fontSize: 18, // Tamaño del título
            },
          }}
        />

<Stack.Screen
          name="notification"
          component={NotificationsIncident}
          options={{
            headerTitle: 'En espera',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#2FC4B2', // Color del encabezado
              height: 0, // Altura del encabezado
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold', // Estilo del título
              fontSize: 18, // Tamaño del título
            },
          }}
        />

      </Stack.Navigator>
    </>
  );
};
