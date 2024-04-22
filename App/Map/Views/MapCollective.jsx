import React, { useEffect, useState } from 'react';
import {  StyleSheet, View } from 'react-native';
import { LeafletView, MapShapeType } from 'react-native-leaflet-maps';
import { Button } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';

import { userLocation } from '../../Helpers/userLocation'; 
import { ButtonUbication } from '../Components/ButtonUbication';
import { useIncidentStore } from '../../hooks/useIncidentStore'; 
import { TabsButtom } from '../Components/TabsButtom'; 



export const MapCollective = ({ navigation }) => {
    const { loadIncidents, incidents } = useIncidentStore();
    const [incidentShapes, setIncidentShapes] = useState([]);
    const [mapRegion, setMapRegion] = useState({ lat: 0, lng: 0 });
    const isFocused = useIsFocused();

    const updateUserLocation = async () => {
        try {
            const location = await userLocation();
            setMapRegion(location);      
        } catch (error) {
             //setErrorMsg(error.message);
        }
    };
    
    const LoadIncidents = ()=>{
         loadIncidents()
         const render = renderIncidentShapes()
         setIncidentShapes(render)
         console.log('render: ',render);
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
                <Button title='Reiniciar' onPress={LoadIncidents} ></Button>
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