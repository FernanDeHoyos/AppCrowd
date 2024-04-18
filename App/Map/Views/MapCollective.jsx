import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { userLocation } from '../../Helpers/userLocation'; 
import { LeafletView, LeafletWebViewEvents, MapShapeType } from 'react-native-leaflet-maps';
import { ButtonUbication } from '../Components/ButtonUbication';
import { useIncidentStore } from '../../hooks/useIncidentStore'; 
import { useSelector } from 'react-redux';
import { TabsButtom } from '../Components/TabsButtom'; 



export const MapCollective = ({ navigation }) => {
    const { loadIncidents } = useIncidentStore();
    const { incidents } = useSelector((state) => state.incident);
    const [incidentShapes, setIncidentShapes] = useState([]);
    const [mapRegion, setMapRegion] = useState({ lat: 0, lng: 0 });

    const updateUserLocation = async () => {
        try {
            const location = await userLocation();
            setMapRegion(location);
        } catch (error) {
            // setErrorMsg(error.message);
        }
    };

    const onLoad = useCallback(async () => {
        await loadIncidents();
    }, [loadIncidents]);

    useEffect(() => {
        updateUserLocation()
        console.log('si lo renderiza');
        onLoad();
    }, []);

    useEffect(() => {
        setIncidentShapes(renderIncidentShapes());
    }, [incidents]);

    const renderIncidentShapes = () => {
        return incidents.map((incident) => ({
            shapeType: MapShapeType.CIRCLE,
            color: '#FF0000',
            id: incident.id,
            center: incident.ubication,
            radius: 20,
        }));
    };

    const updateIncidentShapes = async () => {
        try {
            console.log('si lo renderiza');
            await onLoad();
            setIncidentShapes(renderIncidentShapes());
        } catch (error) {
            console.error('Error al actualizar incidentes:', error);
        }
    };

    const onMapTouched = (message) => {
        if (
            message.event === LeafletWebViewEvents.ON_MAP_TOUCHED &&
            message.payload?.touchLatLng
        ) {
            const position = message.payload.touchLatLng;
            Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
        }
    };

    return (
        <View style={styles.container}>
            <LeafletView
                mapLayers={[
                    {
                        baseLayerNombre: 'OpenStreetMap',
                        baseLayerIsComprobado: true,
                        tipoDeCapa: 'TileLayer',
                        baseLayer: true,
                        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        atribución: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
                    },
                ]}
                mapMarkers={[
                    {
                        position: mapRegion,
                        icon: '📍',
                        size: [32, 32],
                    },
                ]}
                mapCenterPosition={mapRegion}
                mapShapes={incidentShapes}
                onMessageReceived={onMapTouched}
            />
            <ButtonUbication updateUserLocation={updateUserLocation} />
            <TabsButtom/>
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '60%',
    },
   
    button: {
        width: 150,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: '#000',
    },

});
