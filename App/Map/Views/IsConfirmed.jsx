import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { useIncidentStore } from '../../hooks/useIncidentStore';
import { Filters } from '../Components/Filters';
import { TabsButtom } from '../Components/TabsButtom';
import { IncidentModal } from '../Components/IncidentModal';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

export const IsConfirmed = () => {
    const { incidents, loadUserIncidents } = useIncidentStore();
    const { user } = useSelector((state) => state.auth);
    const [isConfirmed, setIsConfirmed] = useState([]);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const {uid} = user;
    useEffect(() => {
        const fetchData = async () => {
                const not_confirmed = await loadUserIncidents(uid);
                setIsConfirmed(not_confirmed);
                console.log('not_confirmed:', not_confirmed);
        };
        fetchData();
    }, []);

    const list = isConfirmed.map((incident, index) => ({
        name: incident.type_incident,
        avatar_url: incident.images_url,
        subtitle: incident.description,
        ubication: incident.ubication,
        id: incident.id
    }));

    const openModal = (incident) => {
        setSelectedIncident(incident);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.listView}>
            <ScrollView>
                <View style={styles.rowContainer}>
                    {list.map((l, i) => (
                        <View key={i} style={styles.cardWrapper}>
                            <Card containerStyle={styles.cardContainer}>
                                {l.avatar_url && l.avatar_url.length > 0 && (
                                    <Card.Image
                                        source={{ uri: l.avatar_url[0] }}
                                        style={styles.cardImage}
                                    />
                                )}
                                <Card.Title>{l.name}</Card.Title>
                                <Card.Divider />
                                <Card.FeaturedSubtitle>{l.subtitle}</Card.FeaturedSubtitle>
                                <Button style={styles.Button} onPress={() => openModal(l)}>Ver detalles</Button>
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
        alignItems: 'center',
        marginBottom: 100,
    },
    cardWrapper: {
        width: '50%', // Utiliza el 48% del ancho para dejar espacio entre las tarjetas
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
    },
    Button: {
        backgroundColor: '#fff',
        borderRadius: 30
    }
});
