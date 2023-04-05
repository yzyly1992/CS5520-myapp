import React, { useState, useEffect } from 'react';
import Home from './Home';
import Login from './components/Login';
import Signup from './components/Signup';
import GoalDetail from './components/GoalDetail';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons'; 
import PressableButton from './components/PressableButton';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebase-setup';
import Profile from './components/Profile';
import { signOut } from 'firebase/auth';
import Map from './components/Map';
import * as Notifications from "expo-notifications";
import { Linking } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async ()=>{
        return { shouldShowAlert: true, shouldSetBadge: true, shouldPlaySound: true, }
    }
})

const Stack = createNativeStackNavigator();

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const subscription1 = Notifications.addNotificationReceivedListener((notification)=>{
            console.log(notification.request.content.data.url);
        });
        const subscription2 = Notifications.addNotificationResponseReceivedListener((response)=>{
            // console.log(response.notification.request.content.data.url);
            Linking.openURL(response.notification.request.content.data.url);
        });
        return () => {
            subscription1.remove();
            subscription2.remove();
        }
    },[]);

    useEffect(() => {
        onAuthStateChanged(auth, (user)=>{
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
    },[]);

    const AuthStack = (
    <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    </>
    )

    const AppStack = (<>
                <Stack.Screen name="Home" component={Home} options={({ navigation }) => {
                    return {
                    title:"Home Page",
                    headerRight: ()=>{
                        return (
                            <PressableButton
                                // customizedStyle={{backgroundColor:"white", opacity:"1"}}
                                pressedStyle={{backgroundColor:"pink", opacity:"0.3"}}
                                buttonPressed={()=>navigation.navigate("Profile")}
                            >
                                <AntDesign name="meh" size={24} color="purple" />
                            </PressableButton>
                        )
                    }
                    }}} />
                <Stack.Screen name="Detail" component={GoalDetail} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="Profile" component={Profile} options={{
                    title:"Profile",
                    headerRight: ()=>{
                        return (
                            <PressableButton
                                // customizedStyle={{backgroundColor:"white", opacity:"1"}}
                                pressedStyle={{backgroundColor:"pink", opacity:"0.3"}}
                                buttonPressed={async ()=>{
                                    try {
                                        await signOut(auth);
                                    } catch (err) {
                                        console.log("Signout err", err);
                                    }
                                }}
                            >
                                <AntDesign name="logout" size={24} color="purple" />
                            </PressableButton>
                        )
                    }
                    }}
                />
    </>)

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"pink"}, headerTitleStyle:{color:"purple", fontSize: 18}, headerTitleAlign:"center"}}>
                {isAuthenticated ? AppStack : AuthStack}
            </Stack.Navigator>
        </NavigationContainer>
    )
}