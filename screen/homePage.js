import * as React from 'react';
import { View, Text, Button } from 'react-native';


export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hi, Welcome !</Text>
      <Button
        title="Log In"
        onPress={() => navigation.navigate('LogIn')}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}
