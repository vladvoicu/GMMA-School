import React, { Component } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BackHeader } from '../../common';

class AddAnalysis extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    const {
      containerStyle,
      textContainerStyle,
      textStyle,
      sectionStyle,
      sectionIconStyle,
      sectionTextStyle,
      iconStyle
    } = styles;

    return (
      <View style={containerStyle}>
        <BackHeader headerText='Analysis' onPress={() => this.props.navigation.navigate('Analysis')} />
        <ScrollView>

          <View style={textContainerStyle}>
            <Text style={textStyle}>
              Choose from three types of analysis:
            </Text>
          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('ConfirmAnalysis', { type: 'Cash Flow Analysis' })}>
            <View style={sectionStyle}>
              <View style={sectionTextStyle}>
                <Text style={{ fontSize: 24 }}>Cash Flow Analysis</Text>
                <Text style={{ fontSize: 16, color: '#aaa', paddingTop: 10, paddingBottom: 10 }}>
                  Discover the future value of your investment property, your estimated ROI, and more.
                </Text>
                <Text style={{ fontSize: 10, color: '#aaa' }}>
                  Time to complete: Approx. 5 to 30 minutes depending on expertise
                </Text>
              </View>
              <View style={sectionIconStyle}>
                <Image
                  style={iconStyle}
                  source={require('../../../assets/addAnalysisIcon.png')}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('ConfirmAnalysis', { type: 'Flip Analysis' })}>
            <View style={sectionStyle}>
              <View style={sectionTextStyle}>
                <Text style={{ fontSize: 24 }}>Flip Analysis</Text>
                <Text style={{ fontSize: 16, color: '#aaa', paddingTop: 10, paddingBottom: 10 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Text style={{ fontSize: 10, color: '#aaa' }}>
                  Time to complete: Approx. 5 to 30 minutes depending on expertise
                </Text>
              </View>
              <View style={sectionIconStyle}>
                <Image
                  style={iconStyle}
                  source={require('../../../assets/addAnalysisIcon.png')}
                />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('ConfirmAnalysis', { type: 'Rent vs. Own Analysis' })}>
            <View style={sectionStyle}>
              <View style={sectionTextStyle}>
                <Text style={{ fontSize: 24 }}>Rent vs. Own Analysis</Text>
                <Text style={{ fontSize: 16, color: '#aaa', paddingTop: 10, paddingBottom: 10 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
                <Text style={{ fontSize: 10, color: '#aaa' }}>
                  Time to complete: Approx. 5 to 30 minutes depending on expertise
                </Text>
              </View>
              <View style={sectionIconStyle}>
                <Image
                  style={iconStyle}
                  source={require('../../../assets/addAnalysisIcon.png')}
                />
              </View>
            </View>
          </TouchableOpacity>

        </ScrollView>
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
    marginLeft: 7,
    fontSize: 17,
  },
  textContainerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    height: 55,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 20
  },
  sectionStyle: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ddd'
  },
  sectionTextStyle: {
    flex: 8,
    padding: 17
  },
  sectionIconStyle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    height: 40,
    width: 40,
    tintColor: '#999'
  }
};

export default AddAnalysis;
