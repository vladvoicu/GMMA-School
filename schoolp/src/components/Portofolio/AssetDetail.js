import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { connect } from 'react-redux';

class AssetDetail extends Component {

  renderAnalyses() {
    const { PropertyId } = this.props.assetProp;
    const { iconStyle } = styles;
    const analyses = [];

     for (const analysis of this.props.complete) {
       if (PropertyId === analysis.PropertyId) {
         analyses.push(analysis);
       }
      }

      return analyses.map(item =>
        <View key={item.AnalysisId} style={{ flexDirection: 'row' }}>
          <Image
            style={iconStyle}
            source={require('../../assets/checkIcon.png')}
          />
          <Text>{item.Type.toUpperCase()} Analysis</Text>
        </View>
      );
  }

  renderIcon() {
    const { Type } = this.props.assetProp;
    const { assetIconStyle } = styles;

    if (Type === 'Residential') {
      return (
        <Image
          style={assetIconStyle}
          source={require('../../assets/residentialIcon.png')}
        />
      );
    } else {
      return (
        <Image
          style={assetIconStyle}
          source={require('../../assets/commercialIcon.png')}
        />
      );
    }
  }

  render() {
    const {
      containerStyle,
      nameStyle,
      addressStyle,
      cardContainerStyle,
      headingContainerStyle,
      contentContainerStyle,
      textContainerStyle,
      analysesContainerStyle,
      iconStyle,
      arrowContainerStyle,
      detailsContainerStyle,
      iconContainerStyle
    } = styles;
    const {
      PropertyId,
      Name,
      StreetName,
      StreetNumber,
      City,
      ZipCode,
      AnnualROI
    } = this.props.assetProp;
    const { navigate } = this.props.navigation;

    return (
      <View style={containerStyle}>
        <TouchableWithoutFeedback onPress={() => navigate('AssetDetailExpanded', { id: { PropertyId }, name: { Name } })}>
          <View style={{ flexDirection: 'row' }}>
           <View style={iconContainerStyle}>
              {this.renderIcon()}
            </View>
            <View style={detailsContainerStyle}>
              <View style={cardContainerStyle}>
                <View style={headingContainerStyle}>
                  <Text style={nameStyle}>{Name}</Text>
                  <Text style={addressStyle}>
                    {StreetNumber} {StreetName}, {City}, {ZipCode}
                  </Text>
                </View>
                <View style={contentContainerStyle}>
                  <View>
                    <ProgressCircle
                      percent={100 - AnnualROI}
                      radius={45}
                      borderWidth={18}
                      color="#eee"
                      shadowColor="#999"
                      bgColor="#fff"
                    />
                  </View>
                  <View style={textContainerStyle}>
                    <Text style={{ fontSize: 22 }}>{AnnualROI}%</Text>
                    <Text style={{ fontSize: 12 }}>ANNUAL R.O.I</Text>
                    <View style={analysesContainerStyle}>
                      {this.renderAnalyses()}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={arrowContainerStyle}>
              <Image
                style={iconStyle}
                source={require('../../assets/forwardIcon.png')}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 2,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 25
  },
  detailsContainerStyle: {
    flex: 10,
    paddingLeft: 10
  },
  iconContainerStyle: {
    flex: 1
  },
  arrowContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  nameStyle: {
    fontSize: 22,
    color: '#808080',
    fontWeight: '400'
  },
  addressStyle: {
    fontSize: 12,
    color: '#c6c6c6'
  },
  headingContainerStyle: {
    paddingBottom: 20,
    paddingTop: 3
  },
  cardContainerStyle: {
    flex: 1
  },
  contentContainerStyle: {
    flexDirection: 'row'
  },
  textContainerStyle: {
    paddingLeft: 20,
    paddingTop: 15
  },
  analysesContainerStyle: {
    paddingTop: 20
  },
  iconStyle: {
    height: 15,
    width: 15,
    tintColor: '#999',
    marginRight: 5
  },
  assetIconStyle: {
    height: 30,
    width: 30,
    tintColor: '#999'
  }
};

const mapStateToProps = state => {
  return {
    commercials: state.assets.commercials,
    residentials: state.assets.residentials,
    complete: state.analyses.complete,
    incomplete: state.analyses.incomplete
  };
};

export default connect(mapStateToProps)(AssetDetail);
