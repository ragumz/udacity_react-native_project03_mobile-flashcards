import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';
import { STORAGE_KEYS, NOTIFICATION_REPEAT } from './constants';
import * as commons from './commons';


export function removeAllNotification() {
  return AsyncStorage.removeItem(STORAGE_KEYS.NOTIFICATION_TODAY)
          .then(Notifications.cancelAllScheduledNotificationAsync);
}

function createNotification(notificationKey) {
  switch (notificationKey) {
    case STORAGE_KEYS.NOTIFICATION_TODAY:
      return {
        title: 'Study today with Flashcards!',
        body: "Start a quick Flashcards' Quiz to refresh your memory now!",
        android: {
          priority: 'high',
          sticky: false,
          vibrate: true,
          sound: true,
        },
        ios: {
          sound: true,
        },
      };
    default:
      return null;
  }
}

export function scheduleNotification(notificationKey, time, repeat=NOTIFICATION_REPEAT.DAY) {
  if (commons.isNull(time)
      || time.getTime() < new Date().getTime()) {
    time = new Date();
    time.setDate(time.getDate() + 1);
    time.setHours(19);
    time.setMinutes(30);
  }
  return AsyncStorage.getItem(notificationKey)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelScheduledNotificationAsync(notificationKey);
            Notifications.scheduleLocalNotificationAsync(createNotification(notificationKey), {
              time,
              repeat
            });
            AsyncStorage.setItem(notificationKey, JSON.stringify(true));
            console.log(`Notification ${notificationKey} is set!`);
          } else {
            alert('You need to allow Notification permissions for this app. Access OS application setup to change.');
          }
        });
      } else {
        console.log(`Notification ${notificationKey} is already set!`);
      }
    })
    .then(() => {
      Permissions.getAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status !== 'granted') {
          alert('You need to allow Notification permissions for this app. Access OS application setup to change.');
        }
      });
    }).catch(error =>
      alert(`[ERROR] Failed to check notification: ${error.stack} `)
    );
}