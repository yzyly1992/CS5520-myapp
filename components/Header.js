import { View, Text } from 'react-native'
import React from 'react'

export default function Header({ appName }) {
  return (
    <View>
      <Text>Welcome to {appName}</Text>
    </View>
  )
}