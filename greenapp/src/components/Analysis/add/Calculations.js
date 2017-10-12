import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import ModalDropdown from 'react-native-modal-dropdown';
import { SimpleHeader, Input } from '../../common';
import {
  appreciationChanged,
  sellAfterChanged,
  rateChanged,
  amortizationChanged,
  locationChanged,
  amortizationTypeChanged,
  clearCalculations,
  clearPropertyInformation,
  clearRevenue,
  clearExpenses,
  clearOtherCosts
} from '../../../actions';

class Calculations extends Component {
  static navigationOptions = {
    header: null
  }

  state = { width: 0, height: 0 }


  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  }

  onAppreciationChange(text) {
    this.props.appreciationChanged(text);
  }

  onSellAfterChange(text) {
    this.props.sellAfterChanged(text);
  }

  onRateChange(text) {
    this.props.rateChanged(text);
  }

  onAmortizationChange(text) {
    this.props.amortizationChanged(text);
  }

  onLocationChange(text) {
    this.props.locationChanged(text);
  }

  onAmortizationTypeChange(text) {
    this.props.amortizationTypeChanged(text);
  }

  onToastPress(category) {
    let toastText;
    if (category === 'Header') {
      toastText = 'Lorem ipsum dolor sit amet.';
    } else if (category === 'Appreciation') {
      toastText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    } else if (category === 'Sell') {
      toastText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.';
    } else if (category === 'Rate') {
      toastText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.';
    } else {
      toastText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.';
    }
    if (this.state.isToastOpen) {
      this.refs.toast.close();
      this.setState({ isToastOpen: false });
    } else {
      this.refs.toast.show(toastText, DURATION.FOREVER);
      this.setState({ isToastOpen: true });
    }
  }

  onScroll() {
    if (this.state.isToastOpen) {
      this.refs.toast.close();
      this.setState({ isToastOpen: false });
    }
  }

  onSelectLocation(index, value) {
    this.props.locationChanged(value);
  }

  onSelectAmortization(index, value) {
    this.props.amortizationTypeChanged(value);
  }

  savePress() {
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
    const id = this.props.navigation.state.params.id;

    axios.put('http://localhost:8888/greenmortgage/wp-json/gmma/v1/analyses/' + id,
      {
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
      .then(() => console.log('Put done!'))
      .catch(error => {
        console.log(error.response);
        if ( error.response.status === 404 ) {
          this.props.navigation.navigate('InvalidToken');
        }
      });

      this.props.clearPropertyInformation();
      this.props.clearRevenue();
      this.props.clearExpenses();
      this.props.clearOtherCosts();
      this.props.clearCalculations();
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Start' })
        ]
      }));
  }

  render() {
    const {
      containerStyle,
      progressBarFilledStyle,
      progressBarEmptyStyle,
      headerContentStyle,
      contentContainerStyle,
      inputContainerStyle,
      labelTextStyle,
      dataTextStyle,
      labelContainerStyle,
      valueContainerStyle,
      footerContainerStyle,
      buttonsContainerStyle,
      buttonStyle,
      iconStyle,
      iconContainerStyle,
      toastStyle,
      toastTextStyle,
      dropdownStyle,
      dropdownButtonStyle,
      dropdownTextStyle,
      dropdownButtonTextStyle
    } = styles;
    const type = this.props.navigation.state.params.type;
    const name = this.props.navigation.state.params.name;
    const id = this.props.navigation.state.params.id;
    const toastPosition = this.state.width > this.state.height ? 50 : 145;
    const locations = ['BC', 'ON', 'QC', 'AB', 'NL'];
    const amortizations = ['R', 'B', 'T'];

    return (
      <View onLayout={this.onLayout} style={containerStyle}>
        <ScrollView onScroll={() => this.onScroll()}>

          <SimpleHeader headerText={type} />
          {/* Progress bar */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[progressBarFilledStyle, { width: 5 / 6 * (this.state.width) }]} />
            <View style={[progressBarEmptyStyle, { width: 1 / 6 * (this.state.width) }]} />
          </View>
          {/* Progress bar */}

          <View style={headerContentStyle}>
            <Text style={{ fontSize: 19 }}>
              {name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '500', color: '#aaa', paddingTop: 8 }}>
                5. ROI CALCULATIONS
              </Text>
              <TouchableOpacity
                onPress={() => this.onToastPress('Header')}
                style={{ marginLeft: 3 }}
              >
                <Image
                  style={iconStyle}
                  source={require('../../../assets/tooltipIcon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={contentContainerStyle}>

            <View style={[inputContainerStyle, { marginTop: 5 }]}>
              <View style={labelContainerStyle}>
                <View style={{ flex: 2 }}>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Appreciation per Year (%)</Text>
                </View>
                <View style={[iconContainerStyle, { flex: 1, paddingTop: 3 }]}>
                  <TouchableOpacity onPress={() => this.onToastPress('Appreciation')}>
                    <Image
                      style={iconStyle}
                      source={require('../../../assets/tooltipIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[valueContainerStyle, { alignItems: 'flex-start' }]}>
                <Input
                  placeholder='000,000 %'
                  onChangeText={this.onAppreciationChange.bind(this)}
                  value={this.props.appreciation}
                  width={(this.state.width - 30) / 3}
                  textAlign='center'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <View>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Sell After</Text>
                </View>
                <View style={[iconContainerStyle, { paddingLeft: 3, paddingTop: 2 }]}>
                  <TouchableOpacity onPress={() => this.onToastPress('Sell')}>
                    <Image
                      style={iconStyle}
                      source={require('../../../assets/tooltipIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[valueContainerStyle, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                <Input
                  placeholder='000'
                  onChangeText={this.onSellAfterChange.bind(this)}
                  value={this.props.sellAfter}
                  width={(this.state.width - 30) / 6}
                  textAlign='center'
                />
                <Text style={[dataTextStyle, { alignSelf: 'center', marginLeft: 10 }]}>years</Text>
              </View>
            </View>

          </View>

          <View style={[headerContentStyle, { height: 35 }]}>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#aaa' }}>
              6. MORTGAGE CALCULATIONS
            </Text>
          </View>

          <View style={contentContainerStyle}>

            <View style={[inputContainerStyle, { marginTop: 5 }]}>
              <View style={labelContainerStyle}>
                <View>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Rate (%)</Text>
                </View>
                <View style={[iconContainerStyle, { paddingLeft: 3, paddingTop: 2 }]}>
                  <TouchableOpacity onPress={() => this.onToastPress('Rate')}>
                    <Image
                      style={iconStyle}
                      source={require('../../../assets/tooltipIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[valueContainerStyle, { alignItems: 'flex-start' }]}>
                <Input
                  placeholder='000%'
                  onChangeText={this.onRateChange.bind(this)}
                  value={this.props.rate}
                  width={(this.state.width - 30) / 6}
                  textAlign='center'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <View>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Amortization</Text>
                </View>
                <View style={[iconContainerStyle, { paddingLeft: 3, paddingTop: 2 }]}>
                  <TouchableOpacity onPress={() => this.onToastPress('Amortization')}>
                    <Image
                      style={iconStyle}
                      source={require('../../../assets/tooltipIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[valueContainerStyle, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                <Input
                  placeholder='000'
                  onChangeText={this.onAmortizationChange.bind(this)}
                  value={this.props.amortization}
                  width={(this.state.width - 30) / 6}
                  textAlign='center'
                />
                <Text style={[dataTextStyle, { alignSelf: 'center', marginLeft: 10 }]}>years</Text>
              </View>
            </View>

          </View>

          <View style={[headerContentStyle, { height: 35 }]}>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#aaa' }}>
              7. DEAL INFORMATION
            </Text>
          </View>

          <View style={contentContainerStyle}>

            <View style={[inputContainerStyle, { marginTop: 21 }]}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Location</Text>
              </View>
              <View style={valueContainerStyle}>
                <ModalDropdown
                  options={locations}
                  defaultIndex={0}
                  onSelect={(index, value) => this.onSelectLocation(index, value)}
                  style={[dropdownButtonStyle, { width: (this.state.width - 30) / 2 }]}
                  dropdownStyle={dropdownStyle}
                  textStyle={dropdownButtonTextStyle}
                  dropdownTextStyle={dropdownTextStyle}
                >
                  <Text style={{ transform: [{ translateY: 14 }] }}>{this.props.location}</Text>
                  <View style={{ alignItems: 'flex-end', marginRight: 10, justifyContent: 'center' }}>
                    <Image
                      style={[iconStyle, { transform: [{ translateY: -14 }] }]}
                      source={require('../../../assets/downArrowIcon.png')}
                    />
                  </View>
                </ModalDropdown>

              </View>
            </View>

            <View style={[inputContainerStyle, { marginTop: 15 }]}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Amortization</Text>
              </View>
              <View style={valueContainerStyle}>
                <ModalDropdown
                  options={amortizations}
                  defaultIndex={0}
                  onSelect={(index, value) => this.onSelectAmortization(index, value)}
                  style={[dropdownButtonStyle, { width: (this.state.width - 30) / 2 }]}
                  dropdownStyle={dropdownStyle}
                  textStyle={dropdownButtonTextStyle}
                  dropdownTextStyle={dropdownTextStyle}
                >
                  <Text style={{ transform: [{ translateY: 14 }] }}>{this.props.amortizationType}</Text>
                  <View style={{ alignItems: 'flex-end', marginRight: 10, justifyContent: 'center' }}>
                    <Image
                      style={[iconStyle, { transform: [{ translateY: -14 }] }]}
                      source={require('../../../assets/downArrowIcon.png')}
                    />
                  </View>
                </ModalDropdown>
              </View>
            </View>

          </View>
          <View style={footerContainerStyle}>
            <View style={buttonsContainerStyle}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('AnalysisDone', { type, name, id });
                }}
                style={[buttonStyle, { borderColor: '#999', justifyContent: 'center', alignItems: 'center', marginRight: 5 }]}
              >
                <Text style={{ fontSize: 22 }}>
                  Continue
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { this.savePress() }}
                style={{ justifyContent: 'center', marginLeft: 5 }}
              >
                <Text style={{ fontSize: 18 }}>
                  Save and Quit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
        <Toast
          ref='toast'
          style={[toastStyle, { width: this.state.width - 30 }]}
          position='top'
          positionValue={toastPosition}
          textStyle={toastTextStyle}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  progressBarFilledStyle: {
    height: 7,
    backgroundColor: '#aaa'
  },
  progressBarEmptyStyle: {
    height: 7,
    backgroundColor: '#ccc'
  },
  headerContentStyle: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainerStyle: {
    backgroundColor: '#f0f0f0',
    height: 130,
    marginVertical: 5
  },
  inputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelTextStyle: {
    fontSize: 16,
    marginTop: 5
  },
  labelContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 15
  },
  valueContainerStyle: {
    flex: 1,
    marginRight: 15,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  dataTextStyle: {
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'flex-end'
  },
  footerContainerStyle: {
    height: 150,
    backgroundColor: '#fff',
    padding: 10
  },
  buttonsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginVertical: 10
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 5,
    height: 50,
    width: 180
  },
  iconStyle: {
    height: 17,
    width: 17,
    tintColor: '#808080',
    marginTop: 10,
    marginLeft: 5
  },
  iconContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  toastStyle: {
    backgroundColor: '#808080',
    height: 150,
    borderWidth: 0.1,
    borderColor: '#808080',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toastTextStyle: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 26,
    padding: 15
  },
  dropdownButtonStyle: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#fff',
    height: 35,
    justifyContent: 'center',
    paddingLeft: 10
  },
  dropdownStyle: {
    height: 112,
    transform: [{ translateX: 1 }, { translateY: -5 }]
  },
  dropdownButtonTextStyle: {
    fontSize: 16
  },
  dropdownTextStyle: {
    fontSize: 12
  }
};

const mapStateToProps = state => {
  return {
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
    repairs: state.costs.repairs,
    othercosts: state.costs.rentalIncome,
    apply: state.costs.apply,
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
  appreciationChanged,
  sellAfterChanged,
  rateChanged,
  amortizationChanged,
  locationChanged,
  amortizationTypeChanged,
  clearPropertyInformation,
  clearRevenue,
  clearExpenses,
  clearOtherCosts,
  clearCalculations
})(Calculations);
