import React from 'react';
import { TextInput, Text, StyleSheet, View} from 'react-native';
import { Button } from 'react-native-elements';

import { useForm } from '../../hooks/useForm'; // Importa el hook personalizado useForm para gestionar el estado del formulario
import { useAuthStore } from '../../hooks/useAuthStore';

export const Register = ({ navigation }) => {

  const {startSignUp} = useAuthStore()
  // Usa el hook useForm para manejar el estado del formulario
  const {handleChange, resetForm, values} = useForm({
    first_name: '',
    last_name: '',
    phone: '',
    age: '',
    email: '',
    password:''
  });

  // Extrae los valores del estado del formulario
  const {first_name, last_name, phone, age, email, password} = values;

  // Función para manejar el registro de usuarios
  const handleRegister = async() => {
    await startSignUp({ first_name, last_name, phone, age, email, password })
  }


  return (
    <View style={styles.container}>
      {/* Título de bienvenida */}
      <Text style={styles.title}>Welcome to MyApp!</Text>

      {/* Contenedor principal */}
      <View style={styles.containerButtom}>
        {/* Texto de registro */}
        <Text style={styles.TextInput}>SignUp</Text>
        {/* Contenedor de campos de entrada */}
        <View style={styles.containerBoxInput}>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>First name</Text>
            <TextInput 
              style={styles.Input}
              placeholder='Enter your firs name'
              onChangeText={(text) => handleChange('first_name', text)} // Maneja cambios en el campo de teléfono
              value={first_name}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last name</Text>
            <TextInput 
              style={styles.Input}
              placeholder='Enter your last name'
              onChangeText={(text) => handleChange('last_name', text)} // Maneja cambios en el campo de teléfono
              value={last_name}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput 
              style={styles.Input}
              placeholder='Enter your phone'
              onChangeText={(text) => handleChange('phone', text)} // Maneja cambios en el campo de teléfono
              value={phone}
            />
          </View> 
          {/* Campo de entrada para el teléfono */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age</Text>
            <TextInput 
              style={styles.Input}
              placeholder='Enter your Age'
              onChangeText={(text) => handleChange('age', text)} // Maneja cambios en el campo de teléfono
              value={age}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.Input}
              placeholder='Enter your email'
              onChangeText={(text) => handleChange('email', text)} // Maneja cambios en el campo de teléfono
              value={email}
            />
          </View>
          {/* Campo de entrada para la contraseña */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.Input}
              onChangeText={(text) => handleChange('password', text)} // Maneja cambios en el campo de contraseña
              placeholder='Enter your password'
              value={password}
              secureTextEntry={true} // Oculta la contraseña
            />
          </View>
          {/* Botón de registro */}
          <View>
            <Button 
              title='Register'
              onPress={handleRegister} // Llama a la función para manejar el registro
            />
          </View>
        </View>
        {/* Botón para navegar a la pantalla de inicio de sesión */}
        <Button 
          titleStyle={{ marginHorizontal: 20, color: 'black' }} 
          onPress={() => navigation.navigate('Login')} 
          title={'Ya tengo cuenta'} 
          type='clear'
        />
      </View>
    </View>
  )
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#117C6F', 
    paddingTop: 100
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
