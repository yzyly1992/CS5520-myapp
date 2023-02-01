import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'

export default function GoalItem(props) {
  return (
    <View style={styles.textContainer}>
        <Text style={styles.text}>{props.item.text}</Text>
        <Button title="X" />
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50,
        color: "purple",
    },
    textContainer: {
        // position: "inline-flex",
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: "yellow",
        padding: 5,
        margin: 5,
    },
})