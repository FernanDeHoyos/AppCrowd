import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapForm } from './MapForm';
import { MapCollective } from './MapCollective';
import { Settings } from './Settings';
import { ListIncidents } from './ListIncidents';
import { SegmentFilters } from '../Components/SegmentFilters';

const Stack = createNativeStackNavigator();

export const StackMap = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="MapCollective">
        <Stack.Screen
          name="MapForm"
          component={MapForm}
          options={{
            headerTitle: 'MapForm',
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
            headerTitle: 'CollectiveMap',
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
            headerTitle: 'Settings',
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
            headerTitle: 'ListIncidents',
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
