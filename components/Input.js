import { View, TextInput } from 'react-native'
import { useState } from 'react'

export default function Input({ sendChangedText }) {
const [text, setText] = useState();
  return (
    <View>
      <TextInput style={{ backgroundColor: 'red', }} placeholder='please type here' onChangeText={(changedText) => {
        setText(changedText);
        sendChangedText(changedText);
      }} />
    </View>
  )
}