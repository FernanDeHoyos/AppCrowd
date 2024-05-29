import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Avatar, Text } from "react-native-elements";

export const HeaderStyle = ({ name }) => {
    const LettersIcon = name?.substring(0, 2);
    return (
        <View style={styles.container}>
            <View style={styles.icon_name}>
            <Avatar
                size={32}
                rounded
                title={LettersIcon}
                containerStyle={{ backgroundColor: "#015D52" }}
            />
            <Text style={styles.name}>{name}</Text>
            </View>
            <Text style={styles.title}> Incidentes </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon_name:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 38
    },
});