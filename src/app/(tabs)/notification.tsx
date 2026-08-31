import { View, Button, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowBanner: true,
        shouldSetBadge: false,
        shouldShowList: true
    }),
})

const NotificationScreen = () => {
    useEffect(() => {
        registerForAndroidNotifications(); 
        setupCategories();

        const subscription = Notifications.addNotificationResponseReceivedListener(async (response)=>{
            const actionId = response.actionIdentifier;
            const chatId = response.notification.request.content.data?.chatId;
            const notificationId = response.notification.request.identifier;

            if(actionId === 'REPLY_ACTION'){
                const userText = (response as any).userText;
                console.log(`Reply to chat#${chatId}: `, userText);
            }
            if(actionId === 'MARK_READ_ACTION'){
                console.log(`Message in chat#${chatId} marked as read`);
                await Notifications.dismissAllNotificationsAsync();
            }

            await Notifications.dismissNotificationAsync(notificationId);
        })

        return()=> subscription.remove();

    }, []);

    const setupCategories = async () => {
        await Notifications.setNotificationCategoryAsync('chat_reply', [
            {
                identifier: 'REPLY_ACTION',
                buttonTitle: 'Reply',
                textInput: {
                    submitButtonTitle: 'Reply',
                    placeholder: 'Type message...',
                },
                options: {
                    opensAppToForeground: false,
                }
            },
            {
                identifier: 'MARK_READ_ACTION',
                buttonTitle: 'Mark as read',
                options: {
                    opensAppToForeground: false,
                    isDestructive: true
                }
            }
        ])
    }

    const registerForAndroidNotifications = async () => {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'NotifyScreen',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#620d3add'
            })

            await Notifications.setNotificationChannelAsync('promo', {
                name: 'Promo',
                description: 'promo and ads',
                importance: Notifications.AndroidImportance.LOW,
                enableVibrate: false
            })
        }
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Alert.alert("Error", 'Please go to settings and turn on notification permission');
        }
    }

    const sendNotify = async (notifyType: number) => {
        switch (notifyType) {
            case 1:
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'You clicked button',
                        body: 'This default notify.',
                        sound: 'default',
                    },
                    trigger: {
                        seconds: 2,
                        channelId: 'default'
                    }
                });
                break;

            case 2:
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: '🎉WOW! BLack friday. 100%',
                        body: 'This ads notify.',
                        sound: 'default',
                    },
                    trigger: {
                        seconds: 2,
                        channelId: 'promo'
                    }
                });
                break;
            case 3:
                await Notifications.scheduleNotificationAsync({
                    content:{
                        title: 'User1',
                        body: 'Sup',
                        categoryIdentifier: 'chat_reply',
                        data: {chatId: '12345'},
                    },
                    trigger:null
                })
                break;
        }

    }
    return (
        <SafeAreaView>
            <View>
                <Button title="Send notify" onPress={() => sendNotify(1)} />
                <Button title="Send ads notify" onPress={() => sendNotify(2)} />
                <Button title="Send chat message notify" onPress={() => sendNotify(3)} />
            </View>
        </SafeAreaView>

    )
}

export default NotificationScreen;