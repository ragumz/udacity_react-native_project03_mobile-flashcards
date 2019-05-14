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
        body: "It's time to start a quick Flashcards' Quiz to refresh your memory!",
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
  if (commons.isEmpty(notificationKey)) {
    throw Error('No notification key specified for scheduling.');
  }
  if (commons.isEmpty(repeat) || commons.isEmpty(NOTIFICATION_REPEAT[repeat.toUpperCase()])) {
    throw Error(`Incorrect repeat option specified for scheduling notification ${notificationKey}.`);
  }
  if (commons.isNull(time)
      || time.getTime() < new Date().getTime()) {
    time = new Date();
    time.setDate(time.getDate() + 1);
    time.setHours(19);
    time.setMinutes(30);
  }
  AsyncStorage.getItem(notificationKey)
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
          } else {
            alert('Hey! You have not enabled Notification permissions for this app.');
          }
        });
      }
    })
    .then(() => {
      Permissions.getAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status !== 'granted') {
          alert('Hey! You have not enabled Notification permissions for this app.');
        }
      });
    });
}