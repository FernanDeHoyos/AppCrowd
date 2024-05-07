import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { LeafletView, LeafletWebViewEvents, MapShapeType, Marker } from 'react-native-leaflet-maps';

import { userLocation } from '../../Helpers/userLocation';
import { useIncidentStore } from '../../hooks/useIncidentStore';
import { ButtonUbication } from '../Components/ButtonUbication';
import { Filters } from '../Components/Filters';
import { TabsButtom } from '../Components/TabsButtom';

export const MapCollective = ({ navigation }) => {
    const { loadAllIncidents, incidents } = useIncidentStore();
    const [incidentShapes, setIncidentShapes] = useState([]);
    const [mapRegion, setMapRegion] = useState({ lat: 0, lng: 0 });
    const [selectedIncident, setSelectedIncident] = useState(null);

    const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });

    // Utiliza useMemo para calcular un valor clave único basado en incidents
    const key = useMemo(() => JSON.stringify(incidents), [incidents]);

    const updateUserLocation = async () => {
        try {
            const location = await userLocation();
            setMapRegion(location);
        } catch (error) {
            // setErrorMsg(error.message);
        }
    };

    const LoadIncidents = async () => {
        const render = renderIncidentShapes();
        setIncidentShapes(render);
    };

    const renderIncidentShapes = () => {
        return incidents.map((incident) => {
            let color;
            switch (incident.type_risk) {
                case 'Bajo riesgo':
                    color = '#FFFF00'; // Verde para bajo riesgo
                    break;
                case 'Mediano riesgo':
                    color = '#FF7300'; // Amarillo para riesgo medio
                    break;
                case 'Alto riesgo con apoyo':
                    color = '#FF0000'; // Rojo para alto riesgo con apoyo
                    break;
                default:
                    color = '#000000'; // Negro para cualquier otro tipo de riesgo
                    break;
            }

            return {
                shapeType: MapShapeType.CIRCLE,
                color: color,
                id: incident.id,
                center: incident.ubication,
                radius: 20,
            };
        });
    };

    // Función para manejar el evento de presionar un marcador
    const handleMarkerPress = (incident) => {
        setSelectedIncident(incident);
    };

    useEffect(() => {
        loadAllIncidents();
    }, []);

    useEffect(() => {
        updateUserLocation();
        LoadIncidents();
    }, [incidents]);

    const onMapTouched = (message) => {
        if (
          message.event === LeafletWebViewEvents.ON_MAP_TOUCHED &&
          message.payload?.touchLatLng
        ) {
          const position = message.payload.touchLatLng;
          
          // Buscar si el toque ocurrió en un punto de incidente
          const clickedIncident = incidentShapes.find(incident => {
            // Calcular la distancia entre el punto tocado y el centro del incidente
            const distance = Math.sqrt(
              Math.pow(position.lat - incident.center.lat, 2) +
              Math.pow(position.lng - incident.center.lng, 2)
            );
    
            // Si la distancia es menor que el radio del incidente, consideramos que se tocó ese incidente
            return distance <= incident.radius;
          });
    
          if (clickedIncident) {
            console.log('Incidente seleccionado:', clickedIncident);
          } else {
            console.log('No se ha tocado ningún incidente.');
          }
        }
    };
    
    

    return (
        <View style={styles.container}>
            <Filters />
            {/* Agrega un key único al componente LeafletView */}
            <LeafletView
    key={key}
    onMessageReceived={onMapTouched}
    
    mapCenterPosition={mapRegion}
    mapShapes={incidentShapes}
    doDebug={false}
    zoomControl={false}
/>
            {/* Mostrar etiqueta de información si se ha seleccionado un incidente */}
            
            <ButtonUbication updateUserLocation={updateUserLocation} />
            <TabsButtom />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
    },
    closeButton: {
        color: 'blue',
        marginTop: 5,
    },
});
