import { Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { supabase } from "../lib/supabase"
import { checkingCredentials, clearErrorMessage, login, logout } from "../Store/Auth/AuthSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { onLogoutIncident } from "../Store/Incident/IncidentSlice"


export const useAuthStore = () => {

    const { status } = useSelector(state => state.auth)
    const data_auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    /* Funcion asincrona para iniciar autenticacion de usuario */
    const startLogin = async ({ email, password }) => {
        try {
            dispatch(checkingCredentials())
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
            console.log(data);
            // Dispatch de la acción de login
            dispatch(login({ name: user.email, uid: user.id }));

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


    /* Funcion asincrona para iniciar registro de usuario */
    const startSignUp = async ({ email, password, first_name, last_name, phone, age }) => {

        /* Obtenemos los datos y los enviamos a la db */
        const { data, error } = await supabase.auth.signUp(
            {
                email: email,
                password: password,
                options: {
                    data: {
                        first_name: first_name,
                        last_name: last_name,
                        phone: phone,
                        age: age,
                    }
                }
            }
        )
        /* desestructuramos session de la data */
        const {session} = data
        /* verificamos si hay algun error */
        if (error) Alert.alert(error.message)
         /* Le decimos al usuario que verfifique su email */
        if (!session) Alert.alert('Please check your inbox for email verification!')
       
    }

     /* Funcion asincrona para verficar si el usuario sigue autenticado
      y mantenerlo en la app hasta que su token expire */
    const checkAuthToken = async () => {
        try {
            // Obtener el token de acceso almacenado en AsyncStorage
            const token = await AsyncStorage.getItem('supabaseToken');
            // Verificar si el token está presente
            if (!token) {
                // Si el token no está presente, realizar acciones de logout
                dispatch(logout());
                await AsyncStorage.removeItem('supabaseToken');
                await AsyncStorage.removeItem('userName');
                await AsyncStorage.removeItem('UserId');
                return;
            }

            const username = await AsyncStorage.getItem('userName');
            const uid = await AsyncStorage.getItem('UserId');
            dispatch(login({ name: username, uid: uid }));

        } catch (error) {
            // Manejar cualquier error que pueda ocurrir durante el proceso
            console.error('Error during token verification:', error);
            // Realizar acciones de logout en caso de error
            await AsyncStorage.clear();
            dispatch(logout());
        }
    };

    /* Funcion asincrona para hacer logout (cerrar sesion) */
    const startLogout = async () => {
        try {
            const error = await supabase.auth.signOut()
            dispatch(logout()) //ejecutamos el reducer para limpiar las credenciales del usuario
            dispatch(onLogoutIncident()) //ejecutamos el reducer para limpiar las los incidentes del usuario
            //removemos los datos que estan en el storage
            await AsyncStorage.removeItem('supabaseToken');
            await AsyncStorage.removeItem('userName');
            await AsyncStorage.removeItem('UserId');
            console.log(error);
        } catch (error) {
            console.log(error);
        }
    }


    return {
        //variables
        status,
        data_auth,
        //funciones
        startLogin,
        checkAuthToken,
        startSignUp,
        startLogout,

    }
}
