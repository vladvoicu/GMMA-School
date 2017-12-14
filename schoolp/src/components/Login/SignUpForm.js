import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { Input } from '../common';
import { connect } from 'react-redux';
import { BackHeader } from '../common';
import { updateUsername, updatePassword, updateFirstName, updateLastName, updateEmail, updateConfirmPassword, clearRegister } from '../../actions';

const { width: screenWidth } = Dimensions.get('window');

class SignUpForm extends Component {
  static navigationOptions = {
    header: null
  }

  state = { width: 0 }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  }

  signUpPress() {
    const user = {
      username: this.props.username,
      password: this.props.password,
      FirstName: this.props.firstname,
      LastName: this.props.lastname,
      Email: this.props.email
    };
    axios.post('http://localhost:8888/greenmortgage/wp-json/gmma/v1/users',user)
      .then(response => console.log(response.data))
      .catch(error => {
        console.log(error.response);
      });
    this.props.clearRegister();
    this.props.navigation.navigate('Login');
  }

  onUsernameUpdate(text) {
    this.props.updateUsername(text);
  }

  onPasswordUpdate(text) {
    this.props.updatePassword(text);
  }

  onFirstNameUpdate(text) {
    this.props.updateFirstName(text);
  }

  onLastNameUpdate(text) {
    this.props.updateLastName(text);
  }

  onEmailUpdate(text) {
    this.props.updateEmail(text);
  }

  onConfirmPasswordUpdate(text) {
    this.props.updateConfirmPassword(text);
  }

  onGoBack() {
    this.props.clearRegister();
    this.props.navigation.goBack();
  }

  renderSignUp() {
    const { buttonStyle } = styles;

    if (this.props.username === '' || this.props.password === '' || this.props.firstname === '' || this.props.lastname === '' || this.props.email === '' || this.props.confirmpassword === '') {
      return (
        <View style={[buttonStyle,{ borderColor: '#ccc' }]}>
          <Text style={{ fontSize: 20, color: '#ccc' }}> Register </Text>
        </View>
      );
    } else if ( this.props.password === this.props.confirmpassword ){
      return (
        <TouchableOpacity style={buttonStyle} onPress={() => this.signUpPress()}>
          <Text style={{ fontSize: 20 }}> Register </Text>
        </TouchableOpacity>
      );
    } else if ( this.props.password != this.props.confirmpassword && this.props.confirmpassword != '' ) {
      return (
        <Text style={{ color: 'red', fontSize: 20, alignSelf: 'center', marginTop: 20 }}> Please enter the password again </Text>
      );
    }
  }

  render() {
    const { containerStyle, textStyle, buttonStyle } = styles;

    return (
      <View style={containerStyle}>
        <BackHeader headerText="Register" onPress={() => this.onGoBack() } />
        <View style={{ marginTop: 30 }}>
            <Input
              label='First Name'
              placeholder='Ion'
              marginLeft={60}
              marginTop={10}
              onChangeText={this.onFirstNameUpdate.bind(this)}
              value={this.props.firstname}
              fontSize={25}
              // width={this.state.width * 2 / 6 - 40}
            />
            <Input
              label='Last Name'
              placeholder='Popescu'
              marginLeft={60}
              marginTop={10}
              onChangeText={this.onLastNameUpdate.bind(this)}
              value={this.props.lastname}
              fontSize={25}
              // width={this.state.width * 2 / 6 - 40}
            />
            <Input
              label='Email'
              placeholder='ionpopescu@example.com'
              marginLeft={60}
              marginTop={10}
              onChangeText={this.onEmailUpdate.bind(this)}
              value={this.props.email}
              fontSize={25}
              // width={this.state.width * 2 / 6 - 40}
            />
            <Input
              label='Username'
              placeholder='ionpopescu'
              marginLeft={60}
              marginTop={10}
              onChangeText={this.onUsernameUpdate.bind(this)}
              value={this.props.username}
              fontSize={25}
              // width={this.state.width * 2 / 6 - 40}
            />
            <Input
              label='Password'
              placeholder='********'
              secureTextEntry={true}
              marginLeft={60}
              marginTop={10}
              onChangeText={this.onPasswordUpdate.bind(this)}
              value={this.props.password}
              fontSize={25}
              // width={this.state.width * 2 / 6 - 40}
            />
            <Input
              label='Confirm password'
              placeholder='********'
              secureTextEntry={true}
              marginLeft={60}
              marginTop={10}
              onChangeText={this.onConfirmPasswordUpdate.bind(this)}
              value={this.props.confirmpassword}
              fontSize={25}
              // width={this.state.width * 2 / 6 - 40}
            />
          {this.renderSignUp()}
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textStyle: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: '500',
    marginLeft: 50
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 5,
    height: 35,
    width: 90,
    marginLeft: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = state => {
  return {
    username: state.login.username,
    password: state.login.password,
    firstname: state.signup.firstname,
    lastname: state.signup.lastname,
    email: state.signup.email,
    confirmpassword: state.signup.confirmpassword
  };
};

export default connect (mapStateToProps,{
  updateUsername,
  updatePassword,
  updateFirstName,
  updateLastName,
  updateEmail,
  updateConfirmPassword,
  clearRegister
})(SignUpForm);
