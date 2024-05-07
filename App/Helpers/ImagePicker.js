import * as ImagePicker from 'expo-image-picker';

export const UpImagePicker = async () => { //funcion para la subida de imagenes
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    aspect: [4, 3],
    quality: 1,
    allowsMultipleSelection: true, // Habilita la selección múltiple de imágenes
  });

  console.log(result);

  const images = [];
  if (!result.cancelled) {
    images.push(...result.assets.map(asset => asset.uri)); // Obtén las URI de las imágenes seleccionadas
  }

  return images;
};
