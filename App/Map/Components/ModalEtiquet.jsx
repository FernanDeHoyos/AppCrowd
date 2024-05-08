import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const ModalEtiquet = ({ incidents, showModal, setShowModal }) => {
    const closeModal = () => {
        setShowModal(false);
    };

    if (!showModal || incidents.length === 0) {
        return null;
    }

    return (
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
            <View style={styles.modalContent}>
               
                {incidents.map(incident => (
                    <View key={incident.id}>
                         <Text style={styles.incidentText}>{incident.type_risk}</Text>
                        <Text>Descripción: {incident.description}</Text>
                        <Text>Tipo de incidente: {incident.type_incident}</Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    incidentText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

