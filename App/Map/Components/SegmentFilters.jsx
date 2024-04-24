import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { ListIncidents } from '../Views/ListIncidents';

export const SegmentFilters = () => {

    const navigation = useNavigation()
    const [value, setValue] = useState('');

    const onFilterForId = () => {
        
    }

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'walk',
            label: 'Walking',
          },
          {
            value: 'train',
            label: 'Transit',
          },
          { 
            value: 'drive', 
            label: 'Driving' },
        ]}
      />
      <ListIncidents />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
  });
