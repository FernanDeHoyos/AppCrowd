import React, { useState } from 'react';
import { TextInput, Text, StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import { useForm } from '../../hooks/useForm'; // Importa el hook personalizado useForm para gestionar el estado del formulario
import { useAuthStore } from '../../hooks/useAuthStore';
import Toast from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Register = ({ navigation }) => {
  const { startSignUp } = useAuthStore();
  const [disable, setIsDisable] = useState(false)
  // Usa el hook useForm para manejar el estado del formulario
  const { handleChange, resetForm, values } = useForm({
    first_name: '',
    last_name: '',
    phone: '',
    age: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const [showPassword, setShowPassword] = useState(false); 
  
    // Function to toggle the password visibility state 
    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 
  // Extrae los valores del estado del formulario
  const { first_name, last_name, phone, age, email, password, confirm_password } = values;

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[0-9]+$/;

    if (
      !first_name.trim() ||
      !last_name.trim() ||
      !phone.trim() ||
      !age.trim() ||
      !email.trim() ||
      !password ||
      !confirm_password
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor completa todos los campos.',
        position: 'bottom',
        visibilityTime: 3000
      });
      return false;
    }

    if (!numberRegex.test(phone.trim())) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El celular debe contener solo números.',
        position: 'bottom',
        visibilityTime: 3000
      });
      return false;
    }

    if (!numberRegex.test(phone.trim())) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El celular debe contener solo números.',
        position: 'bottom',
        visibilityTime: 3000
      });
      return false;
    }

    if (age < 18 || age > 100) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Edad no permitida',
        position: 'bottom',
        visibilityTime: 3000
      });
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor ingresa un correo electrónico válido.',
        position: 'bottom',
        visibilityTime: 3000
      });
      return false;
    }

    if (password !== confirm_password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Las contraseñas no coinciden.',
        position: 'bottom',
        visibilityTime: 3000
      });
      return false;
    }

    return true;
  };

  // Función para manejar el registro de usuarios
  const handleRegister = async () => {
    setIsDisable(true)
    if (!validateInputs()) {
      setIsDisable(false)
      return;  // Detiene la ejecución si la validación falla
    }
    await startSignUp({ 
      first_name: first_name.trim(), 
      last_name: last_name.trim(), 
      phone: phone.trim(), 
      age: age.trim(), 
      email: email.trim(), 
      password: password.trim() 
    });
    resetForm()
    setIsDisable(false)
    navigation.navigate('Login')
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={80} // Ajusta según sea necesario
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Registrate</Text>

        <View style={styles.containerButtom}>
          <View style={styles.containerBoxInput}>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.Input}
                placeholder='Nombre'
                onChangeText={(text) => handleChange('first_name', text)}
                value={first_name}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.Input}
                placeholder='Apellido'
                onChangeText={(text) => handleChange('last_name', text)}
                value={last_name}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.Input}
                placeholder='Celular'
                onChangeText={(text) => handleChange('phone', text)}
                value={phone}
                keyboardType='numeric'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.Input}
                placeholder='Ingrese su edad'
                onChangeText={(text) => handleChange('age', text)}
                value={age}
                keyboardType='numeric'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.Input}
                placeholder='ejemplo@gmail.com'
                onChangeText={(text) => handleChange('email', text)}
                value={email}
                keyboardType='email-address'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.Input}
                placeholder='Contraseña'
                onChangeText={(text) => handleChange('password', text)}
                value={password}
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
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.Input}
                placeholder='Confirme su contraseña'
                onChangeText={(text) => handleChange('confirm_password', text)}
                value={confirm_password}
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
            <View>
              <Button 
                title='REGISTRARSE'
                buttonStyle={{
                  borderRadius: 10,
                  borderTopRightRadius: 0,
                  backgroundColor: '#117C6F'
                }} color='#117C6F'
                disabled={disable}
                onPress={handleRegister}
              />
            </View>
          </View>
          <Button 
            titleStyle={{ marginHorizontal: 20, color: 'black' }} 
            onPress={() => navigation.navigate('Login')} 
            title={'Ya tengo cuenta'} 
            type='clear'
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#117C6F',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  containerButtom: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    alignItems: "center",
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 80,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  containerBoxInput: {
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
    paddingLeft: 5,
  },
});

