import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IncidentForm } from '../Screens/IncidentForm'; 
import { LeafletView, LeafletWebViewEvents  } from 'react-native-leaflet-maps';
import { TabsButtom } from '../Components/TabsButtom';  



export const MapForm = () => {
    
      const [coordinate, setCoordinate] = useState({  lat: 8.7510105, lng: -75.8785305  });

      const onMapTouched = (message) => {
        if (
          message.event === LeafletWebViewEvents.ON_MAP_TOUCHED &&
          message.payload?.touchLatLng
        ) {
          const position = message.payload.touchLatLng;
          setCoordinate(position);
        }
      };


      
return (
  <View style={styles.container}>

<View>
        
      </View>
        <LeafletView

        
 onMessageReceived={onMapTouched}


        mapMarkers={[
          {
            position: coordinate,
            icon: '📍',
            size: [32, 32],
          },
        ]}
        mapCenterPosition={coordinate}
        doDebug={false}
        
      />
      
       <IncidentForm coordenadas={coordinate} ></IncidentForm>
       <TabsButtom />
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
