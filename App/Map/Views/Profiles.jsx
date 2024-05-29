import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuthStore } from '../../hooks/useAuthStore';

export const Profiles = ({ navigation }) => {
  const { data_auth:{user} } = useAuthStore(); // Suponiendo que useAuthStore proporciona la información del usuario
   console.log(user);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
         <Image
          source={{ uri: user?.profileImage || 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        /> 
        <Text style={styles.name}>{user?.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <Text style={styles.info}>{user?.email}</Text>

        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.info}>{user?.phone}</Text>

        <Text style={styles.label}>Edad</Text>
        <Text style={styles.info}>{user?.age}</Text>
      </View>
      <Button
        title="Editar Perfil"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('EditProfile')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f6f6f6',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  
});

