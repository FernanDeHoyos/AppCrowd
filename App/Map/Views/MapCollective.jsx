import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LeafletView, MapShapeType } from 'react-native-leaflet-maps';

import { userLocation } from '../../Helpers'; 
import { useIncidentStore } from '../../hooks'; 
import { ButtonUbication, TabsButtom, Filters } from '../Components'; 



export const MapCollective = ({ navigation }) => {
    const { loadAllIncidents, incidents } = useIncidentStore();
    const [incidentShapes, setIncidentShapes] = useState([]);
    const [mapRegion, setMapRegion] = useState({ lat: 0, lng: 0 });


    const updateUserLocation = async () => {
        try {
            const location = await userLocation();
            setMapRegion(location);
        } catch (error) {
            //setErrorMsg(error.message);
        }
    };

    const LoadIncidents = async () => {
        const render = renderIncidentShapes()
        setIncidentShapes(render)
    }

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
    
    useEffect(() => {
        loadAllIncidents()
    },[])

    useEffect(() => {
        updateUserLocation()
        LoadIncidents()
    }, [incidents])



    return (
        <View style={styles.container}>

            <Filters/>
            <LeafletView
                
                mapMarkers={[
                    {
                        position: mapRegion,
                        icon: '📍',
                        size: [32, 32],
                    },
                ]}
                mapCenterPosition={mapRegion}
                mapShapes={incidentShapes}
                doDebug={false}
                zoomControl={false}
            />
            <ButtonUbication updateUserLocation={updateUserLocation} />

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

    buttonReload:{
        position: 'absolute',
        left: 10,
        bottom: 100
    }

});