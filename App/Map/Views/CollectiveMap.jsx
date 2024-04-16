import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { userLocation } from '../../Helpers/userLocation';
import { LeafletView, LeafletWebViewEvents, MapShapeType } from 'react-native-leaflet-maps';
import { Button } from 'react-native';
import { ButtonUbication } from '../Components/ButtonUbication';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useIncidentStore } from '../../hooks/useIncidentStore';
import { useSelector } from 'react-redux';



export const CollectiveMap = () => {

    const {loadIncidents} = useIncidentStore()
    const {incidents} = useSelector(state => state.incident)
    const [incidentShapes, setIncidentShapes] = useState([]);

    const [errorMsg, setErrorMsg] = useState('')
    const [markerCoordinate, setMarkerCoordinate] = useState('');

    const updateUserLocation = async () => {
        try {
            console.log('incidents:',incidents);
            const location = await userLocation();
            setMapRegion(location);
            console.log('su ubicacion es: ', location)
        } catch (error) {
            setErrorMsg(error.message);
        }
    };
    
    const onLoadIncidents = async() => {
        await loadIncidents()
    }

      useEffect(() => {
         updateUserLocation()
         onLoadIncidents()
         setMarkerCoordinate(mapRegion)
     }, []) 


     const renderIncidentShapes = () => {
        return incidents.map((incident) => ({
            shapeType: MapShapeType.CIRCLE,
            color: '#FF0000', // Color rojo para los incidentes
            id: incident.id,
            center: incident.ubication,
            radius: 20, // Puedes ajustar el radio del círculo según tus necesidades
        }));
    };

    useEffect(()=>{
       const res = renderIncidentShapes()
       setIncidentShapes(res)
        console.log('ver_mas:', res);
    },[incidents])

    const onMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setMarkerCoordinate(coordinate);
    };



    const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
    const [mapRegion, setMapRegion] = useState({ lat: 0, lng: 0 })

    const onMapTouched = (message) => {
        if (
            message.event === LeafletWebViewEvents.ON_MAP_TOUCHED &&
            message.payload?.touchLatLng
        ) {
            const position = message.payload.touchLatLng;
            setCoordinate(position);
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
                    }
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

            <ButtonUbication updateUserLocation={updateUserLocation} ></ButtonUbication>
        </View>
    )

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '60%',
    },

});
