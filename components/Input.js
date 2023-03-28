import { Image, View, TextInput, Button, Modal, StyleSheet, Text } from 'react-native'
import { useState } from 'react'
import PressableButton from './PressableButton';
import ImageManager from './ImageManager';

export default function Input({ sendChangedText, modalVisible, cancelPressed }) {
  const [text, setText] = useState("");
  const [imageURI, setImageURI] = useState();
  function imageUriHandler(uri) {
    console.log(uri);
    setImageURI(uri);
  }

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
        <ImageManager imageUriHandler={imageUriHandler}/>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
          <Button
            title="Confirm"
            disabled={!text.length}
            onPress={()=>sendChangedText({text, imageURI})}
          />
          </View>
          <PressableButton
            customizedStyle={styles.button}
            pressedStyle={{backgroundColor:"pink", opacity:"0.5"}}
            buttonPressed={cancelPressed}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </PressableButton>
        </View>
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
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 10,
    width: '30%',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: "red",
  }
});