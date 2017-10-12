import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import AssetDetail from './AssetDetail';

class CommercialList extends Component {

  constructor(props) {
    super(props);
    this.commercials = this.props.commercialsArray;
  }


  renderCommercials() {
    return this.commercials.map(asset =>
      <AssetDetail navigation={this.props.navigation} key={asset.PropertyId} assetProp={asset} typeProp='Commercial' />
    );
  }

  render() {
    return (
      <View>
        {this.renderCommercials()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    commercialsArray: state.assets.commercials
   };
};


export default connect(mapStateToProps)(CommercialList);
