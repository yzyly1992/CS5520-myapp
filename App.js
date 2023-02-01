import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  
  const name = "my awesome app";
  // const [enteredText, setEnteredText] =  useState("Default Value");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function onTextEntered(changedText) {
    // setEnteredText(changedText);
    const newGoal = {text:changedText, id:Math.floor(Math.random() * 100)};
    setGoals(prev => [...prev, newGoal]);
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
        {
          goals.map( (e) => {
            return (
            <View style={styles.textContainer} key={e.id}>
              <Text style={styles.text}>{e.text}</Text>
            </View>
            )
          } )
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: 'grey',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: "purple",
  },
  textContainer: {
    borderRadius: 5,
    backgroundColor: "yellow",
    padding: 5,
    margin: 5,
  }
});
