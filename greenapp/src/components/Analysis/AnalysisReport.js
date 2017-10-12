import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { XHeader, SubHeader } from '../common';

class AnalysisReport extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    const { state } = this.props.navigation;
    const id = state.params.id.AnalysisId;
    this.analysis = {};

    for (const analysis of this.props.incomplete) {
      if (id === analysis.AnalysisId) {
        this.analysis = analysis;
        break;
      }
    }

    for (const analysis of this.props.complete) {
      if (id === analysis.AnalysisId) {
        this.analysis = analysis;
        break;
      }
    }
  }

  render() {
    const { state } = this.props.navigation;
    const {
      containerStyle,
      nameContainerStyle,
      textContainerStyle,
      headingStyle,
      textStyle
    } = styles;
    const type = this.analysis.Type + ' Report';
    const name = this.analysis.ForProperty;

    const analysisDate = new Date(this.analysis.Date);
    const stringDate = analysisDate.toString();
    const splitDate = stringDate.split(' ');

    return (
      <View style={containerStyle}>
        <XHeader headerText={type} onPress={() => this.props.navigation.goBack()} />
        <ScrollView>
          <View style={nameContainerStyle}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{name}</Text>
            <Text style={{ fontSize: 16, color: '#bbb' }}>
              {splitDate[1]} {splitDate[2]}, {splitDate[3]}
            </Text>
          </View>
          <SubHeader subheaderText='CASH POSITION' />
          <View style={{ backgroundColor: '#fff' }}>
            <View style={[textContainerStyle, { backgroundColor: '#fafafa' }]}>
              <Text style={headingStyle}>Monthly Cashflow</Text>
              <Text style={textStyle}>{this.analysis.MonthlyCashflow}</Text>
            </View>
            <View style={textContainerStyle}>
              <Text style={headingStyle}>Initial Investment</Text>
              <Text style={textStyle}>{this.analysis.InitialInvestment}</Text>
            </View>
            <View style={[textContainerStyle, { backgroundColor: '#fafafa' }]}>
              <Text style={headingStyle}>Annual Return on Investment (ROI) from Cashflow</Text>
              <Text style={textStyle}>{this.analysis.ROIfromCashflow}</Text>
            </View>
          </View>
          <SubHeader subheaderText='FUTURE VALUE' />
          <View style={{ backgroundColor: '#fff' }}>
            <View style={[textContainerStyle, { backgroundColor: '#fafafa' }]}>
              <Text style={headingStyle}>Resale Value</Text>
              <Text style={textStyle}>{this.analysis.ResaleValue}</Text>
            </View>
            <View style={textContainerStyle}>
              <Text style={headingStyle}>Mortgage Balance at Sale</Text>
              <Text style={textStyle}>{this.analysis.MortgageBalanceatSale}</Text>
            </View>
            <View style={[textContainerStyle, { backgroundColor: '#fafafa' }]}>
              <View style={{ paddingBottom: 5 }}>
                <Text style={headingStyle}>Total Profit</Text>
                <Text style={[headingStyle, { fontSize: 12 }]}>
                  (Includes realtor fees for sale, mortgage paydown)
                </Text>
              </View>
            </View>
            <View style={{ backgroundColor: '#fafafa', justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
              <Text style={{ fontSize: 40 }}>
                {this.analysis.TotalProfit}
              </Text>
            </View>
          </View>
          <SubHeader subheaderText='RETURN ON INVESTMENT' />
          <View style={{ backgroundColor: '#fff' }}>
            <View style={[textContainerStyle, { backgroundColor: '#fafafa' }]}>
              <Text style={headingStyle}>ROI Total</Text>
              <Text style={textStyle}>{this.analysis.ROITotal}</Text>
            </View>
            <View style={textContainerStyle}>
              <Text style={headingStyle}>ROI Annually</Text>
              <Text style={textStyle}>{this.analysis.ROIAnnually}</Text>
            </View>
            <View style={[textContainerStyle, { backgroundColor: '#fafafa' }]}>
              <Text style={headingStyle}>Cap Rate</Text>
              <Text style={textStyle}>{this.analysis.CapRate}</Text>
            </View>
          </View>
          <SubHeader subheaderText='FINANCING METHODS' />
          <View style={{ backgroundColor: '#fff' }}>
            <View style={[textContainerStyle, { backgroundColor: '#fafafa' }]}>
              <Text style={headingStyle}>DCR</Text>
              <Text style={textStyle}>{this.analysis.DCR}</Text>
            </View>
            <View style={textContainerStyle}>
              <Text style={headingStyle}>Other</Text>
              <Text style={textStyle}>{this.analysis.Other}</Text>
            </View>
            <View style={[textContainerStyle, { backgroundColor: '#fafafa' }]} />
          </View>
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
  nameContainerStyle: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7
  },
  headingStyle: {
    fontSize: 16,
    color: '#bbb',
    paddingLeft: 5,
    flex: 4
  },
  textStyle: {
    fontSize: 16,
    padding: 5,
    flex: 6,
    textAlign: 'right'
  }
};

const mapStateToProps = state => {
  return {
    complete: state.analyses.complete,
    incomplete: state.analyses.incomplete
   };
};

export default connect(mapStateToProps)(AnalysisReport);
