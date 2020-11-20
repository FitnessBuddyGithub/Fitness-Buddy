import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


function logOut(props) {
  return (
    <View>
      <Text>You have successfully logged out</Text>
    </View>
  );
}

export default logOut;
