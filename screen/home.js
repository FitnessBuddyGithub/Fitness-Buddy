import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';
const Stack = createStackNavigator();
import HomeScreen from './homePage'
import Coord from './coord'

export default function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Coord"
          component={Coord}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

