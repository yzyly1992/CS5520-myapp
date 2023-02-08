import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'

export default function GoalItem(props) {

  return (
    <View>
      <Pressable
        onPress={props.onGoalPressed}
        android_ripple={{ color:"red", borderless:false, radius:10, foreground: true }}
        style={styles.textContainer}
      >
            <Text style={styles.text}>{props.item.text}</Text>
            <Button 
            title="X" 
            onPress={()=>props.onDelete()}
            color="black"
            />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50,
        color: "purple",
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        borderRadius: 5,
        backgroundColor: "yellow",
        padding: 5,
        margin: 5,
    },
})