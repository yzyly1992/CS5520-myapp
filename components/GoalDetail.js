import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import GoalUsers from './GoalUsers';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../Firebase/firebase-setup'

export default function GoalDetail({ route, navigation }) {
  const [url, setUrl] = useState("");
  useEffect(()=>{
    async function getImageUrl() {
      try {
      const reference = ref(storage, route.params.goalItem.imageURI);
      const uri = await getDownloadURL(reference);
      setUrl(uri)
      console.log(uri);
      } catch (err) {
        console.log(err);
      }
    }
    getImageUrl();
    // console.log(route.params.goalItem.imageURI);

  },[])

  useEffect(()=>{
    navigation.setOptions({
      title: route.params.goalItem.text,
      headerRight: ()=>{
          return (
              <AntDesign name="pluscircleo" size={24} color="white" onPress={()=>console.log("pressed from detail")}/>
          )
    }
    });
    
    return () => {
      console.log("unsubscribe");
    };
  },[])

  return (
    <View>
      <Text>{route.params.goalItem.id}</Text>
      <Text>{route.params.goalItem.text}</Text>
      {url && <Image source={{uri:url}} style={{width:100, height:100}}/>}
      <GoalUsers />
    </View>
  )
}