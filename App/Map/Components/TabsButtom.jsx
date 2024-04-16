import { MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { StyleSheet, Dimensions } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Card } from "../Screens/Cards";
import { Map } from "../Views/Map";
import { IncidentForm } from "../Screens/IncidentForm";
import { CollectiveMap } from "../Views/CollectiveMap";
import { Settings } from "../Views/Settings";

export const TabButtom = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (

    <Tab.Navigator
      initialRouteName="MapCollective"
      activeColor="#289C8E"
      inactiveColor="#2fc4b2"
      barStyle={styles.tabBar}
    >
      <Tab.Screen
        name="MapCollective"
        component={CollectiveMap}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="map-marked-alt"
              color={color}
              size={23}
              style={styles.tabIcon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Mapa"
        component={Map}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="form"
              color={color}
              size={23}
              style={styles.tabIcon}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Card"
        component={Card}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bell"
              color={color}
              size={23}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="settings"
              color={color}
              size={23}
              style={styles.tabIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 50,

  },

});
