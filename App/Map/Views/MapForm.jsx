import React, { useEffect, useRef, useState } from 'react';
import {  Alert, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { IncidentForm } from '../Screens/IncidentForm'; 
import { userLocation } from '../../Helpers/userLocation'; 
import { LeafletView, LeafletWebViewEvents  } from 'react-native-leaflet-maps';
import { AppBar } from '../Components/AppBar'; 
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';



export const MapForm = () => {
    
    const DEFAULT_COORDINATE = { lat: 8.7510105, lng: -75.8785305 }
    const navigation = useNavigation()
  
    const updateUserLocation = async () => {
        try {
          const location = await userLocation();
          setMapRegion(location);
        } catch (error) {
        }
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

<View>
        <Button title='Ir a...' onPress={() => navigation.navigate('MapCollective')}>
      </Button>
      </View>
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
            position: coordinate,
            icon: '📍',
            size: [32, 32],
          },
           /* {
            position: coordinate,
            icon: '📍',
            size: [32, 32],
          },  */
          
        ]}
        mapCenterPosition={DEFAULT_COORDINATE}
       
        
      />
      
       <IncidentForm coordenadas={coordinate} ></IncidentForm>
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
