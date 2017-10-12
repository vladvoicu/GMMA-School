import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class AnalysisDetail extends Component {
  constructor(props) {
    super(props);
    const { ForProperty } = this.props.analysisProp;
    this.property = {};

    for (const property of this.props.residentials) {
      if (ForProperty === property.Name) {
        this.property = property;
        break;
      }
    }

    for (const property of this.props.commercials) {
      if (ForProperty === property.Name) {
        this.property = property;
        break;
      }
    }
  }

  renderIcon() {
    const { iconStyle } = styles;

    if (this.property.Type === 'Residential') {
      return (
        <Image
          style={iconStyle}
          source={require('../../assets/residentialIcon.png')}
        />
      );
    } else {
      return (
        <Image
          style={iconStyle}
          source={require('../../assets/commercialIcon.png')}
        />
      );
    }
  }

  render() {
    const {
      containerStyle,
      iconContainerStyle,
      textContainerStyle,
      headerTextStyle,
      dateStyle,
      addressStyle
    } = styles;
    const { ForProperty, Type, AnalysisId } = this.props.analysisProp;
    console.log(AnalysisId);

    this.analysisDate = new Date(this.props.analysisProp.Date);
    const stringDate = this.analysisDate.toString();
    const splitDate = stringDate.split(' ');

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('AnalysisReport', { id: { AnalysisId }})}>
        <View style={containerStyle}>
          <View style={iconContainerStyle}>
          {this.renderIcon()}
          </View>
          <View style={textContainerStyle}>
            <Text style={headerTextStyle}>{ForProperty}</Text>
            <Text style={addressStyle}>
              {this.property.StreetNumber} {this.property.StreetName}, {this.property.City}, {this.property.ZipCode}
            </Text>
            <Text style={dateStyle}>{splitDate[1]} {splitDate[2]}, {splitDate[3]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    flexDirection: 'row'
  },
  iconStyle: {
    height: 25,
    width: 25,
    tintColor: '#999',
    marginRight: 15
  },
  iconContainerStyle: {
    flex: 1,
    marginLeft: 25,
    marginTop: 15,
    alignItems: 'flex-end'
  },
  addressStyle: {
    fontSize: 12,
    color: '#c6c6c6',
  },
  dateStyle: {
    fontSize: 16,
    paddingTop: 2
  },
  headerTextStyle: {
    fontSize: 24,
    paddingBottom: 2
  },
  textContainerStyle: {
    flex: 9,
    marginTop: 11.5,
    marginBottom: 20
  }
};

const mapStateToProps = state => {
  return {
    commercials: state.assets.commercials,
    residentials: state.assets.residentials
   };
};

export default connect(mapStateToProps)(AnalysisDetail);
