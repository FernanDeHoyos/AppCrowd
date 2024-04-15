import {Button, Text, TextInput, StyleSheet, View, Alert } from 'react-native';
import { supabase } from '../../lib/supabase'; 
import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { userAuthStore } from '../../Helpers/userAuthStore';


export const Login = ({ navigation }) => {

  console.log('first')

  const {startLogin} = userAuthStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { values, handleChange, resetForm } = useForm({
        email: '',
        password: '',
      });
      const {email, password} = values


    

    async function signInWithEmail() {
     await startLogin({email, password})
  }
      

  async function signUpWithEmail() {
    setLoading(true)
    const {data: { session }, error,} = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

 
  return (
    <View style={styles.container}>
     <Text style={styles.title}>Welcome to MyApp!</Text>

    <View style={styles.containerButtom}>
    <Text style={styles.TextInput}>Login</Text>
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
              }} color='#000'
    disabled={loading} 
    /> 

  

    </View>

    <Button titleStyle={{ marginHorizontal: 20, color: 'black' }} onPress={() => navigation.navigate('Register')} title={'¿No tiene cuenta?'} type='clear'/>
    </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#000', 
        paddingTop: 200
      },
    containerButtom: {
      flex: 1,
      width: '100%',
      backgroundColor: '#f6f6f6',
      alignItems: "center",
      justifyContent: 'space-evenly',
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
 

 