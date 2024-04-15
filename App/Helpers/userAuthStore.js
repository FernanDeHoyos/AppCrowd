import { Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { supabase } from "../lib/supabase"
import { checkingCredentials, clearErrorMessage, login, logout } from "../Store/Auth/AuthSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"


export const userAuthStore = () => {

    const {status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async({email, password}) => {
        try {
            dispatch(checkingCredentials())
            console.log({ email, password });
            const { error, data } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                Alert.alert(error.message);
                return;
            }
    
            // Obtener el token de acceso y otros datos relevantes
            const { session, user } = data;
    
            // Guardar el token de acceso en AsyncStorage
            await AsyncStorage.setItem('supabaseToken', session.access_token);
    
            // Guardar otros datos relevantes (opcional)
            // Por ejemplo, puedes guardar el nombre del usuario
            await AsyncStorage.setItem('userName', user.email);
            await AsyncStorage.setItem('UserId', user.id);
    
            // Dispatch de la acción de login
            dispatch(login({ name: user.email, uid: user.id }));
    
            console.log(data);
        } catch (error) {
            dispatch(logout('Error de autenticacion'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)

          await AsyncStorage.removeItem('supabaseToken');
            console.error('Error during login:', error);
            Alert.alert('An error occurred during login. Please try again later.');
        }
    }

    const checkAuthToken = async () => {
        try {
            // Obtener el token de acceso almacenado en AsyncStorage
            const token = await AsyncStorage.getItem('supabaseToken');
            console.log(token)
            // Verificar si el token está presente
            if (!token) {
                // Si el token no está presente, realizar acciones de logout
                dispatch(logout());
                return;
            } 

            const username = await AsyncStorage.getItem('userName');
            const uid = await AsyncStorage.getItem('userId');
            dispatch(login({ name: username, uid: uid }));
            
        } catch (error) {
            // Manejar cualquier error que pueda ocurrir durante el proceso
            console.error('Error during token verification:', error);
            // Realizar acciones de logout en caso de error
            await AsyncStorage.clear();
            dispatch(logout());
        }
    };
    

  return {

    status,
    startLogin,
    checkAuthToken,

  }
}
