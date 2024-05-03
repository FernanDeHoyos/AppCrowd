import { StyleSheet, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'


/* Componente para ver botones de navegacion */
export const TabsButtom = () => {

  const navigation = useNavigation()

  return (
    <View style={style.buttonContainer}>

      <Button
        buttonStyle={style.buttonStyle} color='#2FC4B2'
        icon={<MaterialCommunityIcons
          name="map-marker-multiple"
          size={30}
          color="white" />}
        onPress={() => navigation.navigate('MapCollective')} />
      {/* Boton navegacion a MapForm*/}
      <Button
        buttonStyle={style.buttonStyle} color='#2FC4B2'
        icon={<MaterialCommunityIcons name="map-marker-plus" size={30} color="white" />}
        onPress={() => navigation.navigate('MapForm')} />

      {/* Boton navegacion a ListIncidents*/}
      <Button
        buttonStyle={style.buttonStyle} color='#2FC4B2'
        icon={<Icon
          name="list"
          size={30}
          color="white"
        />}
        onPress={() => navigation.navigate('ListIncidents')} />

      {/* Boton navegacion a Settings*/}
      <Button
        buttonStyle={style.buttonStyle} color='#2FC4B2'
        icon={<Icon
          name="settings"
          size={30}
          color="white"
        />}
        onPress={() => navigation.navigate('Settings')} />

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
    end: 10,
    backgroundColor: '#2FC4B2',
    borderRadius: 10,
    elevation: 4,
  },
  buttonStyle: {
    borderRadius: 10,
    borderTopRightRadius: 0,
    backgroundColor: '#2FC4B2'
  }

})
