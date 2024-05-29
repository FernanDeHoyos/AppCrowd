import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, CheckBox } from '@rneui/base';
import { Ionicons } from '@expo/vector-icons';
import { useIncidentStore } from '../../hooks/useIncidentStore';

export const Filters = () => {
    const { user: { uid } } = useSelector((state) => state.auth);
    const { FilterIncidentById, FilterIncidentByRisk, loadAllIncidents } = useIncidentStore();
    const [selectedIndex, setIndex] = useState(0);
    const [checkBoxVisible, setCheckBoxVisible] = useState(false); // Estado para controlar la visibilidad de los CheckBox

    useEffect(() => {
        if (selectedIndex === 0) {
            loadAllIncidents();
        } else if (selectedIndex === 1) {
            FilterIncidentById(uid);
        } else if (selectedIndex === 2) {
            FilterIncidentByRisk('Alto riesgo con apoyo');
        } else if (selectedIndex === 3) {
            FilterIncidentByRisk('Mediano riesgo');
        } else if (selectedIndex === 4) {
            FilterIncidentByRisk('Bajo riesgo');
        }
        
        // Ocultar los CheckBox cuando se selecciona un filtro
        setCheckBoxVisible(false);
    }, [selectedIndex]);

    const toggleCheckBoxVisibility = () => {   
        setCheckBoxVisible(!checkBoxVisible); // Cambiar el estado de visibilidad al hacer clic en el botón
    };

    return (
        <>
            <View style={styles.buttonContainer}>
                <Button 
                    color='#fffc'
                    titleStyle={{ color: 'black' }}
                    onPress={toggleCheckBoxVisibility} >
                    <Ionicons 
                        name="options-outline" 
                        size={24} 
                        color="black"
                        style={{ paddingRight: 5 }} />
                    Filtro
                </Button>
            </View>

            {checkBoxVisible && (
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        title='Todos'
                        checked={selectedIndex === 0}
                        onPress={() => setIndex(0)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        title='Mios'
                        checked={selectedIndex === 1}
                        onPress={() => setIndex(1)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        title='Alto riesgo'
                        checked={selectedIndex === 2}
                        onPress={() => setIndex(2)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        title='Mediano riesgo'
                        checked={selectedIndex === 3}
                        onPress={() => setIndex(3)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                    />
                    <CheckBox
                        title='Bajo riesgo'
                        checked={selectedIndex === 4}
                        onPress={() => setIndex(4)}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        containerStyle={styles.checkBox}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    checkBoxContainer: {
        justifyContent: 'center',
        position: 'absolute',
        right: 10,
        top: 60,
        zIndex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        elevation: 4,
    },
    buttonContainer: {
        elevation: 4,
        backgroundColor: '#fffc',
        alignItems: 'flex-end',
        position: 'absolute',
        top: 10,
        right: 10, 
        zIndex: 1,
    },
});
