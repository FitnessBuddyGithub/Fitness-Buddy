import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux'

export class SignInDC extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {

  }
  render() {
    return (
      <View>
        <Text>This is Sign In page</Text>
        <Button
          title="Find People Near Me"
          onPress={() => this.props.navigation.navigate('Coord')}
        />
        <Button
          title="Log Out"
          onPress={() => this.props.navigation.navigate('LogOut')}
        />
      </View>
    );
  }
}

const mapState = state => {
  return {
    singleUser: state.user,
    users: state.users
  }
}



export default connect(mapState)(SignInDC);


