import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { LeafletView, LeafletWebViewEvents, MapShapeType } from 'react-native-leaflet-maps';

import { userLocation } from '../../Helpers/userLocation';
import { useIncidentStore } from '../../hooks/useIncidentStore';
import { ButtonUbication } from '../Components/ButtonUbication';
import { Filters } from '../Components/Filters';
import { TabsButtom } from '../Components/TabsButtom';
import { CreateZone, generateMarkers, isCoordinateInsideRectangle } from '../../Helpers/CreateZone';
import { ModalEtiquet } from '../Components/ModalEtiquet';
import { InfoIncidents } from '../Components/InfoIncidents';
import { monteriaPolygon, comuna_uno, comuna_tres, comuna_cuatro, comuna_seis, comuna_dos, comuna_siete, comuna_cinco, comuna_ocho, comuna_nueve_uno, comuna_nueve_dos, comuna_ocho_dos } from '../../Helpers/Coordenadas';


export const MapCollective = ({ navigation }) => {

    const { loadAllIncidents, incidents } = useIncidentStore(); // cargar incidentes
    const [incidentShapes, setIncidentShapes] = useState([]); // para guardar incidentes
    const [mapRegion, setMapRegion] = useState({ lat: 0, lng: 0 });


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
            console.log(location)
            setMapRegion({ lat: 8.74798, lng: -75.88143 });
        } catch (error) {
            // setErrorMsg(error.message);
        }
    };

    const UserLocation = async () => {
        try {
            const location = await userLocation();
            console.log(location)
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
                icon: color,
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

            const zone = CreateZone(position, 0.002, 0.002)

            const incidentsInsideRectangle = incidents.filter(incident => {
                const coordinate = { lat: incident.ubication.lat, lng: incident.ubication.lng };
                return isCoordinateInsideRectangle(coordinate, zone);
            });

            setRectangle(zone);

            setIncidentsInsideRectangle(incidentsInsideRectangle);
            if (incidentsInsideRectangle.length > 0) {
                setShowModal(true);
            } else {
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

                mapShapes={[{
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_uno, // Las coordenadas que delimitan la ciudad de Montería
                    color: 'rgba(0, 150, 150, 1)', // Un cyan más oscuro para el borde del polígono
                    fillColor: 'rgba(0, 255, 255, 1)',
                    strokeWidth: 2,
                },
                {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_dos, // Las coordenadas que delimitan la ciudad de Montería
                    color: '#0CADF6', // Un cyan más oscuro para el borde del polígono
                    fillColor: '#0CADF6',
                    strokeWidth: 2,
                  },
                {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_tres, // Las coordenadas que delimitan la ciudad de Montería
                    color: '#ACADF6', // Un cyan más oscuro para el borde del polígono
                    fillColor: '#ACADF6',
                    strokeWidth: 2,
                  },
                  {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_cuatro, // Las coordenadas que delimitan la ciudad de Montería
                    color: '#0cf0fc', // Un cyan más oscuro para el borde del polígono
                    fillColor: '#0cf0fc',
                    strokeWidth: 2,
                  },

                  {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_cinco, // Las coordenadas que delimitan la ciudad de Montería
                    color: '#6B800c', // Un cyan más oscuro para el borde del polígono
                    fillColor: '#6B800c',
                    strokeWidth: 2,
                  },

                  {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_seis, // Las coordenadas que delimitan la ciudad de Montería
                    color: '#FAA5fc', // Un cyan más oscuro para el borde del polígono
                    fillColor: '#FAA5fc',
                    strokeWidth: 2,
                  },
                  {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_siete, // Las coordenadas que delimitan la ciudad de Montería
                    color: '#8B05fc', // Un cyan más oscuro para el borde del polígono
                    fillColor: '#8B05fc',
                    strokeWidth: 2,
                  },
                  {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_ocho, // Las coordenadas que delimitan la ciudad de Montería
                    color: '#1BC5A0', // Un cyan más oscuro para el borde del polígono
                    fillColor: '#1BC5A0',
                    strokeWidth: 2,
                  },
                  {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_ocho_dos, // Las coordenadas que delimitan la ciudad de Montería
                    color: '#1BC5A0', // Un cyan más oscuro para el borde del polígono
                    fillColor: '#1BC5A0',
                    strokeWidth: 2,
                  },
                  {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_nueve_uno, // Las coordenadas que delimitan la ciudad de Montería
                    color: '#3D55fA', // Un cyan más oscuro para el borde del polígono
                    fillColor: 'rgba(1, 255, 255, 0.3)',
                    strokeWidth: 2,
                  },
                  {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: comuna_nueve_dos, // Las coordenadas que delimitan la ciudad de Montería
                    color: '#3D55fA', // Un cyan más oscuro para el borde del polígono
                    fillColor: 'rgba(1, 255, 255, 0.3)',
                    strokeWidth: 2,
                  },
                  {
                    shapeType: MapShapeType.POLYGON, // Definimos un polígono
                    positions: monteriaPolygon, // Las coordenadas que delimitan la ciudad de Montería
                    color: 'rgba(0,0,0,0.0)', // Un cyan más oscuro para el borde del polígono
                    fillColor: 'rgba(0,0,0,0.0)',
                    strokeWidth: 2,
                  },
                  
                {
                    shapeType: MapShapeType.CIRCLE,
                    color: '#272F7A',
                    id: 1,
                    center: mapRegion,
                    radius: 30,
                }]}
                doDebug={false}
                mapMarkers={/* generateMarkers(rectangle) */incidentShapes}
                zoom={13}
            />

            <ModalEtiquet incidents={incidentsInsideRectangle} showModal={showModal} setShowModal={setShowModal} />
            <InfoIncidents incidents={incidents} />
            <ButtonUbication updateUserLocation={UserLocation} />
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
