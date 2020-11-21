import * as React from 'react';
import { View, Text, Button } from 'react-native';


export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hi, Welcome !</Text>
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}
