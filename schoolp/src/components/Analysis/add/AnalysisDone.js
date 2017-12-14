import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { XHeader } from '../../common';
import { addToComplete, addToIncomplete, clearPropertyInformation, clearRevenue, clearExpenses, clearOtherCosts, clearCalculations } from '../../../actions';

class AnalysisDone extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    const id = this.props.navigation.state.params.id;

   let MonthlyCashflow = 0;
   let InitialInvestment = 0;
   let ROIfromCashflow = 0;
   let ResaleValue = 0;
   let MortgageBalanceatSale = 0;
   let TotalProfit = 0;
   let ROITotal = 0;
   let ROIAnnually = 0;
   let CapRate = 0;
   let DCR = 0;
   let Other = 0;
   let PurchasePrice = this.props.purchasePrice;
   let DownPayment = this.props.downPayment;
   let BorrowedDownPayment = this.props.borrowedDownPayment;
   let TotalMortgage = PurchasePrice - DownPayment + BorrowedDownPayment;
   let NumberofUnits = this.props.numberOfUnits;
   let PriceperDoor = PurchasePrice / NumberofUnits;
   let NetRent = 0;
   let Vacancy = this.props.vacancy;
   let RentalIncome = this.props.rentalIncome;
   let Otherrevenuemonthly = this.props.otherrevenue;
   let Mortgage = 0;
   let Taxes = this.props.taxes;
   let Condo = this.props.condo;
   let Insurance = this.props.insurance;
   let Utilities = this.props.utilities;
   let MaintenanceFund = this.props.maintenanceFund;
   let CableInternet = this.props.cable;
   let BorrowedDownPaymentMonthly = this.props.borrowedDownPaymentMonthly;
   let Otherrevenue = this.props.otherexpenses;
   let PropertyManagement = this.props.propertyManagement;
   let TotalExpensesMonthly = 0;
   let PropertyTransferTax = this.props.propertytransfertax;
   let LegalFees = 0;
   let Repairs = this.props.repairs;
   let Othercosts = this.props.othercosts;
   let InsurancePremium = 0;
   let AppreciationperYear = this.props.appreciation;
   let SellAfter = this.props.sellAfter;
   let Rate = this.props.rate;
   let Amortizationtime = this.props.amortization;
   let Amortizationtype = this.props.amortizationType;

   this.fieldsList = [];
   this.fieldsList.push(MonthlyCashflow);
   this.fieldsList.push(InitialInvestment);
   this.fieldsList.push(ROIfromCashflow);
   this.fieldsList.push(ResaleValue);
   this.fieldsList.push(MortgageBalanceatSale);
   this.fieldsList.push(TotalProfit);
   this.fieldsList.push(ROITotal);
   this.fieldsList.push(ROIAnnually);
   this.fieldsList.push(CapRate);
   this.fieldsList.push(DCR);
   this.fieldsList.push(Other);
   this.fieldsList.push(PurchasePrice);
   this.fieldsList.push(DownPayment);
   this.fieldsList.push(BorrowedDownPayment);
   this.fieldsList.push(TotalMortgage);
   this.fieldsList.push(NumberofUnits);
   this.fieldsList.push(PriceperDoor);
   this.fieldsList.push(NetRent);
   this.fieldsList.push(Vacancy);
   this.fieldsList.push(RentalIncome);
   this.fieldsList.push(Otherrevenuemonthly);
   this.fieldsList.push(Mortgage);
   this.fieldsList.push(Taxes);
   this.fieldsList.push(Condo);
   this.fieldsList.push(Insurance);
   this.fieldsList.push(Utilities);
   this.fieldsList.push(MaintenanceFund);
   this.fieldsList.push(CableInternet);
   this.fieldsList.push(BorrowedDownPaymentMonthly);
   this.fieldsList.push(Otherrevenue);
   this.fieldsList.push(PropertyManagement);
   this.fieldsList.push(TotalExpensesMonthly);
   this.fieldsList.push(PropertyTransferTax);
   this.fieldsList.push(LegalFees);
   this.fieldsList.push(Repairs);
   this.fieldsList.push(Othercosts);
   this.fieldsList.push(InsurancePremium);
   this.fieldsList.push(AppreciationperYear);
   this.fieldsList.push(SellAfter);
   this.fieldsList.push(Rate);
   this.fieldsList.push(Amortizationtime);
   this.fieldsList.push(Amortizationtype);
   console.log(this.fieldsList);

   const Date = this.getCurrentDate();

     axios.put('http://localhost:8888/greenmortgage/wp-json/gmma/v1/analyses/' + id,
     {
       Status: this.checkAnalysis() === 1 ? 'Complete':'Incomplete',
       MonthlyCashflow,
       InitialInvestment,
       ROIfromCashflow,
       ResaleValue,
       MortgageBalanceatSale,
       TotalProfit,
       ROITotal,
       ROIAnnually,
       CapRate,
       DCR,
       Other,
       PurchasePrice,
       DownPayment,
       BorrowedDownPayment,
       TotalMortgage,
       NumberofUnits,
       PriceperDoor,
       NetRent,
       Vacancy,
       RentalIncome,
       Otherrevenuemonthly,
       Mortgage,
       Taxes,
       Condo,
       Insurance,
       Utilities,
       MaintenanceFund,
       CableInternet,
       BorrowedDownPaymentMonthly,
       Otherrevenue,
       PropertyManagement,
       TotalExpensesMonthly,
       PropertyTransferTax,
       LegalFees,
       Repairs,
       Othercosts,
       InsurancePremium,
       AppreciationperYear,
       SellAfter,
       Rate,
       Amortizationtime,
       Amortizationtype
     },
     { headers: {'Token' : this.props.token}}
   )
       .then(() => {
         console.log('Put done!');
         axios.get('http://localhost:8888/greenmortgage/wp-json/gmma/v1/analyses/last',{ headers: {'Token' : this.props.token}})
           .then((response) => {
             console.log('Get done!');
             this.addAnalysis(response.data);
           })
           .catch(error => {
             console.log(error.response);
             if ( error.response.status === 404 ) {
               this.props.navigation.navigate('InvalidToken');
             }
           });
       })
       .catch(error => {
         console.log(error.response);
         if ( error.response.status === 404 ) {
           this.props.navigation.navigate('InvalidToken');
         }
       });
  }


  addAnalysis(analysis) {
    if ( this.checkAnalysis() === 1 ) {
      this.props.addToComplete(analysis);
      this.addflag = 0;
    } else {
      this.props.addToIncomplete(analysis);
      this.addflag = 1;
    }
  }

  checkAnalysis() {

    var check = 1;

    for ( const field of this.fieldsList ) {
      if ( field === 0 || field === '' ) {
        check = 0;
        break;
      }
    }

     return check;
  }

  clearAnalysesInfo() {
    this.props.clearPropertyInformation();
    this.props.clearRevenue();
    this.props.clearExpenses();
    this.props.clearOtherCosts();
    this.props.clearCalculations();
  }

  getCurrentDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const current = year + '-' + month + '-' + day;

    return current;
  }

  onButtonPress() {
    let AnalysisId = 0;

    if ( this.addflag === 0 ) {
      AnalysisId = this.props.complete[this.props.complete.length - 1].AnalysisId;
    } else {
      AnalysisId = this.props.incomplete[this.props.incomplete.length - 1].AnalysisId;
    }
    this.props.navigation.navigate('AnalysisReport', { id: { AnalysisId } });
    this.clearAnalysesInfo();
  }

  render() {
    const {
      containerStyle,
      contentContainerStyle,
      buttonsContainerStyle,
      buttonStyle
    } = styles;
    const type = this.props.navigation.state.params.type;
    const For = this.props.navigation.state.params.name;
    let Type;

    switch (type) {
      case 'Cash Flow Analysis':
        Type = 'Cash Flow';
        break;
      case 'Flip Analysis':
        Type = 'Flip';
        break;
      case 'Rent vs. Own Analysis':
        Type = 'Rent vs. Own';
        break;
      default:
        Type = '';
    }

    return (
      <View style={containerStyle}>
        <XHeader headerText={type} onPress={() => this.props.navigation.navigate('Dashboard')} backgroundColor='#fff' />

        <View style={contentContainerStyle}>

          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 26 }}>Great work!</Text>
          </View>
          <View style={{ flex: 2, alignItems: 'center' }}>
            <View style={{ width: 250, marginTop: 10 }}>
              <Text style={{ fontSize: 18, textAlign: 'center' }}>{Type.toUpperCase()} - {For} is now complete.</Text>
            </View>
          </View>
          <View style={{ flex: 6 }}>
            <View style={buttonsContainerStyle}>
              <TouchableOpacity
                onPress={() => this.onButtonPress()}
                style={buttonStyle}
              >
                <Text style={{ fontSize: 22 }}>
                  See Report
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('AddAnalysis');
              this.clearAnalysesInfo();
            }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: '#aaa', textAlign: 'center' }}>
                Begin Another Analysis
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainerStyle: {
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  buttonsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginVertical: 20
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 5,
    height: 50,
    width: 270,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const mapStateToProps = state => {
  return {
    residentials: state.assets.residentials,
    commercials: state.assets.commercials,
    incomplete: state.analyses.incomplete,
    complete: state.analyses.complete,
    purchasePrice: state.propertyInformation.purchasePrice,
    downPayment: state.propertyInformation.downPayment,
    borrowedDownPayment: state.propertyInformation.borrowedDownPayment,
    numberOfUnits: state.propertyInformation.numberOfUnits,
    vacancy: state.revenue.vacancy,
    rentalIncome: state.revenue.rentalIncome,
    otherrevenue: state.revenue.other,
    taxes: state.expenses.taxes,
    condo: state.expenses.condo,
    insurance: state.expenses.insurance,
    utilities: state.expenses.utilities,
    maintenanceFund: state.expenses.maintenanceFund,
    cable: state.expenses.cable,
    borrowedDownPaymentMonthly: state.expenses.borrowedDownPayment,
    otherexpenses: state.expenses.other,
    propertyManagement: state.expenses.propertyManagement,
    propertytransfertax: state.costs.apply,
    repairs: state.costs.repairs,
    othercosts: state.costs.rentalIncome,
    appreciation: state.calculations.appreciation,
    sellAfter: state.calculations.sellAfter,
    rate: state.calculations.rate,
    amortization: state.calculations.amortization,
    location: state.calculations.location,
    amortizationType: state.calculations.amortizationType,
    token: state.token.token
   };
};

export default connect(mapStateToProps, {
  addToComplete,
  addToIncomplete,
  clearPropertyInformation,
  clearRevenue,
  clearExpenses,
  clearOtherCosts,
  clearCalculations
})(AnalysisDone);
