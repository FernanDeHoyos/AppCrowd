import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { userLocation } from '../../Helpers/userLocation';
import { LeafletView, LeafletWebViewEvents, MapShapeType } from 'react-native-leaflet-maps';



export const CollectiveMap = () => {

    const DEFAULT_COORDINATE = { lat: 8.75101, lng: -75.87853 }

    const [errorMsg, setErrorMsg] = useState('')
    const [mapRegion, setMapRegion] = useState({
        latitude: 8.743821,
        longitude: -75.877,
    })

    const [markerCoordinate, setMarkerCoordinate] = useState('');

    const updateUserLocation = async () => {
        try {
            const location = await userLocation();
            setMapRegion(location);
        } catch (error) {
            setErrorMsg(error.message);
        }
    };



    useEffect(() => {
        updateUserLocation()
        setMarkerCoordinate(mapRegion)
    }, [])


    const onMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setMarkerCoordinate(coordinate);
    };



    const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });

    const onMapTouched = (message) => {
        if (
            message.event === LeafletWebViewEvents.ON_MAP_TOUCHED &&
            message.payload?.touchLatLng
        ) {
            const position = message.payload.touchLatLng;
            setCoordinate(position);
            console.log('pos:', position)
            Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
        }
    };
    return (
        <View style={styles.container}>

            <LeafletView


                onMessageReceived={onMapTouched}
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
                        position: DEFAULT_COORDINATE,
                        icon: '📍',
                        size: [32, 32],
                    },
                    /* {
                      position: coordinate,
                      icon: '📍',
                      size: [32, 32],
                    }, */

                ]}
                mapCenterPosition={DEFAULT_COORDINATE}
                mapShapes={[
                    {
                        shapeType: MapShapeType.CIRCLE,
                        color: "#123123",
                        id: "1",
                        center: { lat: 8.725727, lng: -75.84471 },
                        radius: 20,
                    }
                ]}

            />

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
