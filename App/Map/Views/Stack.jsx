import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MapForm } from './MapForm';
import { MapCollective } from './MapCollective';
import { Settings } from './Settings';



const Stack = createNativeStackNavigator();

export const StackMap = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="MapCollective">
        <Stack.Screen name="MapForm" component={MapForm} options={{ headerShown: false }} />
        <Stack.Screen name="MapCollective" component={MapCollective} options={{ headerShown: false }}/>
        <Stack.Screen name="Settings" component={Settings} options={{ headerTitle: 'Settings' }}/>
      </Stack.Navigator>
    </>
  );
}