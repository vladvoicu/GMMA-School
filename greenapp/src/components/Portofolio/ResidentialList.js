import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import AssetDetail from './AssetDetail';

class ResidentialList extends Component {

   constructor(props) {
    super(props);
    this.residentials = this.props.residentialsArray;
  }


  renderResidentials() {
    return this.residentials.map(asset =>
      <AssetDetail navigation={this.props.navigation} key={asset.PropertyId} assetProp={asset} typeProp='Residential' />
    );
  }

  render() {
    return (
      <View>
        {this.renderResidentials()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    residentialsArray: state.assets.residentials
   };
};

export default connect(mapStateToProps)(ResidentialList);
