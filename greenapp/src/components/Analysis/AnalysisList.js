import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { SubHeader } from '../common';
import Menu from '../Menu/Menu';
import AnalysisHeader from './AnalysisHeader';
import AnalysisDetail from './AnalysisDetail';

class AnalysisList extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.menuAnimatedValue = new Animated.Value(0);
    this.mainAnimatedValue = new Animated.Value(0);
    console.log(this.props.complete);

    this.cashFlowArray = [];
    this.flipArray = [];
    this.rentArray = [];

   for (const analysis of this.props.complete) {
      switch (analysis.Type) {
        case 'Cashflow Analysis':
          this.cashFlowArray.push(analysis);
          break;
        case 'Flip':
          this.flipArray.push(analysis);
          break;
        case 'Rent vs. Own':
          this.rentArray.push(analysis);
          break;
        default:
          break;
      }
    }
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

  renderCashFlowHeader() {
    if (this.cashFlowArray.length > 0) {
      return (
        <SubHeader subheaderText="CASH FLOW" />
      );
    }
  }

  renderCashFlow() {
    return this.cashFlowArray.map(analysis =>
      <AnalysisDetail navigation={this.props.navigation} key={analysis.AnalysisId} analysisProp={analysis} />
    );
  }


  renderFlipHeader() {
    if (this.flipArray.length > 0) {
      return (
        <SubHeader subheaderText="FLIP" />
      );
    }
  }

  renderFlip() {
    return this.flipArray.map(analysis =>
      <AnalysisDetail navigation={this.props.navigation} key={analysis.AnalysisId} analysisProp={analysis} />
    );
  }

  renderRentHeader() {
    if (this.rentArray.length > 0) {
      return (
        <SubHeader subheaderText="RENT VS. OWN" />
      );
    }
  }

  renderRent() {
    return this.rentArray.map(analysis =>
      <AnalysisDetail navigation={this.props.navigation} key={analysis.AnalysisId} analysisProp={analysis} />
    );
  }

  renderIncompleteAnalyses() {
    const { iconStyle, incompleteAnalysesContainer, textStyle } = styles;

    if (this.props.incomplete.length > 0) {
      return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('IncompleteAnalysis')}>
          <View style={incompleteAnalysesContainer}>
            <Text style={textStyle}>You have {this.props.incomplete.length} incomplete analyses!</Text>
            <Image
              style={iconStyle}
              source={require('../../assets/forwardIcon.png')}
            />
          </View>
        </TouchableOpacity>
      );
    }
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
          <AnalysisHeader headerText="Analysis" navigator={this.props.navigation} onPress={() => this.toggleMenu()} />
          <ScrollView>
            {this.renderIncompleteAnalyses()}

            {this.renderCashFlowHeader()}
            {this.renderCashFlow()}

            {this.renderFlipHeader()}
            {this.renderFlip()}

            {this.renderRentHeader()}
            {this.renderRent()}
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
  menuContainerStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fafafa'
  },
  incompleteAnalysesContainer: {
    borderBottomWidth: 0.3,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconStyle: {
    height: 15,
    width: 15,
    tintColor: '#999',
    marginRight: 15
  },
  textStyle: {
    marginLeft: 15,
    fontSize: 16
  }
};

const mapStateToProps = state => {
  return {
    complete: state.analyses.complete,
    incomplete: state.analyses.incomplete
   };
};

export default connect(mapStateToProps)(AnalysisList);
