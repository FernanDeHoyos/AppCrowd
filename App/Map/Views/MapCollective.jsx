import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { userLocation } from '../../Helpers/userLocation'; 
import { LeafletView, LeafletWebViewEvents, MapShapeType } from 'react-native-leaflet-maps';
import { ButtonUbication } from '../Components/ButtonUbication';
import { useIncidentStore } from '../../hooks/useIncidentStore'; 
import { useSelector } from 'react-redux';
import { TabsButtom } from '../Components/TabsButtom'; 
import { Button } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';



export const MapCollective = ({ navigation }) => {
    const isFocused = useIsFocused();
    const { loadIncidents, incidents } = useIncidentStore();
    const [incidentShapes, setIncidentShapes] = useState([]);
    const [mapRegion, setMapRegion] = useState({ lat: 0, lng: 0 });

    const updateUserLocation = async () => {
        try {
            const location = await userLocation();
            setMapRegion(location);      
        } catch (error) {
             setErrorMsg(error.message);
        }
    };
    
    const LoadIncidents = async()=>{
        await loadIncidents()
    }
    
    const renderIncidentShapes = () => {
        return incidents.map((incident) => ({
            shapeType: MapShapeType.CIRCLE,
            color: '#FF0000',
            id: incident.id,
            center: incident.ubication,
            radius: 20,
        }));
    };

    useEffect(()=>{
        updateUserLocation()
        LoadIncidents()
        const render = renderIncidentShapes()
        setIncidentShapes(render)

    },[])

    

    
   

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
            />
            <ButtonUbication updateUserLocation={updateUserLocation} />
            <View>
                <Button title='Reiniciar' onPress={renderIncidentShapes} ></Button>
            </View>
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
