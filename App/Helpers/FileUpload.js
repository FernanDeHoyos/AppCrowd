import { CLOUD_URL } from '@env';

export const fileUpload = async (fileUri) => {
    const cloudURL = CLOUD_URL
   
    const formData = new FormData(); 
    formData.append('file', {
        uri: fileUri,
        type: 'image/jpeg', // Cambia el tipo según el tipo de archivo seleccionado
        name: 'image.jpg', // Nombre del archivo
    });
    formData.append('upload_preset', 'Incidents');
    formData.append('api_key', '793383569358419');

    try {
        const response = await fetch(cloudURL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error uploading image to Cloudinary');
        }

        const responseData = await response.json();
        return responseData.secure_url;
    } catch (error) {
        throw new Error(error.message);
    }
};
