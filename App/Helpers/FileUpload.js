import {CLOUD_URL} from '@env'

export const fileUpload = async (file) => {

    const cloudURL = CLOUD_URL;
   
    const formData = new FormData() 
    formData.append('upload_preset', 'Incidents')
    formData.append('file', file)

    try{
        const resp = await fetch( cloudURL, {
            method: 'POST',
            body: formData,
        })

        if(!resp.ok) throw new Error('No se pudo subir imagen')
        const cloudResp = await resp.json()
        console.log(cloudResp)

        return cloudResp.secure_url;
    }catch(error){
        throw new Error(error.message)
    }
}