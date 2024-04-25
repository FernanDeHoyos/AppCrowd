import {  useState } from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore'; 


export const Login = ({ navigation }) => {

    /* Importamos el metodo para iniciar la autenticacion desde useAuthStore*/
    const {startLogin} = useAuthStore()

    const [loading, setLoading] = useState(false)
    /* Hooks personalizado para formulario {useForm} */
    const { values, handleChange, resetForm } = useForm({
        email: '',
        password: '',
      });

    /* Desestructuramos valores de values */
    const {email, password} = values

    /* utilizamos  startLogin dentro de la funcion signInWithEmail
    Para iniciar autenticacion*/
    async function signInWithEmail() {
     await startLogin({email, password})
  }
      

 /* Vista de componentes */
  return (
    <View style={styles.container}>
     <Text style={styles.title}>Welcome to MyApp!</Text>

    <View style={styles.containerButtom}>
    <View style={styles.containerBoxInput}>

    <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
            style={styles.Input}
            placeholder='Enter your email'
            value={values.email}
            onChangeText={(text) => handleChange('email', text)}
        />
    </View>

<View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput 
            style={styles.Input}
            placeholder='Enter your password'
            value={values.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={true}
        />
    </View>
   
    <Button 
    title='Login'
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
        width: '100%', 
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        backgroundColor: '#FFF',
        
    },

    inputContainer: {
        padding: 5,
        backgroundColor: '#FFF',
        borderRadius: 10,

    },
    label: {
        color: '#000',
        paddingLeft: 5
    }, 
   
  });
 

 