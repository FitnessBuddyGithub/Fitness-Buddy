import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'
import { usersNearBy } from '../store/users'
import store from '../store'

export class CoordDC extends Component {
  _isMounted = false;
  constructor() {
    super()
    const storeState = store.getState();
    this.state = {
      latitude: null,
      longitude: null,
      store: storeState
    };
    console.log('props', this.props)
    this.findCoordinates = this.findCoordinates.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
  }
  componentDidMount() {
    this._isMounted = true;

  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        console.log('is the state updated? in find coordinates', this.state)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  updateLocation = async () => {
    try {
      await this.findCoordinates()
      console.log('what is state?? ', this.state)
      let coord = {
        location: {
          type: "Point",
          coordinates: [
            this.state.longitude,
            this.state.latitude
          ]
        }
      }
      console.log('coord is', coord)

      // console.log('state', state)
      // console.log('props', this.props)
      // console.log('singleuser', this.props.singleUser)
      this.props.updateLocthunk(this.state.store.singleUser.user.uid, coord)
    } catch (err) {
      console.log(err)
    }

  }
  render() {
    const users = this.props.users || []
    console.log('mapstate users', this.props.users)
    return (
      <View style={styles.container} >
        <Button
          title="Refresh"
          onPress={this.updateLocation}
        />
        {users.length < 1
          ? <Text>There are no users close to you</Text>
          :
          <Text style={styles.welcome}>
            {users.map(user => {
              return (
                <View key={user.uid}>
                  <Text >{user.email}</Text>
                  <Text>{user.gender}</Text>
                  <Text>His/her longitude: {user.location.coordinates[0]}</Text>
                  <Text>His/her latitude: {user.location.coordinates[1]}</Text>
                </View>
              )
            })
            }
          </Text>
        }



        <Button
          title="Back to home"
          onPress={() =>
            this.props.navigation.navigate('Welcome')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapState = state => {
  return {
    // singleUser: state.singleUser.user,
    users: state.users
  }
}
const mapDispatch = dispatch => {
  return {
    updateLocthunk: (userId, coord) => dispatch(usersNearBy(userId, coord))
  }
}

export default connect(mapState, mapDispatch)(CoordDC)
