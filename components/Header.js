import { View, Text, StyleSheet, Dimensions, useWindowDimensions, Platform } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Header({ appName }) {
  const {width, height} = useWindowDimensions();
  console.log(width);
  console.log(Platform.OS)
  const paddingVerticalDynamic = width < 380 ? 10 : 2;
  return (
    <View style={styles.container}>
      <Text style={[styles.info, {paddingVertical:paddingVerticalDynamic}]}>Welcome to {appName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: Platform.select({ios: 2, android: 4}),
    borderColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  info: {
    paddingHorizontal: windowHeight < 380 ? 10 : 20,
    fontSize: windowWidth < 380 ? 20 : 24,
    width: 350,
    textAlign: "center",
    maxWidth: "90%",
  }
});