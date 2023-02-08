import { View, Text, StyleSheet, Button, Pressable } from 'react-native'
import React from 'react'
import PressableButton from "./PressableButton"
import { AntDesign } from '@expo/vector-icons'; 

export default function GoalItem(props) {

  return (
    <View>
      <Pressable
        onPress={props.onGoalPressed}
        android_ripple={{ color:"red", borderless:false, radius:10, foreground: true }}
        style={({ pressed })=>{
          // console.log(pressed);
          if (pressed) {
            return [styles.textContainer, styles.pressedStyle];
          } else {
            return styles.textContainer;
          }
        }}
      >
            <Text style={styles.text}>{props.item.text}</Text>
            <PressableButton 
              customizedStyle={styles.textContainer}
              pressedStyle={styles.pressedStyle}
              buttonPressed={props.onDelete}
            >
              <AntDesign name="delete" size={24} color="grey" />
            </PressableButton>
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
    pressedStyle: {
      backgroundColor: "red",
      opacity: "0.5",
    },
})