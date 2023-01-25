import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  
  const name = "my awesome app";
  const [enteredText, setEnteredText] =  useState("Default Value");
  const [modalVisible, setModalVisible] = useState(false);

  function onTextEntered(changedText) {
    setEnteredText(changedText);
    setModalVisible(false);
  }

  function onCancel() {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header appName={name} />
        <Input sendChangedText={onTextEntered} modalVisible={modalVisible} cancelPressed={onCancel}/>
        <Button title="Add A Task" onPress={()=>setModalVisible(true)} />
        </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.info}>{enteredText}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    fontSize: 18,
    color: 'black',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: 'grey',
    alignSelf: 'stretch',
  }
});
