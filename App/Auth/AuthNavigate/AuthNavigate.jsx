import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Register } from '../Screens/Register';
import { Login } from '../Screens/Login';


const Stack = createNativeStackNavigator();

/* Se define la navegacion antes de la autenticacion */
export const AuthNavigate = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </>
  );
}