import React from 'react';
import { StyleSheet, View } from 'react-native';
import {  Divider, IconButton, MD3Colors, Menu, PaperProvider } from 'react-native-paper';

export const AppBar = () => {
  
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
  
    const closeMenu = () => setVisible(false);
  
    return (
        <View style={styles.appBar}>
      <PaperProvider>
        <View >
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton
                icon="menu"
                iconColor={MD3Colors.primary0}
                size={30}
                onPress={openMenu}
              />}>
            <Menu.Item onPress={() => {}} title="Item 1" />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
          </Menu>
        </View>

      </PaperProvider>
      </View>
    );
}

const styles = StyleSheet.create({
  appBar: {
    position: 'absolute',
    height: 100,
    justifyContent: 'center',
    zIndex: 999
  },
});
