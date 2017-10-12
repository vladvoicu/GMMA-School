import React, { Component } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { XHeader, SubHeader } from '../../common';
import CompareDetail from './CompareDetail';
import { clearSelectedCompareArray, setCancel, getAnalysisType } from '../../../actions';

class CompareList extends Component {
  static navigationOptions = {
    header: null
  }

  state = { modalVisible: false };

  constructor(props) {
    super(props);
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

  presses = [];

  getButtonPressed = (id) => {
    this.presses.push(id);
    if (this.presses.length === 2) {
      if (this.presses[0] !== this.presses[1]) {
        this.setState({ modalVisible: true });
      }
      if (this.presses[0] === this.presses[1] || this.presses.length > 2
      ) {
        this.presses.splice(0, this.presses.length);
      }
    }
  }

  onModalClose() {
    this.setState({ modalVisible: false });
    this.props.clearSelectedCompareArray();
    this.props.setCancel(true);
    this.presses.splice(0,this.presses.length);
  }

  onModalOK() {
    const { analysisType } = this.props;
    this.props.navigation.navigate('CompareReports', { type: { analysisType } });
    this.setState({ modalVisible: false });
    this.props.setCancel(true);
    this.presses.splice(0,this.presses.length);
  }

  onGoBack() {
    this.props.clearSelectedCompareArray();
    this.props.navigation.goBack();
  }

  renderCashFlowHeader() {
    if (this.cashFlowArray.length > 0) {
      return (
        <SubHeader subheaderText="CASH FLOW" />
      );
    }
  }

  renderCashFlow(bool) {
    return this.cashFlowArray.map(analysis =>
      <CompareDetail
        selected={bool}
        key={analysis.AnalysisId}
        analysisProp={analysis}
        buttonPressed={this.getButtonPressed}
        />
    );
  }


  renderFlipHeader() {
    if (this.flipArray.length > 0) {
      return (
        <SubHeader subheaderText="FLIP" />
      );
    }
  }

  renderFlip(bool) {
    return this.flipArray.map(analysis =>
      <CompareDetail
        selected={bool}
        key={analysis.AnalysisId}
        analysisProp={analysis}
        buttonPressed={this.getButtonPressed}
        />
    );
  }

  renderRentHeader() {
    if (this.rentArray.length > 0) {
      return (
        <SubHeader subheaderText="RENT VS. OWN" />
      );
    }
  }

  renderRent(bool) {
    return this.rentArray.map(analysis =>
      <CompareDetail
        selected={bool}
        key={analysis.AnalysisId}
        analysisProp={analysis}
        buttonPressed={this.getButtonPressed}
        />
    );
  }

  nameOfAnalyses() {
    for ( const analysis of this.props.complete ) {
      if ( analysis.AnalysisId === this.props.compareList[0] ) {
        this.leftname = analysis.ForProperty;
      }
      if ( analysis.AnalysisId === this.props.compareList[1] ) {
        this.rightname = analysis.ForProperty;
      }
    }
  }

  renderModal() {
    const {
      modalContainerStyle,
      modalContentContainerStyle,
      nameContainerStyle,
      closeContainerStyle,
      okContainerStyle
    } = styles;

    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => console.log('Closed')}
        supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
      >
        {this.nameOfAnalyses()}
        <View style={modalContainerStyle}>
          <View style={{ flex: 1 }} />
          <View style={modalContentContainerStyle}>
            <View style={nameContainerStyle}>
              <Text style={{ fontSize: 26, fontWeight: '500' }}>Compare</Text>
              <Text style={{ fontSize: 14, marginTop: 5}}>{this.props.analysisType} Reports for:</Text>
              <Text style={{ fontSize: 14, marginTop: 10}}>{this.leftname}</Text>
              <Text style={{ fontSize: 14 }}>vs.</Text>
              <Text style={{ fontSize: 14, marginBottom: 10}}>{this.rightname}</Text>
            </View>
            <View style={closeContainerStyle}>
              <TouchableOpacity onPress={() => this.onModalClose()}>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: '400' }}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={okContainerStyle}>
              <TouchableOpacity onPress={() => this.onModalOK()}>
                <View>
                  <Text style={{ fontSize: 18, fontWeight: '500' }}>OK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 2 }} />
        </View>
      </Modal>
    );
  }

  renderContent(type) {
    if (type === 'Cashflow Analysis') {
      return (
        <View>
          {this.renderCashFlowHeader()}
          {this.renderCashFlow(true)}
          {this.renderFlipHeader()}
          {this.renderFlip(false)}
          {this.renderRentHeader()}
          {this.renderRent(false)}
        </View>
      );
    } else if (type === 'Flip') {
      return (
        <View>
          {this.renderCashFlowHeader()}
          {this.renderCashFlow(false)}
          {this.renderFlipHeader()}
          {this.renderFlip(true)}
          {this.renderRentHeader()}
          {this.renderRent(false)}
        </View>
      );
    } else if (type === 'Rent vs. Own') {
      return (
        <View>
          {this.renderCashFlowHeader()}
          {this.renderCashFlow(false)}
          {this.renderFlipHeader()}
          {this.renderFlip(false)}
          {this.renderRentHeader()}
          {this.renderRent(true)}
        </View>
      );
    } else {
      return (
        <View>
          {this.renderCashFlowHeader()}
          {this.renderCashFlow(true)}
          {this.renderFlipHeader()}
          {this.renderFlip(true)}
          {this.renderRentHeader()}
          {this.renderRent(true)}
        </View>
      );
    }
  }

  render() {
    const { containerStyle, textContainerStyle, textStyle } = styles;

    return (
      <View style={containerStyle}>
        <XHeader headerText='Compare' onPress={() => this.onGoBack()} />
        {this.renderModal()}
        <ScrollView>
          <View style={textContainerStyle}>
            <Text style={textStyle}>
              Tap two completed reports of the same type to compare
            </Text>
          </View>
          {this.renderContent(this.props.analysisType)}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textStyle: {
    marginLeft: 15,
    fontSize: 16
  },
  textContainerStyle: {
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    height: 80,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 20
  },
  modalContainerStyle: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'rgba(120, 120, 120, 0.5)'
  },
  modalContentContainerStyle: {
    width: 300,
    height: 275,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    borderColor: '#fafafa'
  },
  nameContainerStyle: {
    flex: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeContainerStyle: {
    flex: 3,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  okContainerStyle: {
    flex: 4,
    borderTopWidth: 0.5,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = state => {
  return {
    complete: state.analyses.complete,
    compareList: state.compareArray.list,
    analysisType: state.compareArray.type
   };
};

export default connect(mapStateToProps, { clearSelectedCompareArray, setCancel, getAnalysisType })(CompareList);
