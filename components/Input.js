import { View, TextInput, Button } from 'react-native'
import { useState } from 'react'

export default function Input({ sendChangedText }) {
  const [text, setText] = useState();
  function buttonPressed() {
    sendChangedText(text);
    setText();
  }

  return (
    <View>
      <TextInput value={text} style={{ backgroundColor: 'red', }} placeholder='please type here' onChangeText={(changedText) => {
        setText(changedText);
        style={backgroundColor: 'red',}
      }} />
      <Button
        title="Confirm"
        onPress={buttonPressed}
      />
    </View>
  )
}