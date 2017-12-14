import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import AnalysisDetail from './AnalysisDetail';

class CompleteAnalysesList extends Component {

   constructor(props) {
    super(props);
    this.analyses = this.props.complete;
  }

  renderAnalyses() {
    return this.analyses.map(analysis =>
      <AnalysisDetail
        key={analysis.AnalysisId}
        analysis={analysis}
        navigation={this.props.navigation}
        />
    );
  }

  render() {
    return (
      <View>
         {this.renderAnalyses()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    complete: state.analyses.complete
   };
};

export default connect(mapStateToProps)(CompleteAnalysesList);
