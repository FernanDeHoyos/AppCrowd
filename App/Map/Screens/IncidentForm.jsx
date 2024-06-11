import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { useIncidentStore } from '../../hooks/useIncidentStore'; 
import {  UpImagePicker } from '../../Helpers/ImagePicker';
import { Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { LoadingOverlay } from '../Components/LoadingOverlay';

export const IncidentForm = ({coordenadas}) => {
  const navigate = useNavigation()
  const {addNewIncident, startUploadingFiles, images_url} = useIncidentStore()
  const {user: {uid}} = useSelector(state => state.auth)

  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [additionalOption, setAdditionalOption] = useState('');
  const [additionalOptions, setAdditionalOptions] = useState([]);

  const [images, setImages] = useState([]);
  const [isDisable, setIsDisable] = useState(false)
  const [isDisableEnviar, setIsDisableEnviar] = useState(false)
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    if(description.length <= 1 )  return setIsDisable(true)
    if(description.length > 1) return setIsDisable(false)
  }, [description])
  
  const handlePickImage = async () => {
    const newImages = await UpImagePicker(); 
    setImages(prevImages => [...prevImages, ...newImages]); 
  };

  const handleSubmit = async () => {
    
    // Verificar que los campos requeridos no estén vacíos
    if (!severity || !description || !coordenadas) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor completa todos los campos.',
        visibilityTime: 6000
      });
      return;
    }
    
    // Verificar que la opción adicional esté seleccionada si es requerida
    if (additionalOptions.length > 0 && !additionalOption) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor selecciona una opción adicional.',
        visibilityTime: 6000
      });
      return;
    }
  
    // Confirmación antes de enviar los datos
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas enviar los datos?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Enviar',
          onPress: async () => {
            setIsDisableEnviar(true);
            setIsLoading(true);
            try {
              const URLPhotos = await startUploadingFiles(images);
              await addNewIncident({severity, additionalOption, description, coordenadas, uid, images_url: URLPhotos });
              setIsDisableEnviar(false);
              await showSuccessAlert()
              setSeverity('');
              setDescription('');
              setAdditionalOption('');
              setAdditionalOptions([])
              setImages([]);
              setIsLoading(false);
              navigate.navigate('ListIncidents');
            } catch (error) {
              Alert.alert('Error', 'Hubo un problema al enviar el reporte. Por favor intenta de nuevo.');
              setIsDisableEnviar(false);
              setIsLoading(false);

            }
          }
        }
      ]
    );

    const showSuccessAlert = async() => {
      Toast.show({
        type: 'info',
        text1: 'Exito',
        text2: 'Reporte enviado para verificar su veracidad',
        visibilityTime: 6000
      });
    };
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

      <Button style={styles.Button}
              textColor='#fff' 
              icon={'upload'}  
              onPress={handlePickImage} 
              disabled={isDisable} > subir evidencia </Button>
      <ScrollView horizontal>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
          <Button 
          disabled={isDisableEnviar} 
          style={styles.Button} 
          textColor='#fff' 
          icon={'send'}  
          onPress={handleSubmit} >
             Enviar 
          </Button>
          <LoadingOverlay visible={isLoading} />
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
    elevation: 5
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10, // Agrega un margen derecho para separar las imágenes
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
  backgroundColor: '#2fc4b2',
  marginBottom: 10
}
  
  
});
