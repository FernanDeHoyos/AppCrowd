import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useAuthStore } from '../../hooks/useAuthStore';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export const Settings = () => {
  const navigation = useNavigation()
  const { startLogout } = useAuthStore();

  const onLogout = async () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas salir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Enviar',
          onPress: async () => {
            await startLogout();
          }
        }
      ]
    );
   
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Button
          title="Mi perfil"
          icon={<Icon name="user" type="feather" size={20} color="white" />}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText
          }
          onPress={() => navigation.navigate('EditProfile')}
        />
        <Button
          title="Logout"
          icon={<Icon name="log-out" type="feather" size={20} color="white" />}
          buttonStyle={[styles.button, styles.logoutButton]}
          titleStyle={styles.buttonText}
          onPress={onLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    marginVertical: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
    backgroundColor: '#117C6F',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
  }
});
