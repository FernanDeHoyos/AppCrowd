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

            console.log('datos:', data)
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

    return {
        incidents,
        addNewIncident, 
        loadIncidents
    }
}