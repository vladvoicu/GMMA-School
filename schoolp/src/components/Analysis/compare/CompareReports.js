import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { XHeader, SubHeader } from '../../common';
import { connect } from 'react-redux';
import { getAnalysisType, clearSelectedCompareArray } from '../../../actions';

class CompareReports extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    const { residentials, commercials, compareList, complete } = this.props;
    this.leftProp = {};
    this.rightProp = {};
    this.leftAnalysis = {};
    this.rightAnalysis = {};

    this.nameOfAnalyses();

    for (const prop of residentials) {
      if (this.leftname === prop.Name) {
        this.leftProp = prop;
      }
      if (this.rightname === prop.Name) {
        this.rightProp = prop;
      }
    }

    for (const prop of commercials) {
      if (this.leftname === prop.Name) {
        this.leftProp = prop;
      }
      if (this.rightname === prop.Name) {
        this.rightProp = prop;
      }
    }

    for (const analysis of complete) {
      if (compareList[0] === analysis.AnalysisId) {
        this.leftAnalysis = analysis;
      }
      if (compareList[1] === analysis.AnalysisId) {
        this.rightAnalysis = analysis;
      }
    }
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

  onGoBack() {
    this.props.getAnalysisType('');
    this.props.clearSelectedCompareArray();
    this.props.navigation.navigate('Analysis');
  }

  renderIcon(type) {
    const { iconStyle } = styles;

    if (type === 'Residential') {
      return (
        <Image
          style={iconStyle}
          source={require('../../../assets/residentialIcon.png')}
        />
      );
    } else {
      return (
        <Image
          style={iconStyle}
          source={require('../../../assets/commercialIcon.png')}
        />
      );
    }
  }

  render() {
    const {
      headerContainerStyle,
      containerStyle,
      analysesContainerStyle,
      iconContainerStyle,
      textHeadingStyle,
      textStyle
    } = styles;
    const { state } = this.props.navigation;
    const type = state.params.type.analysisType;

    this.leftDate = new Date(this.leftAnalysis.Date);
    this.rightDate = new Date(this.rightAnalysis.Date);
    const leftStringDate = this.leftDate.toString();
    const rightStringDate = this.rightDate.toString();
    const leftSplitDate = leftStringDate.split(' ');
    const rightSplitDate = rightStringDate.split(' ');

    return (
      <View style={containerStyle}>
        <XHeader headerText='Compare' onPress={() => this.onGoBack()} />
        <ScrollView>
        <View style={headerContainerStyle}>
          <Text style={{ fontSize: 24 }}>
            {type}
          </Text>
        </View>
        <View style={analysesContainerStyle}>
          <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
            <View style={iconContainerStyle}>
              {this.renderIcon(this.leftProp.Type)}
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '500' }}>
                {this.leftname}
              </Text>
              <Text style={{ fontSize: 16, color: '#bbb' }}>
                {leftSplitDate[1]} {leftSplitDate[2]}, {leftSplitDate[3]}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>vs.</Text>
          </View>
          <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
            <View style={iconContainerStyle}>
              {this.renderIcon(this.rightProp.Type)}
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: '500' }}>
                {this.rightname}
              </Text>
              <Text style={{ fontSize: 16, color: '#bbb' }}>
                {rightSplitDate[1]} {rightSplitDate[2]}, {rightSplitDate[3]}
              </Text>
            </View>
          </View>
        </View>
        <SubHeader subheaderText='CASH POSITION' />
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 5, alignItems: 'flex-end' }}>
              <Text style={textHeadingStyle}>MONTHLY CASHFLOW</Text>
              <Text style={textStyle}>{this.leftAnalysis.MonthlyCashflow}</Text>
              <Text style={textHeadingStyle}>INITIAL INVESTMENT</Text>
              <Text style={textStyle}>{this.leftAnalysis.InitialInvestment}</Text>
              <Text style={[textHeadingStyle, { textAlign: 'right' }]}>ANNUAL ROI FROM CASHFLOW</Text>
              <Text style={textStyle}>{this.leftAnalysis.ROIfromCashflow}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 5 }}>
              <Text style={textHeadingStyle}>MONTHLY CASHFLOW</Text>
              <Text style={textStyle}>{this.rightAnalysis.MonthlyCashflow}</Text>
              <Text style={textHeadingStyle}>INITIAL INVESTMENT</Text>
              <Text style={textStyle}>{this.rightAnalysis.InitialInvestment}</Text>
              <Text style={[textHeadingStyle, { textAlign: 'left' }]}>ANNUAL ROI FROM CASHFLOW</Text>
              <Text style={textStyle}>{this.rightAnalysis.ROIfromCashflow}</Text>
            </View >
          </View>
        <SubHeader subheaderText='FUTURE VALUE' />
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 5, alignItems: 'flex-end' }}>
              <Text style={textHeadingStyle}>RESALE VALUE</Text>
              <Text style={textStyle}>{this.leftAnalysis.ResaleValue}</Text>
              <Text style={[textHeadingStyle, { textAlign: 'right' }]}>MORTGAGE BALANCE AT SALE</Text>
              <Text style={textStyle}>{this.leftAnalysis.MortgageBalanceatSale}</Text>
              <Text style={textHeadingStyle}>TOTAL PROFIT</Text>
              <Text style={[textStyle, { fontSize: 22 }]}>{this.leftAnalysis.TotalProfit}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 5 }}>
              <Text style={textHeadingStyle}>RESALE VALUE</Text>
              <Text style={textStyle}>{this.rightAnalysis.ResaleValue}</Text>
              <Text style={[textHeadingStyle, { textAlign: 'left' }]}>MORTGAGE BALANCE AT SALE</Text>
              <Text style={textStyle}>{this.rightAnalysis.MortgageBalanceatSale}</Text>
              <Text style={textHeadingStyle}>TOTAL PROFIT</Text>
              <Text style={[textStyle, { fontSize: 22 }]}>{this.rightAnalysis.TotalProfit}</Text>
            </View >
          </View>
          <SubHeader subheaderText='FINANCING METHODS' />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 5, alignItems: 'flex-end' }}>
              <Text style={textHeadingStyle}>DCR</Text>
              <Text style={[textStyle, { marginBottom: 0 }]}>{this.leftAnalysis.DCR}</Text>
              <Text style={textHeadingStyle}>OTHER</Text>
              <Text style={textStyle}>{this.leftAnalysis.Other}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 5 }}>
              <Text style={textHeadingStyle}>DCR</Text>
              <Text style={[textStyle, { marginBottom: 0 }]}>{this.rightAnalysis.DCR}</Text>
              <Text style={textHeadingStyle}>OTHER</Text>
              <Text style={textStyle}>{this.rightAnalysis.Other}</Text>
            </View >
          </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = {
    headerContainerStyle: {
      borderBottomWidth: 0.5,
      backgroundColor: '#fff',
      borderColor: '#bbb',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    },
    containerStyle: {
      flex: 1,
      backgroundColor: '#fff'
    },
    analysesContainerStyle: {
      flexDirection: 'row',
      backgroundColor: '#fafafa',
      marginBottom: 10
    },
    iconStyle: {
      height: 35,
      width: 35,
      tintColor: '#999'
    },
    iconContainerStyle: {
      padding: 10,
      marginTop: 10
    },
    textHeadingStyle: {
      fontSize: 12,
      fontWeight: '400',
      color: '#aaa',
      marginTop: 15
    },
    textStyle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 15,
      marginTop: 5
    }
};

const mapStateToProps = state => {
  return {
    residentials: state.assets.residentials,
    commercials: state.assets.commercials,
    compareList: state.compareArray.list,
    complete: state.analyses.complete
   };
};

export default connect(mapStateToProps, { getAnalysisType, clearSelectedCompareArray })(CompareReports);
