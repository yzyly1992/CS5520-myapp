import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Header from "./components/Header";

export default function App() {
  const [text, setText] = useState();
  const name = "my awesome app";

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header appName="my awesome app" />
      <TextInput style={{ backgroundColor: 'red', }} placeholder='please type here' onChangeText={setText} />
      <Text>{text}</Text>
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
