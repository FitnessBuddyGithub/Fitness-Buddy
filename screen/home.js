import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './homePage'
import Coord from './coord'
import SignIn from './signIn'
import LogOut from './logOut'
import SignUp from './signUp'
const Stack = createStackNavigator();

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
        <Stack.Screen
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          name="LogOut"
          component={LogOut}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

