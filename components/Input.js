import { Image, View, TextInput, Button, Modal, StyleSheet } from 'react-native'
import { useState } from 'react'

export default function Input({ sendChangedText, modalVisible, cancelPressed }) {
  const [text, setText] = useState();

  return (
    <Modal visible={modalVisible}>
      <View style={styles.container}>
        <Image 
        source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/1200px-Twemoji_1f600.svg.png"}}
        style={styles.img}
        />
        <TextInput style={styles.input} value={text} placeholder='please type here' onChangeText={(changedText) => {
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
  img: {
    width: 100,
    height: 100,
    margin: 20,
  },
  input: {
    fontSize:16, 
    padding:5,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 10,
    width: '50%',

  }
});