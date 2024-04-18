import React from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'

export const ButtonUbication = ({updateUserLocation}) => {

  return (
    <View style={styles.container}>
    <IconButton
    icon="map-marker-radius"
    iconColor={'#289C8E'}
    size={30}
    onPress={updateUserLocation}
   />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 50,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#FFF',
        alignItems: 'center',
        position: 'absolute',
        bottom: 100,
        right: 10, // Cambiar de left: 10 a right: 10

      },
})
