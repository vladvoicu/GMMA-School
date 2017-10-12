import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';

class InvalidToken extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const { containerStyle, contentContainerStyle, buttonStyle } = styles;
    return (
      <View style={containerStyle}>
        <View style={contentContainerStyle}>
          <Text style={{ marginTop: 40, color: 'red' }}> You have been logged out due to inactivity</Text>
          <TouchableOpacity style={buttonStyle} onPress={() => {
            this.props.navigation.dispatch(NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Login' })
              ]
            }));
          }}>
            <Text> Sign In </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
    containerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(120,120,120,0.5)'
    },
    contentContainerStyle: {
      width: 300,
      height: 150,
      backgroundColor: '#fafafa',
      borderRadius: 5,
      borderColor: '#fafafa',
      alignItems: 'center'
    },
    buttonStyle: {
      backgroundColor: '#fff',
      borderWidth: 1.5,
      borderRadius: 5,
      height: 35,
      width: 90,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }
  };


export default InvalidToken;
