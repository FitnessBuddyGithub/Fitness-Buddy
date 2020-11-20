import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Coord from './coord'

function signIn({ navigation }) {
  return (
    <View>
      <Text>This is Sign In page</Text>
      <Button
        title="Find People Near Me"
        onPress={() => navigation.navigate('Coord')}
      />
      <Button
        title="Log Out"
        onPress={() => navigation.navigate('LogOut')}
      />
    </View>
  );
}

export default signIn;
