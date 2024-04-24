import { useDispatch, useSelector } from "react-redux"
import { supabase } from "../lib/supabase"
import { onAddNewIncident, onLoadIncidents } from "../Store/Incident/IncidentSlice"


export const useIncidentStore = () => {

    const dispatch = useDispatch()
    const {incidents} = useSelector((state) => state.incident)

    const addNewIncident = async ({ severity, additionalOption, description, coordenadas, uid }) => {
        try {
            const { data, error } = await supabase
                .from('Incident')
                .insert(
                    {
                        type_risk: severity,
                        type_incident: additionalOption,
                        description: description,
                        ubication: coordenadas,
                        id_user: uid
                    })
                .select()

            console.log('datos:', { severity, additionalOption, description, coordenadas, uid })
            dispatch(onAddNewIncident({ severity, additionalOption, description, coordenadas, uid }))

            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const loadIncidents = async () => {
        try {
            let { data: Incident, error } = await supabase
            .from('Incident')
            .select('*')
            dispatch(onLoadIncidents(Incident))
            console.log('desde aca:', Incident);
        } catch (error) {
            console.log(error);
        }

    }

    const FilterIncidentById = async(id_user) => {
        try { 
            let { data: Incident, error } = await supabase
            .from('Incident')
            .select('*').eq('id_user', id_user)
            dispatch(onLoadIncidents(Incident))
            console.log('filtro:',Incident);
        } catch (error) {
            console.log(error);
        }
    }

    const FilterIncidentByRisk = async(type_risk) => {
        try {
            let { data: Incident, error } = await supabase
            .from('Incident')
            .select('*').eq('type_risk', type_risk)
            dispatch(onLoadIncidents(Incident))
            console.log('filtro:',Incident);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        incidents,
        addNewIncident, 
        loadIncidents,
        FilterIncidentById,
        FilterIncidentByRisk
    }
}