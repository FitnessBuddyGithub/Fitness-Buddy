import React, { useState } from 'react';
import { Text, TextInput, View, Alert, Keyboard, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebaseSDK from '../FirebaseSvc';
import { getUser } from '../store/user';
import { connect } from 'react-redux';
// import styles from './styles';

function LoginScreen(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onFooterLinkPress = () => {
		props.navigation.navigate('SignUp');
	};

	const onLoginPress = () => {
		Keyboard.dismiss();
		firebaseSDK
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(async () => {
        console.log('email', email)
        console.log('password: ', password)
				await props.gotUser(email, password);
				props.navigation.navigate('Welcome');
			})
			.catch(() => {
				alert('Your email or password is incorrect. Please try again!');
			});
	};

	return (
		<View >
			<KeyboardAwareScrollView
				style={{ flex: 1, width: '100%' }}
				keyboardShouldPersistTaps='always'>
				<TextInput

					placeholder='Email'
					placeholderTextColor='#aaaaaa'
					onChangeText={text => setEmail(text)}
					value={email}
					underlineColorAndroid='transparent'
					autoCapitalize='none'
				/>
				<TextInput

					placeholderTextColor='#aaaaaa'
					secureTextEntry
					placeholder='Password'
					onChangeText={text => setPassword(text)}
					value={password}
					underlineColorAndroid='transparent'
					autoCapitalize='none'
				/>
        <TouchableOpacity onPress={() => onLoginPress()} >
			  <View>
				<Text >LOG IN</Text>
			</View>
		  </TouchableOpacity>

				<View >
					<Text >
						Don't have an account?{' '}
						<Text onPress={onFooterLinkPress}>
							Sign up
						</Text>
					</Text>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}

const mapState = state => ({
	user: state.singleUser
});

const mapDispatch = dispatch => ({
	gotUser: (email, password) => dispatch(getUser(email,password))
});

export default connect(mapState, mapDispatch)(LoginScreen);
