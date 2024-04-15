import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

export const IncidentForm = ({coordenadas}) => {

  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [additionalOption, setAdditionalOption] = useState('');
  const [additionalOptions, setAdditionalOptions] = useState([]);

  const handleSubmit = async () => {
    console.log(coordenadas)
    console.log(severity)
    console.log(additionalOption)
    console.log(description)
  };

  const getLocation =  () => {
    console.log(coordenadas)
  };

  const handleSeverityChange = (value) => {
    setSeverity(value);
    // Aquí puedes definir las opciones adicionales dependiendo de la gravedad seleccionada
    switch (value) {
      case 'leve':
        setAdditionalOptions(['Opción 1', 'Opción 2']);
        break;
      case 'medio':
        setAdditionalOptions(['Opción 3', 'Opción 4']);
        break;
      case 'grave':
        setAdditionalOptions(['Opción 5', 'Opción 6']);
        break;
      default:
        setAdditionalOptions([]);
    }
    setAdditionalOption(''); // Reinicia la opción adicional seleccionada
  };

 

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.Input}
        placeholder="Breve descripción del incidente"
        value={description}
        multiline
        onChangeText={(text) => setDescription(text)}
      />
      <Divider/>
      <RNPickerSelect
        placeholder={{ label: 'Selecciona la gravedad', value: null }}
        onValueChange={(value) => handleSeverityChange(value)}
        items={[
          { label: 'Leve', value: 'leve' },
          { label: 'Medio', value: 'medio' },
          { label: 'Grave', value: 'grave' },
        ]}
      />
      {additionalOptions.length > 0 && (
        <RNPickerSelect
          placeholder={{ label: 'Selecciona una opción adicional', value: null }}
          onValueChange={(value) => setAdditionalOption(value)}
          items={additionalOptions.map((option) => ({ label: option, value: option }))}
        />
      )}

          
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
},
Button: {
  width: '100%',
  borderRadius: 10,
  backgroundColor: '#2fc4b2'
}
  
  
});
