import { createSlice } from '@reduxjs/toolkit';

export const IncidentSlice = createSlice({
    name: 'incident',
    initialState: {
        isLoadIncidents: true,
        incidents: [],
        activeIncident: null
     },
    reducers: {
        onSetActiveIncident: (state, { payload }) => {
            state.activeIncident = payload
        },
        onAddNewIncident: (state, { payload }) => {
            state.incidents.push(payload)
            state.activeIncident = null
        },
        onUpdateIncident: (state, { payload }) => {
            state.incidents = state.incidents.map(incident => {
                if(incident.id === payload.id){
                    return payload;
                }
                return incident;
            })
        },
        onDeleteIncident: (state) => {
            if(state.activeIncident){
                state.incidents = state.incidents.filter(incident => incident._id !== state.activeIncident._id)
                state.activeIncident = null
            }
        },
        onLoadIncidents: (state, { payload }) => {
            state.isLoadIncidents = false;
            state.incidents = payload.map(incident => ({
                created_at: incident.created_at,
                description: incident.description,
                id: incident.id,
                id_user: incident.id_user,
                type_incident: incident.type_incident,
                type_risk: incident.type_risk,
                ubication: incident.ubication
            }));
        },
        setPhotosActiveNote: (state, {payload}) => {
            state.activeIncident.imageUrls = [...state.activeIncident.imageUrls, ...payload]
            state.isSaving = false
        },
        onLogoutIncident: (state) => {
            state.isLoadIncidents = true
            state.incidents = []
            state.activeIncident = null
        }
    }
});

export const { 
    onSetActiveIncident,
    onAddNewIncident, 
    onUpdateIncident, 
    onDeleteIncident, 
    onLogoutIncident,
    onLoadIncidents,
    setPhotosActiveNote
} = IncidentSlice.actions
