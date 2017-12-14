import React, { Component } from 'react';
import {  SubHeader } from '../common';
import { View, ScrollView, Text, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import ResidentialList from './ResidentialList';
import CommercialList from './CommercialList';
import Menu from '../Menu/Menu';
import PortofolioHeader from './PortofolioHeader';

class Portofolio extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.menuAnimatedValue = new Animated.Value(0);
    this.mainAnimatedValue = new Animated.Value(0);
  }

  state = { isOpen: false, width: 0 }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  }

  getButtonPressed = (isPressed) => {
    if (isPressed === true) {
      this.toggleMenu();
    }
  }

  renderResidentialsHeader() {
    if (this.props.residentials.length > 0) {
      return (
        <SubHeader subheaderText="RESIDENTIAL" />
      );
    }
  }

  renderCommercialsHeader() {
    if (this.props.commercials.length > 0) {
      return (
        <SubHeader subheaderText="COMMERCIAL" />
      );
    }
  }

  toggleMenu() {
    let menuToValue;
    let mainToValue;
    if (!this.state.isOpen) {
      menuToValue = 0;
      this.menuAnimatedValue.setValue(-this.state.width);
      mainToValue = this.state.width;
      this.mainAnimatedValue.setValue(0);
    } else {
      menuToValue = -this.state.width;
      this.menuAnimatedValue.setValue(0);
      mainToValue = 0;
      this.mainAnimatedValue.setValue(this.state.width);
    }

    Animated.timing(this.menuAnimatedValue, {
      toValue: menuToValue,
      duration: 300,
      easing: Easing.out(Easing.bezier(0, 0, 0.8, 1))
    }).start();

    Animated.timing(this.mainAnimatedValue, {
      toValue: mainToValue,
      duration: 300,
      easing: Easing.out(Easing.bezier(0, 0, 0.8, 1))
    }).start();

    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { menuContainerStyle, containerStyle } = styles;
    return (
      <View onLayout={this.onLayout} style={containerStyle}>
        <Animated.View style={[menuContainerStyle, { transform: [{ translateX: this.menuAnimatedValue }] }]}>
          <Menu
            buttonPressed={this.getButtonPressed}
            navigator={this.props.navigation}
          />
        </Animated.View>

        <Animated.View style={[containerStyle, { transform: [{ translateX: this.mainAnimatedValue }] }]}>
          <PortofolioHeader headerText="My Portfolio" onPress={() => this.toggleMenu()} />

          <ScrollView>
            {this.renderResidentialsHeader()}
            <ResidentialList navigation={this.props.navigation} />
            {this.renderCommercialsHeader()}
            <CommercialList navigation={this.props.navigation} />
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}
const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  textStyle: {
    fontSize: 18,
    color: '#808080',
    fontWeight: '400',
    paddingLeft: 50
  },
  menuContainerStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fafafa'
  }
};

const mapStateToProps = state => {
  return {
    residentials: state.assets.residentials,
    commercials: state.assets.commercials
  };
};

export default connect(mapStateToProps)(Portofolio);
