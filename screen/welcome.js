import {Alert, View, Text, Button, StyleSheet, input } from 'react-native';
import React from 'react';
import { connect } from 'react-redux'
import {removeUser} from '../store/user'
import firebaseSvc from '../FirebaseSvc';


function WelcomePage(props) {
  const createLogoutAlert = () => {
		Alert.alert('Are you sure you want to log out?', null, [
			{
				text: 'OK',
				onPress:() => {
        //  await props.logOutUser()
					return firebaseSvc
						.auth()
						.signOut()
						.then(() => {
							console.log('You are signed out');
						});
				}
			},
			{
				text: 'Cancel',
				onPress: () => console.log('false alarm!')
			}
		]);
	};
  return (
    <View>
      <Text>Welcome!</Text>
      <Button
        title="Find People Nearby"
        onPress={() => props.navigation.navigate('Coord')}
      />
      <Button
        title="Log Out"
        onPress={() => createLogoutAlert()}
      />
    </View>
  );
}

const mapState = state => {
  return {
    singleUser: state.singleUser.user,
    users: state.users
  }
}
// const mapDispatch = dispatch => {
//   return {

//   }
// }

const mapDispatch = dispatch => {
  return {
    logOutUser: () => dispatch(removeUser())
  }
}

export default connect(mapState,mapDispatch)(WelcomePage)
