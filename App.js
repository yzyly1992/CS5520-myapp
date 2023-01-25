import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  
  const name = "my awesome app";
  const [enteredText, setEnteredText] =  useState();
  const [modalVisible, setModalVisible] = useState(false);

  function onTextEntered(changedText) {
    setEnteredText(changedText);
    setModalVisible(false);
  }

  function onCancel() {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header appName={name} />
      <Input sendChangedText={onTextEntered} modalVisible={modalVisible} cancelPressed={onCancel}/>
      <Button title="Add A Task" onPress={()=>setModalVisible(true)} />
      <Text>{enteredText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
