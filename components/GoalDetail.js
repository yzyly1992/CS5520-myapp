import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons'
import GoalUsers from './GoalUsers';

export default function GoalDetail({ route, navigation }) {
  useEffect(()=>{
    navigation.setOptions({
      title: route.params.goalItem.text,
      headerRight: ()=>{
          return (
              <AntDesign name="pluscircleo" size={24} color="white" onPress={()=>console.log("pressed from detail")}/>
          )
    }
    });
    
    return () => {
      console.log("unsubscribe");
    };
  })

  return (
    <View>
      <Text>{route.params.goalItem.id}</Text>
      <Text>{route.params.goalItem.text}</Text>
      <GoalUsers />
    </View>
  )
}