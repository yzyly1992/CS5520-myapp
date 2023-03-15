import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../Firebase/firebase-setup';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();

    const loginHandler = () => {
        navigation.replace("Login")
    };
    const signupHandler = async () => {
        if (password !== confirmpassword) {
            Alert.alert("Passwords are not matched");
        } else {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (err) {
                console.log("signup err", err);
            }
        }
    };


  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput 
      style={styles.input}
      placeholder = "Email"
      value = {email}
      onChangeText = {(newEmail) => {setEmail(newEmail)}} 
      />
      <Text>Password</Text>
      <TextInput 
      style={styles.input}
      placeholder='Password'
      value = {password}
      secureTextEntry = {true}
      onChangeText = {(newPassword) => {setPassword(newPassword)}}
      />
      <Text>Confirm Password</Text>
      <TextInput 
      style={styles.input}
      placeholder='Confirm Password'
      value = {confirmpassword}
      secureTextEntry = {true}
      onChangeText = {(newPassword) => {setConfirmpassword(newPassword)}}
      />
      <Button title='Register' onPress={signupHandler}></Button>
      <Button title='Already User? Login here' onPress={loginHandler}></Button>
    </View>
    )
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize:16, 
        padding:5,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginBottom: 10,
        width: '50%',
      },
})