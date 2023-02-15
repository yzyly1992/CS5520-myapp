import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

export default function GoalDetail({ route, navigation }) {
  navigation.setOptions({
    title: route.params.goalItem.text,
    headerRight: ()=>{
        return (
            <AntDesign name="pluscircleo" size={24} color="white" onPress={()=>console.log("pressed from detail")}/>
        )
  }
  })
  return (
    <View>
      <Text>{route.params.goalItem.id}</Text>
      <Text>{route.params.goalItem.text}</Text>
    </View>
  )
}