import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, ScrollView } from 'react-native'; // Agrega ScrollView para permitir el desplazamiento si hay muchas imágenes
import * as ImagePicker from 'expo-image-picker';
import { useIncidentStore } from '../../hooks';
import { useSelector } from 'react-redux';

export const SelectImages = () => {
  const {startUploadingFiles} = useIncidentStore()
  const {} = useSelector((state) => state.incident)
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Habilita la selección múltiple de imágenes
    });

    console.log(result);

   
    if (!result.cancelled) {
      const newImages = result.assets.map(asset => asset.uri); // Obtén las URI de las imágenes seleccionadas
      setImages(prevImages => [...prevImages, ...newImages]); // Agrega las nuevas imágenes a la lista existente
    }
  };

  const handleImageSelection = () => {
    startUploadingFiles(images)
   };


  return (
    <View style={styles.container}>
      <Button title="Pick images from gallery" onPress={pickImage} />
      <ScrollView horizontal>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
      <Button title='ver' onPress={handleImageSelection} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10, // Agrega un margen derecho para separar las imágenes
  },
});
