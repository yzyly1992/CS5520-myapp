import { View, Text } from 'react-native';
import React from 'react';
import Home from './Home';
import GoalDetail from './components/GoalDetail';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons'; 
import PressableButton from './components/PressableButton';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"pink"}, headerTitleStyle:{color:"purple", fontSize: 18}, headerTitleAlign:"center"}}>
            <Stack.Screen name="Home" component={Home} options={{
                title:"Home Page",
                headerRight: ()=>{
                    return (
                        <PressableButton
                            // customizedStyle={{backgroundColor:"white", opacity:"1"}}
                            pressedStyle={{backgroundColor:"pink", opacity:"0.3"}}
                            buttonPressed={()=>console.log("pressed")}
                        >
                            <AntDesign name="warning" size={24} color="white" />
                        </PressableButton>
                    )
                }
                }} />
            <Stack.Screen name="Detail" component={GoalDetail} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}