import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { LeafletView, LeafletWebViewEvents, MapShapeType } from 'react-native-leaflet-maps';
import { IncidentForm } from '../Screens/IncidentForm';
import { TabsButtom } from '../Components/TabsButtom';
import { monteriaPolygon } from '../../Helpers/Coordenadas';
import { Button } from '@rneui/base';

export const MapForm = () => {
  const [coordinate, setCoordinate] = useState({ lat: 8.7510105, lng: -75.8785305 }); // Inicialmente centrado en Montería
  const [coordinates, setCoordinates] = useState([]);
  const onMapTouched = (message) => {
    if (
      message.event === LeafletWebViewEvents.ON_MAP_TOUCHED &&
      message.payload?.touchLatLng
    ) {
      const position = message.payload.touchLatLng;
      setCoordinate(position);
      setCoordinates(prevCoordinates => [...prevCoordinates, position]);
    }
  };

  // Coordenadas que delimitan la ciudad de Montería (ejemplo básico)
  
 // Función para mostrar las coordenadas guardadas
 const showCoordinates = () => {
  if (coordinates.length === 0) {
    Alert.alert('No coordinates', 'No coordinates have been saved yet.');
  } else {
    const coordString = coordinates.map(coord => `{ lat: ${coord.lat}, lng: ${coord.lng}}`).join('\n');
    console.log('Saved Coordinates', coordString);
  }
};


  return (
    <View style={styles.container}>
      <Button style={styles.buton} title="Show Saved Coordinates" onPress={showCoordinates} />
      <LeafletView
        onMessageReceived={onMapTouched}
        /* mapMarkers={[
          {
            position: coordinate,
            icon: '🔴',
            size: [8, 8],
          },
          
        ]} */
        mapMarkers={coordinates.map((coord, index) => ({
          position: coord,
          icon: '🔴',
          size: [8, 8],
          id: index.toString(), // Asegúrate de agregar un ID único
        }))}
        mapShapes={[
          {
            shapeType: MapShapeType.POLYGON, // Definimos un polígono
            positions: monteriaPolygon, // Las coordenadas que delimitan la ciudad de Montería
            holes: [monteriaPolygon],
            color: 'rgba(0, 150, 150, 1)', // Color del borde del polígono
            fillColor:'rgba(0, 255, 255, 0.3)', // Color de relleno con transparencia
            strokeWidth: 2,
          },
        ]}
        //mapCenterPosition={coordinate}
        //zoom={13}
        doDebug={false}
      />

      <IncidentForm coordenadas={coordinate} />
      
      <TabsButtom />
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
  buton:{
    position: 'absolute'
  }

});
