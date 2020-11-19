import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'
import { updateCoord } from '../store/coord'

export class CoordDC extends Component {

  state = {
    latitude: null,
    longitude: null
  };
  componentDidMount() {
    this.findCoordinates()
  }
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        const location = JSON.stringify(position);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };
  //sss
  render() {
    return (
      <View style={styles.container} >
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Find My Coords?</Text>
          <Text>latitude:{this.state.latitude}</Text>
          <Text>longitude:{this.state.longitude}</Text>
        </TouchableOpacity>
        <Button
          title="Back to home"
          onPress={() =>
            this.props.navigation.navigate('Home')
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

const mapDispatch = dispatch => {
  return {
    updateLocation: (coord) => dispatch(updateCoord(coord))
  }
}

export default connect(null, mapDispatch)(CoordDC)
