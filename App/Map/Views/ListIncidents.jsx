import  { useEffect } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

import { useIncidentStore } from '../../hooks' 
import { Filters, TabsButtom } from '../Components' 

export const ListIncidents = () => {
    const { incidents, loadAllIncidents} = useIncidentStore()


     useEffect(() => {
        loadAllIncidents(); // Cargar incidentes al montar el componente
    }, []); 

    const list = incidents.map((incident, index) => ({
        name: incident.type_incident,
        avatar_url: 'https://via.placeholder.com/150', // URL de la imagen del incidente
        subtitle: incident.description
    }));

   


    return (
        <View style={styles.listView}>
            <Filters/>
        <ScrollView>
            <View >
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
        <TabsButtom />
        </View>
    )
}

const styles = StyleSheet.create({
    listView: {
       flex: 1,
       position: 'relative',
       backgroundColor: '#fff'
    },
    checkRadio:{
        justifyContent: 'center',
    },
    checkBoxContainer: {
        justifyContent: 'center', // Centrar los CheckBox horizontalmente
        position: 'absolute', // Posición absoluta para superponer los CheckBox sobre otros componentes
        right: 10, // Distancia desde el lado derecho de la pantalla
        top: 40, // Distancia desde la parte superior de la pantalla
        zIndex: 1, // Colocar el contenedor por encima de otros componentes
        backgroundColor: '#fff', // Color de fondo del contenedor
        borderRadius: 5, // Bordes redondeados
        padding: 10, // Espaciado interno para el contenido
        elevation: 4, // Agregar sombra
    },
    buttonContainer: {
        backgroundColor: '#fffc',
        alignItems: 'flex-end',
        paddingTop: 5,
        paddingRight: 10,
    },
  
    
})
