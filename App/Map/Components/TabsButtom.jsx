
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'

export const TabsButtom = () => {

  const navigation = useNavigation()

  return (
    <View style={style.buttonContainer}> 
    <Button 
    icon={<Icon
        name="map"
        size={30}
        color="white"
      />}
    onPress={() => navigation.navigate('MapForm')} />

    <Button 
    icon={<Icon
        name="settings"
        size={30}
        color="white"
      />}
    onPress={() => navigation.navigate('Settings')} />

<Button 
    icon={<Icon
        name="map"
        size={30}
        color="white"
      />}
    onPress={() => navigation.navigate('MapForm')} />

</View>
  )
}


const style = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center', 
    position: 'absolute',
    bottom: 10,
    left: 20,
    end: 10
    
},
})
