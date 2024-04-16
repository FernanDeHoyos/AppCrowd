import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useIncidentStore } from '../../hooks/useIncidentStore'; 
import {  useSelector } from 'react-redux';

export const IncidentForm = ({coordenadas}) => {

  const {addNewIncident} = useIncidentStore()
  const {user: {uid}} = useSelector(state => state.auth)

  
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [additionalOption, setAdditionalOption] = useState('');
  const [additionalOptions, setAdditionalOptions] = useState([]);

  const handleSubmit = async () => {
    // Verificar que los campos requeridos no estén vacíos
    if (!severity || !description || !coordenadas) {
      console.log('Por favor completa todos los campos.');
      return;
    }
    
    // Verificar que la opción adicional esté seleccionada si es requerida
    if (additionalOptions.length > 0 && !additionalOption) {
      console.log('Por favor selecciona una opción adicional.');
      return;
    }
  
    // Enviar el formulario si todos los campos requeridos están completos
    await addNewIncident({severity, additionalOption, description, coordenadas, });
    console.log({severity, additionalOption, description, coordenadas, uid});
  };
  

  const getLocation =  () => {
    console.log(coordenadas)
  };

  const handleSeverityChange = (value) => {
    setSeverity(value);
    // Aquí puedes definir las opciones adicionales dependiendo de la gravedad seleccionada
    switch (value) {
      case 'Bajo riesgo':
        setAdditionalOptions(['Robo de bolsos', 'Pelea callejera', 'Amenaza con violencia', 'Acoso sexual']);
        break;
      case 'Mediano riesgo':
        setAdditionalOptions(['Consumo de drogas en vía pública', 'Hurto en comercios', 'Atención a menores']);
        break;
      case 'Alto riesgo con apoyo':
        setAdditionalOptions(['Asalto con arma de fuego en proceso', 'Violencia doméstica con agresión', 'Herido con arma de fuego', 'Riña con disturbios']);
        break;
      default:
        setAdditionalOptions([]);
    }
    setAdditionalOption(''); // Reinicia la opción adicional seleccionada
  };

 

  return (
    <View style={styles.container}>
      
      <Divider/>
      <RNPickerSelect
        placeholder={{ label: 'Selecciona la gravedad', value: null }}
        onValueChange={(value) => handleSeverityChange(value)}
        items={[
          { label: 'Bajo riesgo', value: 'Bajo riesgo' },
          { label: 'Mediano riesgo', value: 'Mediano riesgo' },
          { label: 'Alto riesgo con apoyo', value: 'Alto riesgo con apoyo' },
        ]}
      />
      {additionalOptions.length > 0 && (
        <RNPickerSelect
          placeholder={{ label: 'Selecciona una opción adicional', value: null }}
          onValueChange={(value) => setAdditionalOption(value)}
          items={additionalOptions.map((option) => ({ label: option, value: option }))}
        />
      )}
<TextInput
        style={styles.Input}
        placeholder="Breve descripción del incidente"
        value={description}
        multiline
        onChangeText={(text) => setDescription(text)}
      />
          
          <Button style={styles.Button} textColor='#fff' icon={'send'}  onPress={handleSubmit} > Enviar </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: 'flex-end',
    backgroundColor: '#FFF',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 10,
    padding: 10,
  },
  Input: {
    width: '100%', 
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    backgroundColor: '#F4F4F9',
    marginBottom: 10
},
Button: {
  width: '100%',
  borderRadius: 10,
  backgroundColor: '#2fc4b2'
}
  
  
});