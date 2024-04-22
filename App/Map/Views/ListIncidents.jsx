import React, { useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { useIncidentStore } from '../../hooks/useIncidentStore'

export const ListIncidents = () => {

    const {  loadIncidents, incidents } = useIncidentStore()

    useEffect(() => {
        loadIncidents(); // Cargar incidentes al montar el componente
    }, []);
    console.log('Incidents desde List:', incidents);

    const list = incidents.map((incident, index) => ({
        name: incident.type_incident,
        avatar_url: 'https://via.placeholder.com/150', // URL de la imagen del incidente
        subtitle: incident.description
    }));

    return (
        <ScrollView>
            <View>
                {
                    list.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar source={{ uri: l.avatar_url }} />
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
        </ScrollView>
    )
}
