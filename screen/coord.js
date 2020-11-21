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
    this.state = {
      latitude: null,
      longitude: null
    };
    // this.findCoordinates = this.findCoordinates.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  // findCoordinates = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       console.log(position)
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       })
  //       console.log('is the state updated? in find coordinates', this.state)
  //     },
  //     error => Alert.alert(error.message),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // };

  updateLocation = () => {
    try {
      // await this.findCoordinates()
      navigator.geolocation.getCurrentPosition(
        position => {
          // console.log(position)
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          // console.log('is the state updated? in find coordinates', this.state)
        }

        //,error => Alert.alert(error.message),
        // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
        console.log('state longitude: ',this.state.longitude)
        console.log('state latitude: ',this.state.latitude)

      let coord = {
        location: {
          type: "Point",
          coordinates: [
            this.state.longitude,
            this.state.latitude
          ]
        }
      }
      // console.log('coord is', coord)
      const storeState = store.getState();
      // console.log('state', state)
      // console.log('props', this.props)
      // console.log('singleuser', this.props.singleUser)
      this.props.updateLocthunk(storeState.singleUser.user.id, coord)
    } catch (err) {
      console.log(err)
    }

  }
  render() {
    const users = this.props.users || []
    return (
      <View style={styles.container} >
        <Button
          title="Refresh"
          onPress={() =>
            this.updateLocation()
          }
        />
        <TouchableOpacity onPress={this.updateLocation}>
          <Text style={styles.welcome}>Find My Coords?</Text>
          {users.map(user => {
            return (
              <View>{user.name}</View>
            )
          })
          }
        </TouchableOpacity>
        <Button
          title="Back to home"
          onPress={() =>
            this.props.navigation.navigate('signIn')
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

// const mapState = state => {
//   return {
//     singleUser: state.user,
//     users: state.users
//   }
// }
const mapDispatch = dispatch => {
  return {
    updateLocthunk: (userId, coord) => dispatch(usersNearBy(userId, coord))
  }
}

export default connect(null, mapDispatch)(CoordDC)
