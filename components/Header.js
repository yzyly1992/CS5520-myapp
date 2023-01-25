import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Header({ appName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Welcome to {appName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  info: {
    fontSize: 18,
  }
});