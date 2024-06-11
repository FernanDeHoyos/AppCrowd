import {  useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';


export const Login = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false); 

    /* Importamos el metodo para iniciar la autenticacion desde useAuthStore*/
    const {startLogin} = useAuthStore()

    const [loading, setLoading] = useState(false)
    /* Hooks personalizado para formulario {useForm} */
    const { values, handleChange, resetForm } = useForm({
        email: '',
        password: '',
      });

  
    // Function to toggle the password visibility state 
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 

    /* Desestructuramos valores de values */
    const {email, password} = values

    
    /* utilizamos  startLogin dentro de la funcion signInWithEmail
    Para iniciar autenticacion*/
    async function signInWithEmail() {
        await startLogin({email: email.trim(), password: password.trim()})
  }
      

 /* Vista de componentes */
  return (
    <View style={styles.container}>
     
     <View style={styles.logo}>
     <Text style={styles.title}>Bienvenido</Text>
     </View>

    <View style={styles.containerButtom}>
    <View style={styles.containerBoxInput}>

    <View style={styles.inputContainer}>
        <TextInput 
            style={styles.Input}
            placeholder='Ingrese correo'
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
        />
    </View>

<View style={styles.inputContainer}>
        <TextInput 
            style={styles.Input}
            placeholder='Ingrese contraseña'
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={!showPassword}
        />
        <MaterialCommunityIcons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={24} 
                    color="#aaa"
                    style={styles.icon} 
                    onPress={toggleShowPassword} 
                /> 
    </View>
   
    <Button 
    title='INICIAR SESION'
    onPress={signInWithEmail}
    buttonStyle={{
                borderRadius: 10,
                borderTopRightRadius: 0,
                backgroundColor: '#117C6F'
              }} color='#117C6F'
    disabled={loading} 
    /> 

  

    </View>

    <Button titleStyle={{ marginHorizontal: 20, color: 'black' }} onPress={() => navigation.navigate('Register')} title={'¿No tiene cuenta?'} type='clear'/>
    </View>
    
    </View>
  )
}

/* Estilos de componentes */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#117C6F', 
        paddingTop: '30%'
      },
    containerButtom: {
      flex: 1,
      width: '100%',
      paddingTop: 10,
      backgroundColor: '#f6f6f6',
      alignItems: "center",
      justifyContent: 'center',
      borderTopLeftRadius: 80,
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },
    TextInput:{
        fontSize: 30,
    },
    containerTop:{
        backgroundColor: '#000',
        height: 80
    },
    containerBoxInput:{
        width: '80%',
        justifyContent: 'space-between',
        gap: 15,
    },
    Input: {
        flex: 1, 
        color: '#000', 
        paddingVertical: 10, 
        paddingRight: 10, 
        fontSize: 16, 
        
    },

    inputContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#FFF', 
        borderRadius: 8, 
        paddingHorizontal: 14, 
    },
    label: {
        color: '#000',
        paddingLeft: 5
    }, 
    logo: {
        paddingBottom: 30
    }
   
  });
 

 