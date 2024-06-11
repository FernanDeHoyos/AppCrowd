import { useDispatch, useSelector } from "react-redux"
import { supabase } from "../lib/supabase"
import { onAddNewIncident, onLoadIncidents } from "../Store/Incident/IncidentSlice"
import { fileUpload } from "../Helpers/FileUpload"

export const useIncidentStore = () => {
    const dispatch = useDispatch()
    // Utilizar useSelector para obtener el estado del store
    const { incidents, images_url } = useSelector((state) => state.incident)

    // Función para agregar un nuevo incidente
    const addNewIncident = async ({ severity, additionalOption, description, coordenadas, uid, images_url }) => {
        try {
            const { data, error } = await supabase
                .from('Incident')
                .insert({
                    type_risk: severity,
                    type_incident: additionalOption,
                    description: description,
                    ubication: coordenadas,
                    id_user: uid,
                    images_url: images_url,
                    confirm: false 
                })
                .select()

            // Despachar la acción onAddNewIncident para actualizar el store
            dispatch(onAddNewIncident({ severity, additionalOption, description, coordenadas, uid, images_url }))

            if (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Función para cargar todos los incidentes confirmados
const loadAllIncidents = async () => {
    try {
        let { data: Incident, error } = await supabase
            .from('Incident')
            .select('*')
            .eq('confirm', true); 
        if (error) throw error;
        dispatch(onLoadIncidents(Incident));
    } catch (error) {
        console.log('Error loading incidents:', error);
    }
};

const loadUserIncidents = async (userId) => {
    try {
        let { data: Incident, error } = await supabase
            .from('Incident')
            .select('*')
            .eq('confirm', false)
            .eq('id_user', userId);
        if (error) throw error;
        console.log('Incident',Incident);
        return Incident
    } catch (error) {
        console.log('Error loading incidents:', error);
        return [];
    }
};


    // Función para cargar archivos
    const startUploadingFiles = async (files = []) => {
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }
        // Esperar a que todas las promesas de carga de archivos se completen y devolver las URLs de las imágenes cargadas
        const URLPhotos = await Promise.all(fileUploadPromises);
        return URLPhotos;
    };

    // Función para filtrar incidentes por ID de usuario
    const FilterIncidentById = async (id_user) => {
        try {
            let { data: Incident, error } = await supabase
                .from('Incident')
                .select('*')
                .eq('confirm', true)
                .eq('id_user', id_user)
            // Despachar la acción onLoadIncidents para actualizar el store con los datos recibidos
            dispatch(onLoadIncidents(Incident))
        } catch (error) {
            console.log(error);
        }
    }

    // Función para filtrar incidentes por tipo de riesgo
    const FilterIncidentByRisk = async (type_risk) => {
        try {
            let { data: Incident, error } = await supabase
                .from('Incident')
                .select('*')
                .eq('confirm', true)
                .eq('type_risk', type_risk)
            // Despachar la acción onLoadIncidents para actualizar el store con los datos recibidos
            dispatch(onLoadIncidents(Incident))
        } catch (error) {
            console.log(error);
        }
    }

    return {
        incidents,
        images_url,
        addNewIncident,
        loadAllIncidents,
        startUploadingFiles,
        FilterIncidentById,
        FilterIncidentByRisk,
        loadUserIncidents
    }
}
