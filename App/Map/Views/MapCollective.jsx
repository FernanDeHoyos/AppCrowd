import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { LeafletView, LeafletWebViewEvents, MapShapeType } from 'react-native-leaflet-maps';

import { userLocation } from '../../Helpers/userLocation';
import { useIncidentStore } from '../../hooks/useIncidentStore';
import { ButtonUbication } from '../Components/ButtonUbication';
import { Filters } from '../Components/Filters';
import { TabsButtom } from '../Components/TabsButtom';
import { CreateZone, generateMarkers, isCoordinateInsideRectangle } from '../../Helpers/CreateZone';
import { Modal } from 'react-native-paper';
import { ModalEtiquet } from '../Components/ModalEtiquet';
import { InfoIncidents } from '../Components/InfoIncidents';

export const MapCollective = ({ navigation }) => {
    const { loadAllIncidents, incidents } = useIncidentStore();
    const [incidentShapes, setIncidentShapes] = useState([]);
    const [mapRegion, setMapRegion] = useState({ lat: 0, lng: 0 });
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [clickPosition, setClickPosition] = useState(null);


    const [showModal, setShowModal] = useState(false);
    const [incidentsInsideRectangle, setIncidentsInsideRectangle] = useState([]);

    const [rectangle, setRectangle] = useState({
        topLeft: { lat: 0, lng: 0 },
        topRight: { lat: 0, lng: 0 },
        bottomLeft: { lat: 0, lng: 0 },
        bottomRight: { lat: 0, lng: 0 },
      });

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
                    color = '🟢'; // Verde para bajo riesgo
                    break;
                case 'Mediano riesgo':
                    color = '🟠'; // Amarillo para riesgo medio
                    break;
                case 'Alto riesgo con apoyo':
                    color = '🔴'; // Rojo para alto riesgo con apoyo
                    break;
                default:
                    color = '⚫'; // Negro para cualquier otro tipo de riesgo
                    break;
            }

            return {
                position: incident.ubication,
                icon:  color,
                size: [8, 8],
            };
        });
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
        
          const zone = CreateZone(position, 0.001, 0.001)

          const incidentsInsideRectangle = incidents.filter(incident => {
            const coordinate = { lat: incident.ubication.lat, lng: incident.ubication.lng };
            return isCoordinateInsideRectangle(coordinate, zone);
        });

          setRectangle(zone);
          
          console.log(position);
          console.log(zone);
          setIncidentsInsideRectangle(incidentsInsideRectangle);
          if (incidentsInsideRectangle.length > 0) {
            setShowModal(true);
        }else{
            setShowModal(false);
        }
        }
    };
    
    

    return (
        <View style={styles.container}>
            <Filters />
            
            <LeafletView
    key={key}
    onMessageReceived={onMapTouched}
    androidHardwareAccelerationDisabled={true}
    mapCenterPosition={mapRegion}
    
    //mapShapes={incidentShapes}
    doDebug={false}
    mapMarkers={/* generateMarkers(rectangle) */incidentShapes}
    zoom={13}
/>
             
<ModalEtiquet incidents={incidentsInsideRectangle} showModal={showModal} setShowModal={setShowModal} />
<InfoIncidents incidents={incidents}/>
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
