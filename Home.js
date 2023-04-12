import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import GoalItem from './components/GoalItem';
import Header from "./components/Header";
import Input from "./components/Input";
import { writeToDB, deleteItem, addUserInfo, getUserInfo } from './Firebase/firestoreHelper';
import { onSnapshot, collection, where, query } from 'firebase/firestore';
import { db, auth, storage } from './Firebase/firebase-setup';
import { ref, uploadBytesResumable } from 'firebase/storage';
import {getExpoPushTokenAsync} from "expo-notifications";
import { verifyPermission } from "./components/NotificationManager";
import * as Notifications from "expo-notifications";

export default function Home({navigation}) {

  useEffect(()=>{
    async function getToken() {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        });
      }
      try {
        const token = await getExpoPushTokenAsync();
        console.log(token);
        await addUserInfo({token: token.data});
      } catch (err) {
        console.log(err);
      }
    }
    getToken();
  },[])

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "goals"), where("user", "==", auth.currentUser.uid)),(querySnapshot) => {
      if (querySnapshot.empty) {
        setGoals([]);
      } else {
        const newGoals = [];
        querySnapshot.forEach((doc) => {
            newGoals.push({ ...doc.data(), id:doc.id });
        });
        setGoals(newGoals);
      }
    },
    (err) => {
      console.log(err);
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

  async function onTextEntered(dataFromInput) {
    // if (dataFromInput.)
    // setEnteredText(changedText);
    let imageURI = "";
    if (dataFromInput.imageURI) {
      imageURI = await fetchImage(dataFromInput.imageURI);
    }
    const newGoal = {text:dataFromInput.text, imageURI: imageURI};
    setGoals(prev => [...prev, newGoal]);
    writeToDB(newGoal);
    
    setModalVisible(false);
  }

  async function fetchImage(uri) {
    try {
    const response = await fetch(uri);
    const imageBlob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf('/') + 1);
    const imageRef = await ref(storage, `images/${imageName}`)
    const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
    return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log(err);
    }
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
  
  async function pushNotificationHandler() {
    try {
    const userInfo = await getUserInfo();
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
      "content-type": "application/json",
      },
      body: JSON.stringify({
      to: userInfo.token,
      title: "Push Notification",
      body: "This is a push notification",
      data: { url:"https://google.com" },
      })
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header appName={name} />
        <Input sendChangedText={onTextEntered} modalVisible={modalVisible} cancelPressed={onCancel}/>
        <Button title="Add A Task" onPress={()=>setModalVisible(true)}/>
        <Button title="Push Notification" onPress={()=>pushNotificationHandler()} />
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
