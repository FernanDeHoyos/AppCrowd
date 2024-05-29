import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, TouchableOpacity, Image as RNImage, Dimensions } from 'react-native';
import { LeafletView } from 'react-native-leaflet-maps';
import { Button } from 'react-native-paper';

export const IncidentModal = ({ visible, incident, onClose }) => {
    const [fullscreenImage, setFullscreenImage] = useState(null);

    const handleImagePress = (imageUrl) => {
        setFullscreenImage(imageUrl);
    };

    const handleCloseFullscreenImage = () => {
        setFullscreenImage(null);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    
                    <View style={styles.headModal}>
                    <Text>{incident ? incident.name : ''}</Text>
                    <Text>{incident ? incident.subtitle : ''}</Text>
                    </View>

                    <View style={styles.modalContent}>
                <LeafletView
                mapMarkers={[
                    {
                        position: incident?.ubication ,
                        icon: '📍',
                        size: [32, 32],
                    },
                ]}
                    mapCenterPosition={incident?.ubication}
                    doDebug={false}
                    zoomControl={false}
                />
            </View>
                    <ScrollView horizontal={true} style={styles.scrollView}>
                        {incident && incident.avatar_url && incident.avatar_url.map((url, index) => (
                            <TouchableOpacity key={index} onPress={() => handleImagePress(url)}>
                                <View style={styles.imageContainer}>
                                    <RNImage 
                                        source={{ uri: url }}
                                        style={styles.image}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Button  onPress={onClose} > Cerrar </Button>
                   
                </View>
                
            
            </View>
            {fullscreenImage && (
                <TouchableOpacity style={styles.fullscreenImageView} onPress={handleCloseFullscreenImage}>
                    <RNImage 
                        source={{ uri: fullscreenImage }}
                        style={styles.fullscreenImage}
                    />
                </TouchableOpacity>
            )}
            {/* LeafletView dentro del modal */}
            
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 20,
        marginLeft: 15,
        marginRight: 15,
        padding: 15,
        marginBottom: 30,
        marginTop: 30,
        alignItems: "center",
        elevation: 5
    },
    modalView: {
        flex: 1
    },
    headModal:{
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        maxHeight: 200,
        backgroundColor: '#2FC4B2',
        padding: 5,
        borderRadius: 10,

    },
    imageContainer: {
        marginHorizontal: 5,
        borderRadius: 30,
       
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 10
    },
    fullscreenImageView: {
        position: "absolute",
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    fullscreenImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    modalContent: {
        flex: 1,
        borderRadius: 30,
        margin: 10,
    },
});
