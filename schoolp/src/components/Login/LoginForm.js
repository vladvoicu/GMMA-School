import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Input } from '../common';
import { connect } from 'react-redux';
import { SimpleHeader } from '../common';
import {
  updateUsername,
  updatePassword,
  clearLogin,
  getResidentials,
  getCommercials,
  getCompleteAnalyses,
  getIncompleteAnalyses,
  updateToken,
  updateTokenExist,
  clearToken
} from '../../actions';

const { width: screenWidth } = Dimensions.get('window');

class LoginForm extends Component {
  static navigationOptions = {
    header: null
  }

  state = { width: 0, portfolioLoaded: false, analysesLoaded: false, isPressed: false, userFound: true };

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  }

  signInPress() {
    this.setState({ isPressed: true });
    const residentials = [];
    const commercials = [];
    const complete = [];
    const incomplete = [];

    
      this.props.clearLogin();
      fetch('http://10.0.2.2:3000/v1/properties.json')
      .then(response => response.json())
      .then(responseJson => {
        for (const prop of responseJson.properties) {
          if (prop.Type === 'Residential') {
            residentials.push(prop);
          } else if (prop.Type === 'Commercial') {
            commercials.push(prop);
          }
        }

        // console.log('---------------------');
        // console.log(residentials);
        // console.log('---------------------');
        // console.log(commercials);
        // console.log('---------------------');

        this.props.getCommercials(commercials);
        this.props.getResidentials(residentials);

        this.setState({ portfolioLoaded: true });
      })

      fetch('http://10.0.2.2:3000/v1/analyses.json')
      .then(response => response.json())
      .then(responseJson => {
        for (const analysis of responseJson.analyses) {
          if (analysis.Status === 'Complete') {
            complete.push(analysis);
          } else if (analysis.Status === 'Incomplete') {
            incomplete.push(analysis);
          }
        }

        // console.log('---------------------');
        // console.log(complete);
        // console.log('---------------------');
        // console.log(incomplete);
        // console.log('---------------------');

        this.props.getCompleteAnalyses(complete);
        this.props.getIncompleteAnalyses(incomplete);
        this.setState({ analysesLoaded: true });
      })
  }

  onUsernameUpdate(text) {
    this.props.updateUsername(text);
  }

  onPasswordUpdate(text) {
    this.props.updatePassword(text);
  }

  renderSignIn() {
    const { buttonStyle } = styles;

    if (this.props.username === '' || this.props.password === '') {
      return (
        <View style={[buttonStyle,{ borderColor: '#ccc' }]}>
          <Text style={{ fontSize: 20, color: '#ccc' }}> Sign In </Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={buttonStyle} onPress={() => { this.signInPress() }}>
          <Text style={{ fontSize: 20 }}> Sign In </Text>
        </TouchableOpacity>
      );
    }
  }

  renderContent() {

    const { containerStyle, textStyle, buttonStyle, buttonsContainerStyle } = styles;

    
      if ( this.state.isPressed === true ) {
          if ( this.state.portfolioLoaded === true && this.state.analysesLoaded === true ) {
            this.props.navigation.navigate('Dashboard');
          } else {
            return (
              <View style={containerStyle}>
                <SimpleHeader headerText="Log In" />
                <View style={{ flex: 1 }} />
                <View style={{ flex: 2 }}>
                    <Input
                      label='Username'
                      placeholder='vladvoicu'
                      marginLeft={60}
                      marginTop={10}
                      onChangeText={this.onUsernameUpdate.bind(this)}
                      value={this.props.username}
                      fontSize={25}
                      // width={this.state.width * 2 / 6 - 40}
                    />
                    <Input
                      label='Password'
                      placeholder='*******'
                      secureTextEntry={true}
                      marginLeft={60}
                      marginTop={10}
                      onChangeText={this.onPasswordUpdate.bind(this)}
                      value={this.props.password}
                      fontSize={25}
                      // width={this.state.width * 2 / 6 - 40}
                    />
                  <View style={buttonsContainerStyle}>
                    {this.renderSignIn()}
                    <TouchableOpacity style={buttonStyle} onPress={() => this.props.navigation.navigate('SignUp')}>
                      <Text style={{ fontSize: 20 }}> Register </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 15, alignItems:'center'}}>
                    <Text style={{ fontSize: 20, marginBottom: 15 }}>Logging in ...</Text>
                    <ActivityIndicator />
                  </View>
                </View>
                <View style={{ flex: 2 }} />
              </View>
            );
        }
      } else {
        return (
          <View style={containerStyle}>
            <SimpleHeader headerText="Log In" />
            <View style={{ flex: 1 }} />
            <View style={{ flex: 2 }}>
                <Input
                  label='Username'
                  placeholder='vladvoicu'
                  marginLeft={60}
                  marginTop={10}
                  onChangeText={this.onUsernameUpdate.bind(this)}
                  value={this.props.username}
                  fontSize={25}
                  // width={this.state.width * 2 / 6 - 40}
                />
                <Input
                  label='Password'
                  placeholder='*******'
                  secureTextEntry={true}
                  marginLeft={60}
                  marginTop={10}
                  onChangeText={this.onPasswordUpdate.bind(this)}
                  value={this.props.password}
                  fontSize={25}
                  // width={this.state.width * 2 / 6 - 40}
                />
              <View style={buttonsContainerStyle}>
                {this.renderSignIn()}
                <TouchableOpacity style={buttonStyle} onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text style={{ fontSize: 20 }}> Register </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 2 }} />
          </View>
        );
      }
  }

  render() {

    return (
      <View style={styles.containerStyle}>
        {this.renderContent()}
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
  },
  buttonsContainerStyle: {
    flexDirection: 'row'
  }
};

const mapStateToProps = state => {
  return {
    username: state.login.username,
    password: state.login.password,
    exist: state.token.exist
  };
};

export default connect (mapStateToProps,{
  updateUsername,
  updatePassword,
  clearLogin,
  getCommercials,
  getResidentials,
  getCompleteAnalyses,
  getIncompleteAnalyses,
  updateToken,
  updateTokenExist,
  clearToken
})(LoginForm);
