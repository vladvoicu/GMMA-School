import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { BackHeader } from '../common';

class AssetDetailExpanded extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    const residentials = this.props.residentialsArray;
    const commercials = this.props.commercialsArray;
    const propId = this.props.navigation.state.params.id.PropertyId;
    this.selectedProp = {};

    for (const asset of residentials) {
      if (asset.PropertyId === propId) {
        this.selectedProp = asset;
      }
    }

    for (const asset of commercials) {
      if (asset.PropertyId === propId) {
        this.selectedProp = asset;
      }
    }
  }

  dateToString(itemDate) {
    const date = new Date(itemDate);
    const stringDate = date.toString();
    const splitDate = stringDate.split(' ');
    return splitDate[1] + ' ' + splitDate[2] + ', ' + splitDate[3];
  }

  renderAnalyses() {
    const analyses = [];

    for (const analysis of this.props.complete) {
      if (this.selectedProp.PropertyId === analysis.PropertyId) {
        analyses.push(analysis);
      }
    }

    return analyses.map(item => (
      <Text key={item.AnalysisId} style={{ fontSize: 18, marginTop: 5 }}>
        {item.Type.toUpperCase()} - {this.dateToString(item.Date)}
      </Text>
    ));
  }

  renderIcon() {
    const { iconStyle } = styles;

    if (this.selectedProp.Type === 'Residential') {
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
    const { state, goBack } = this.props.navigation;
    const {
      containerStyle,
      contentContainerStyle,
      descriptionTitleStyle,
      propTypeStyle,
      contentViewStyle
    } = styles;

    const title = state.params.name.Name;

    const purchaseDate = new Date(this.selectedProp.PurchaseDate);
    const stringDate = purchaseDate.toString();
    const splitDate = stringDate.split(' ');

    return (
      <View style={containerStyle}>
        <BackHeader
          headerText={title}
          onPress={() => goBack()}
        />
        <View style={contentContainerStyle}>
          <Text style={descriptionTitleStyle}>PROPERTY TYPE</Text>
          <View style={{ flexDirection: 'row' }}>
            {this.renderIcon()}
            <Text style={propTypeStyle}>{this.selectedProp.Type}</Text>
          </View>
          <View style={contentViewStyle}>
            <Text style={descriptionTitleStyle}>ADDRESS</Text>
            <Text style={{ fontSize: 18, marginTop: 5 }}>
              {this.selectedProp.StreetNumber} {this.selectedProp.StreetName}, {this.selectedProp.City}, {this.selectedProp.ZipCode}
            </Text>
          </View>
          <View style={contentViewStyle}>
            <Text style={descriptionTitleStyle}>PURCHASE DATE</Text>
            <Text style={{ fontSize: 18, marginTop: 5 }}>{splitDate[1]} {splitDate[2]}, {splitDate[3]}</Text>
          </View>
          <View style={contentViewStyle}>
            <Text style={descriptionTitleStyle}>ANALYSES</Text>
            {this.renderAnalyses()}
          </View>
          <View style={contentViewStyle}>
            <Text style={descriptionTitleStyle}>Mortgage</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  contentContainerStyle: {
    borderBottomWidth: 0.3,
    borderColor: '#999',
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20
  },
  descriptionTitleStyle: {
    fontSize: 12,
    color: '#c6c6c6'
  },
  propTypeStyle: {
    fontSize: 26,
    paddingLeft: 15
  },
  iconStyle: {
    height: 25,
    width: 25,
    tintColor: '#999',
    marginTop: 5.5
  },
  contentViewStyle: {
    paddingTop: 15
  }
};

const mapStateToProps = state => {
  return {
    residentialsArray: state.assets.residentials,
    commercialsArray: state.assets.commercials,
    complete: state.analyses.complete,
    incomplete: state.analyses.incomplete
  };
};

export default connect(mapStateToProps)(AssetDetailExpanded);
