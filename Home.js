import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, SafeAreaView, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import Header from "./components/Header";
import Input from "./components/Input";
import { writeToDB, deleteItem } from './Firebase/firestoreHelper';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from './Firebase/firebase-setup';

export default function Home({navigation}) {

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "goals"), (querySnapshot) => {
      if (querySnapshot.empty) {
        setGoals([]);
      } else {
        // console.log(querySnapshot.docs[1].data());

        const newGoals = [];
        querySnapshot.forEach((doc) => {
            newGoals.push({ ...doc.data(), id:doc.id });
        });
        setGoals(newGoals);
      }
    });

    // cleanup function
    return () => {
      console.log("unsubscribe");
      unsubscribe();
    };
  }, []);
  
  const name = "my awesome app";
  // const [enteredText, setEnteredText] =  useState("Default Value");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function onTextEntered(changedText) {
    // setEnteredText(changedText);
    const newGoal = {text:changedText};
    setGoals(prev => [...prev, newGoal]);
    writeToDB(newGoal);
    setModalVisible(false);
  }

  function onCancel() {
    setModalVisible(false);
  }

  function onDeletePressed (deleteId) {
    // console.log(id);
    // setGoals(prev => goals.filter(goal => goal.id !== deleteId));
    deleteItem(deleteId);
  }

  function goalPressed(item) {
    // console.log("pressed: " + item.id);
    navigation.navigate('Detail', {goalItem: item});
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header appName={name} />
        <Input sendChangedText={onTextEntered} modalVisible={modalVisible} cancelPressed={onCancel}/>
        <Button title="Add A Task" onPress={()=>setModalVisible(true)}/>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          contentContainerStyle={styles.scrollContentsStyle}
          data={goals}
          renderItem={({ item })=>{
            return (
            <GoalItem item={item} onDelete={()=>onDeletePressed(item.id)} onGoalPressed={()=>goalPressed(item)}/>
            )
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.scrollContentsStyle} alwaysBounceVertical={false}>
          {
            goals.map( (e) => {
              return (
              <View style={styles.textContainer} key={e.id}>
                <Text style={styles.text}>{e.text}</Text>
              </View>
              )
            } )
          }
        </ScrollView> */}
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
  },
  text: {
    fontSize: 50,
    color: "purple",
  },
  textContainer: {
    borderRadius: 5,
    backgroundColor: "yellow",
    padding: 5,
    margin: 5,
  },
  scrollContentsStyle: {
    alignItems: 'center',
  }
});
