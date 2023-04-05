import { View, Button, Alert } from 'react-native'
import React from 'react'
import * as Notifications from "expo-notifications";

export default function NotificationManager() {

    async function scheduleNotification() {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            Alert.alert("You need notification permission");
        }
        try {
            await Notifications.scheduleNotificationAsync({content:{title:"TITLE",body:"BODY",data:{url:"https://google.com"}}, trigger:{ seconds:5 }});
            }
            catch (err) {console.log(err)}
    }

  return (
    <View>
      <Button title="Schedule Notification" onPress={()=>scheduleNotification()} />
    </View>
  )
}

export async function verifyPermission() {
    const permissionResponse = Notifications.getPermissionsAsync();
    // console.log(permissionInfo);
    if (permissionResponse.granted) {
        return true;
    }

    try {
        const result = await Notifications.requestPermissionsAsync();
        // console.log(result)
        return result.granted;
    } catch (err) {
        console.log(err);
    }
}