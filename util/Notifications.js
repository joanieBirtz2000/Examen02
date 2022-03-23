import PushNotification from "react-native-push-notification";

export const createChannels = () => {
    PushNotification.createChannel({
        channelId: 'myChannel-01',
        channelName: 'myChannel',
    });
};

export const handleNotification = (message = null) => {
    PushNotification.cancelAllLocalNotifications();

    let bigText = 'Aucun message a ete envoye';

    if (message) bigText = message;

    PushNotification.localNotification({
        channelId: 'myChannel-01',
        title: 'Examen 2',
        message: 'Telechargement completer',
        bigText: bigText,
        color: 'blue',
        id: 1,
    });
}