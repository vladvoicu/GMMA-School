import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class StartingPage extends Component {
  static navigationOptions = {
    header: null
  }

  state = { portfolioLoaded: false, analysesLoaded: false };

  setRoute() {
    if ( this.props.token === '' ) {
      this.props.navigation.navigate('Login');
    } else {
      this.props.navigation.navigate('Dashboard');
    }
  }


  renderContent() {
    const { containerStyle, titleStyle, contentStyle, sectionStyle, spinnerContainerStyle } = styles;
    const { navigate } = this.props.navigation;

      return (
        <View style={containerStyle}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Login')}>
            <View style={{ flex: 1 }}>
              <View style={sectionStyle}>
                <Text style={titleStyle}>
                  greenmortgage
                </Text>
                <Text style={contentStyle}>
                  Real estate investment tools
                </Text>
              </View>
              <View style={spinnerContainerStyle} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sectionStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 30
  },
  titleStyle: {
    fontSize: 38
  },
  contentStyle: {
    fontSize: 21
  },
  spinnerContainerStyle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30
  }
};

const mapStateToProps = state => {
  return {
    token: state.token.token
  };
};

export default connect(mapStateToProps, actions)(StartingPage);
