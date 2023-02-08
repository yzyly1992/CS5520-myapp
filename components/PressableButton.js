import { View, Text, Pressable } from 'react-native'
import React from 'react'

export default function PressableButton(props) {
  return (
    <Pressable 
        onPress={props.buttonPressed}
        style={({pressed})=>{
            return pressed ? [props.customizedStyle, props.pressedStyle] : props.customizedStyle;
        }}
    >
      {props.children}
    </Pressable>
  )
}