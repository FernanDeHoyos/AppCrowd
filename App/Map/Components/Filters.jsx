import { Ionicons } from '@expo/vector-icons'
import { Button, CheckBox } from '@rneui/base'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { useIncidentStore } from '../../hooks/useIncidentStore'
import { useSelector } from 'react-redux'

export const Filters = () => {

    const {user:{uid}} = useSelector((state) => state.auth)
    const {FilterIncidentById, FilterIncidentByRisk} = useIncidentStore()
    const [selectedIndex, setIndex] = useState(0);
    const [checkBoxVisible, setCheckBoxVisible] = useState(false); // Estado para controlar la visibilidad de los CheckBox

    useEffect(() => {
        if (selectedIndex === 0) {
            FilterIncidentById(uid);
        } else if (selectedIndex === 1) {
            FilterIncidentByRisk('Alto riesgo con apoyo');
        } else if (selectedIndex === 2) {
            FilterIncidentByRisk('Mediano riesgo');
        } else if (selectedIndex === 3) {
            FilterIncidentByRisk('Bajo riesgo');
        }
    }, [selectedIndex]);

    const toggleCheckBoxVisibility = () => {   
        setCheckBoxVisible(!checkBoxVisible); // Cambiar el estado de visibilidad al hacer clic en el botón
    };

  return (
    <>
        <View style={styles.buttonContainer}>
                <Button 
                  color='#fffc'
                  titleStyle={{color: 'black'}}
                  onPress={toggleCheckBoxVisibility} >
                 <Ionicons 
                    name="options-outline" 
                    size={24} 
                    color="black"
                    style={{paddingRight: 5}} />
                 Filters
                  </Button>
            </View>

            {checkBoxVisible && (
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        title='Mios'
                        checked={selectedIndex === 0}
                        onPress={() => setIndex(0)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        title='Alto riesgo'
                        checked={selectedIndex === 1}
                        onPress={() => setIndex(1)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        title='Mediano riesgo'
                        checked={selectedIndex === 2}
                        onPress={() => setIndex(2)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        title='Bajo riesgo'
                        checked={selectedIndex === 3}
                        onPress={() => setIndex(3)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        containerStyle={styles.checkBox}
                    />
                </View>
            )}
    </>
  )
}

const styles = StyleSheet.create({
    listView: {
       flex: 1,
       position: 'relative',
       backgroundColor: '#fff'
    },
    checkRadio:{
        justifyContent: 'center',
    },
    checkBoxContainer: {
        justifyContent: 'center', // Centrar los CheckBox horizontalmente
        position: 'absolute', // Posición absoluta para superponer los CheckBox sobre otros componentes
        right: 10, // Distancia desde el lado derecho de la pantalla
        top: 60, // Distancia desde la parte superior de la pantalla
        zIndex: 1, // Colocar el contenedor por encima de otros componentes
        backgroundColor: '#fff', // Color de fondo del contenedor
        borderRadius: 5, // Bordes redondeados
        padding: 10, // Espaciado interno para el contenido
        elevation: 4, // Agregar sombra
    },
    buttonContainer: {
        backgroundColor: '#fffc',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 10,
        right: 10, 
        zIndex: 1,

    },
  
    
})

