import { Platform, View } from "react-native"
import { useState, useEffect } from 'react';
import { Button, Text } from "react-native-elements";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export const NotificationsIncident = () => {

    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        console.log('Expo RN send Notifications');
        registerForPushNotificationsAsync().then(
            (token) => {
                console.log('token: ', token);
                token && setExpoPushToken(token)
            },
        ).catch(err => console.log(err));
    }, [])

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            // Learn more about projectId:
            // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
            // EAS projectId is used here.
            try {
                token = (
                    await Notifications.getExpoPushTokenAsync(
                        'ea711926-b785-4a86-ae6c-938ab58603d9'
                    )
                ).data;
                console.log(token);
            } catch (e) {
                token = `${e}`;
            }
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    const sendNotifications = async() => {
        // notification message
        const message = {
            to: expoPushToken,
            sound: "default",
            title: "My first push notification!",
            body: "This is my first push notification made with expo rn app",
        };

        await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                host: "exp.host",
                accept: "application/json",
                "accept-encoding": "gzip, deflate",
                "content-type": "application/json",
            },
            body: JSON.stringify(message),
        });
    }

    return (
        <View style={{ marginTop: 100 }}>
            <Text>Expo RN send Notifications</Text>
            <Button title={'Send'} onPress={sendNotifications} />
        </View>
    )
}
