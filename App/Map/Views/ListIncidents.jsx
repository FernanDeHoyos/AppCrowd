import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Button, Modal, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useIncidentStore } from '../../hooks/useIncidentStore'; 
import { Filters } from '../Components/Filters';
import { TabsButtom } from '../Components/TabsButtom';
import { IncidentModal } from '../Components/IncidentModal';

export const ListIncidents = () => {
    const { incidents, loadAllIncidents} = useIncidentStore();
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        loadAllIncidents(); // Cargar incidentes al montar el componente
    }, []);


/*     console.log('incidents:', incidents);
 */
    const list = incidents.map((incident, index) => ({
        name: incident.type_incident,
        avatar_url: incident.images_url, 
        subtitle: incident.description,
        ubication: incident.ubication,
        id: incident.id // Puedes agregar el ID del incidente si lo necesitas
    }));

/*     console.log('list:', list);
 */

    const openModal = (incident) => {
        setSelectedIncident(incident);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.listView}>
            <Filters/>
            <ScrollView>
                <View style={styles.rowContainer}>
                    {list.map((l, i) => (
                        <View key={i} style={styles.cardWrapper}>
                            <Card containerStyle={styles.cardContainer}>
                            <Card.Image 
                        source={{ uri: l.avatar_url[0] }} // Accede al primer elemento del array
                        style={styles.cardImage} 
                    />
                                <Card.Title>{l.name}</Card.Title>
                                <Card.Divider />
                                <Card.FeaturedSubtitle>{l.subtitle}</Card.FeaturedSubtitle>
                                <Button title="Ver detalles" onPress={() => openModal(l)} />
                            </Card>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TabsButtom />
            <IncidentModal visible={modalVisible} incident={selectedIncident} onClose={closeModal} /> 
        </View>
    );
}

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff'
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    cardWrapper: {
        width: '50%', // Utiliza el 48% del ancho para dejar espacio entre las tarjetas
        marginBottom: 20,
    },
    cardContainer: {
        borderRadius: 10,
    },
    cardImage: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 100,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});
