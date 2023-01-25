import { Text, View, TextInput, Button, Modal, StyleSheet } from 'react-native'
import { useState } from 'react'

export default function Input({ sendChangedText, modalVisible, cancelPressed }) {
  const [text, setText] = useState();

  return (
    <Modal visible={modalVisible}>
      <View style={styles.container}>
        <TextInput style={{backgroundColor:'red'}} value={text} placeholder='please type here' onChangeText={(changedText) => {
          setText(changedText);
        }} />
        <Button
          title="Confirm"
          onPress={()=>sendChangedText(text)}
        />
        <Button
          title="Cancel"
          onPress={cancelPressed}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});