import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Easing,
    Animated,
    Image,
    TouchableOpacity
  } from 'react-native';
import { connect } from 'react-redux';
import { Header, SubHeader, Card, CardSection, Button, SubHeaderLight } from '../common';
import IncompleteAnalysesList from './IncompleteAnalysesList';
import CompleteAnalysesList from './CompleteAnalysesList';
import Menu from '../Menu/Menu';

const { width:screenWidth, height:screenHeight } = Dimensions.get('window');
class Dashboard extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    const { residentials, commercials } = this.props;
    this.menuAnimatedValue = new Animated.Value(0);
    this.mainAnimatedValue = new Animated.Value(0);
    this.values = [];
    this.types = [];
    this.graphMargin = 0;

    for (let i = 0; i < residentials.length; i++) {
      this.values.push(residentials[i]);
      this.types.push('Residential');
    }
    for (let i = 0; i < commercials.length; i++) {
      this.values.push(commercials[i]);
      this.types.push('Commercial');
    }

    if (screenWidth > screenHeight) {
      this.width = screenWidth * 2 / 3;
    } else {
      this.width = screenWidth;
    }
  }

  state = { isOpen: false, width: 0, height: 0 }

  onLayout = (e) => {
   this.setState({
     width: e.nativeEvent.layout.width,
     height: e.nativeEvent.layout.height
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

  renderIcon(index) {
    const { graphIconStyle } = styles;

    if (this.types[index] === 'Residential') {
      return (
        <Image
          style={graphIconStyle}
          source={require('../../assets/residentialIcon.png')}
        />
      );
    } else {
      return (
        <Image
          style={graphIconStyle}
          source={require('../../assets/commercialIcon.png')}
        />
      );
    }
  }

  renderGraph() {
    const { barStyle } = styles;

    return this.values.map(item => {
      return (
        <View style={{ marginRight: this.graphMargin }} key={item.PropertyId} >
          <View style={{ position: 'absolute', paddingTop: item.HealthValue / 100 * 165, transform: [{ translateX: -12 }] }} >
            {this.renderIcon(this.values.indexOf(item))}
          </View>
          <View style={[barStyle, { position: 'relative', backgroundColor: '#808080', height: 165, margin: 12.5, marginTop: 15 }]} />
        </View>
      );
    });
  }

  renderScrollable() {
    const startingPoint = 123;
    const remaining = this.width - startingPoint;
    const lastSection = 13;

    if (this.values.length <= 6) {
      const section = (remaining - lastSection ) / 6;
      const margin = section - 18.5;
      this.graphMargin = margin;
      return (
        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
          {this.renderGraph()}
        </View>
      );
    } else {
      const section = (remaining - lastSection ) / 5;
      const margin = section - 18.5;
      this.graphMargin = margin;
      return (
        <ScrollView horizontal>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            {this.renderGraph()}
          </View>
        </ScrollView>
      );
    }
  }

  renderIncompleteHeader() {
    if ( this.props.incomplete.length > 0) {
      return (
        <SubHeaderLight subHeaderText="INCOMPLETE" />
      );
    }
  }

  renderCompleteHeader() {
    if ( this.props.complete.length > 0) {
      return (
        <SubHeaderLight subHeaderText="COMPLETE" />
      );
    }
  }

  render() {
    const {
      containerStyle,
      textStyle,
      menuContainerStyle,
      graphContainerStyle,
      portfolioHealthStyle,
      graphGradesStyle,
      portfolioHeaderStyle,
      portfolioFooterStyle,
      graphViewStyle,
      iconStyle,
      buttonStyle
    } = styles;
    const { navigate } = this.props.navigation;

    return (
      <View onLayout={this.onLayout} style={containerStyle}>
        <Animated.View style={[menuContainerStyle, { transform: [{ translateX: this.menuAnimatedValue }] }]}>
          <Menu
            buttonPressed={this.getButtonPressed}
            navigator={this.props.navigation}
          />
        </Animated.View>

        <Animated.View style={[containerStyle, { transform: [{ translateX: this.mainAnimatedValue }] }]}>

          <Header headerText="Dashboard" onPress={() => this.toggleMenu()} />

          <ScrollView>
            <SubHeader subheaderText="MY PORTFOLIO" />

            <Card>
              <CardSection>
              <TouchableOpacity onPress={() => navigate('Portfolio')} style={buttonStyle}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        style={iconStyle}
                        source={require('../../assets/residentialIcon.png')}
                      />
                      <Text style={textStyle}>{this.props.residentials.length} Residential</Text>
                    </View>
                    <Image
                      style={iconStyle}
                      source={require('../../assets/forwardIcon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </CardSection>

              <CardSection>
                <TouchableOpacity onPress={() => navigate('Portfolio')} style={buttonStyle}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        style={iconStyle}
                        source={require('../../assets/commercialIcon.png')}
                      />
                      <Text style={textStyle}>{this.props.commercials.length} Commercial</Text>
                    </View>
                    <Image
                      style={iconStyle}
                      source={require('../../assets/forwardIcon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </CardSection>

              <View style={graphContainerStyle}>
                <View style={portfolioHealthStyle}>
                  <Text style={portfolioHeaderStyle}>
                    OVERALL PORTFOLIO HEALTH
                  </Text>
                  <Text style={{ fontSize: 36 }}>
                    Good*
                  </Text>
                </View>
                <View style={graphViewStyle}>
                  <View style={{ position: 'absolute', height: 200, width: screenWidth * 3 }}>
                    <View style={{ backgroundColor: '#ffcccb', flex: 1 }} >
                      <Text style={graphGradesStyle}>WORST</Text>
                    </View>
                    <View style={{ backgroundColor: '#cdf2a6', flex: 1, justifyContent: 'flex-end' }} >
                      <Text style={[graphGradesStyle, { marginBottom: 5 }]}>BEST</Text>
                    </View>
                  </View>
                  {this.renderScrollable()}
                </View>
                <View style={portfolioFooterStyle}>
                  <Text style={{ fontSize: 12 }}>
                    *Based on information you reported in your analyses
                  </Text>
                </View>
              </View>
            </Card>
            <SubHeader subheaderText="MY ANALYSES" />
            {this.renderIncompleteHeader()}
            <IncompleteAnalysesList navigation={this.props.navigation} />
            {this.renderCompleteHeader()}
            <CompleteAnalysesList navigation={this.props.navigation} />
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
  graphContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8'
  },
  textStyle: {
    fontSize: 24,
    paddingLeft: 15,
    marginTop: 5.5
  },
  portfolioHealthStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10
  },
  portfolioHeaderStyle: {
    fontSize: 14
  },
  graphGradesStyle: {
    transform: [{ rotateX: '180deg' }],
    color: '#777',
    marginTop: 5,
    marginLeft: 15
  },
  portfolioFooterStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 10
  },
  menuContainerStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fafafa'
  },
  barStyle: {
    borderRadius: 5,
    width: 1,
    marginLeft: 5
  },
  labelStyle: {
    marginLeft: 5
  },
  graphViewStyle: {
    paddingLeft: 100,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ccc',
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    transform:[{ rotateX:'180deg' }]
  },
  iconStyle: {
    height: 25,
    width: 25,
    tintColor: '#999',
    marginTop: 5.5
  },
  graphIconStyle: {
    transform: [{ rotateX: '180deg' }],
    height: 35,
    width: 35,
    tintColor: '#777'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  }
};

 const mapStateToProps = state => {
   return {
     residentials: state.assets.residentials,
     commercials: state.assets.commercials,
     complete: state.analyses.complete,
     incomplete: state.analyses.incomplete
   };
 };

export default connect(mapStateToProps)(Dashboard);
