import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const InfoIncidents = ({ incidents }) => {
    // Función para contar la cantidad de incidentes por tipo
    const countIncidentsByType = useMemo(() => {
        return incidents.reduce((acc, incident) => {
            const type = incident.type_risk;
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
    }, [incidents]);

    // Total de incidentes
    const totalIncidents = incidents.length;

    // Calcular porcentajes
    const percentages = useMemo(() => {
        const result = {};
        for (const type in countIncidentsByType) {
            result[type] = ((countIncidentsByType[type] / totalIncidents) * 100).toFixed(2) + '%';
        }
        return result;
    }, [countIncidentsByType, totalIncidents]);

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <View style={[styles.colorIndicator, { backgroundColor: 'red' }]} />
                <Text style={styles.text}>Alto riesgo: {countIncidentsByType['Alto riesgo con apoyo']} ({percentages['Alto riesgo con apoyo']})</Text>
            </View>
            <View style={styles.label}>
                <View style={[styles.colorIndicator, { backgroundColor: 'orange' }]} />
                <Text style={styles.text}>Mediano riesgo: {countIncidentsByType['Mediano riesgo']} ({percentages['Mediano riesgo']})</Text>
            </View>
            <View style={styles.label}>
                <View style={[styles.colorIndicator, { backgroundColor: 'green' }]} />
                <Text style={styles.text}>Bajo riesgo: {countIncidentsByType['Bajo riesgo']} ({percentages['Bajo riesgo']})</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 10,
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    colorIndicator: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 5,
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold',
    },
});
