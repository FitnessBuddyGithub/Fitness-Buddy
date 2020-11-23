import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebaseSDK from '../FirebaseSvc';
import { registerNewUser } from '../store/user';
import { connect } from 'react-redux';
import styles from './styles';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('female')
  const onFooterLinkPress = () => {
    props.navigation.navigate('LogIn');
  };

  const onRegisterPress = () => {
    Keyboard.dismiss();
    // if (password !== confirmPassword) {
    //   Alert.alert("Passwords don't match. Please try again!");
    //   return;
    // }
    firebaseSDK
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        let token = await firebaseSDK.auth().currentUser.getIdToken();
        const body = {
          token,
          // gender,
          userName,
          email
        };
        await props.gotUser(body);
        props.navigation.navigate('LogIn');
      })
      .catch(() => {
        Alert.alert('Sorry, there was a problem creating an account. Please try again!');
      });
  };

  return (

    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='always'>
        <View>
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor='#aaaaaa'
            onChangeText={text => setEmail(text)}
            value={email}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
          />
          <TextInput
            style={styles.input}
            placeholder='UserName'
            placeholderTextColor='#aaaaaa'
            onChangeText={text => setUserName(text)}
            value={userName}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
          />
          <TextInput
            style={styles.input}
            placeholderTextColor='#aaaaaa'
            secureTextEntry
            placeholder='Password'
            onChangeText={text => setPassword(text)}
            value={password}
            underlineColorAndroid='transparent'
            textContentType='oneTimeCode'
            autoCapitalize='none'
          />
          {/* <TextInput
            placeholderTextColor='#aaaaaa'
            secureTextEntry
            placeholder='Confirm Password'
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid='transparent'
            autoCapitalize='none'
          /> */}

          <TouchableOpacity style={styles.button} onPress={() => onRegisterPress()} >

            <Text >SIGN UP</Text>

          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Log in
							</Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const mapState = state => ({
  user: state.singleUser
});

const mapDispatch = dispatch => ({
  gotUser: user => dispatch(registerNewUser(user))
});

export default connect(mapState, mapDispatch)(SignUp);
