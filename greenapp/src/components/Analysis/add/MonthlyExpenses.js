import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import { SimpleHeader, Input } from '../../common';
import {
  taxesChanged,
  condoChanged,
  insuranceChanged,
  utilitiesChanged,
  maintenanceFundChanged,
  cableChanged,
  expensesBorrowedDownPaymentChanged,
  expensesOtherChanged,
  propertyManagementChanged,
  clearExpenses,
  clearRevenue,
  clearPropertyInformation
} from '../../../actions';

class MonthlyExpenses extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.keyboardOpen = false;
  }

  state = { width: 0, height: 0 }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  }

  onTaxesChange(text) {
    this.props.taxesChanged(text);
  }

  onCondoChange(text) {
    this.props.condoChanged(text);
  }

  onInsuranceChange(text) {
    this.props.insuranceChanged(text);
  }

  onUtilitiesChange(text) {
    this.props.utilitiesChanged(text);
  }

  onMaintenanceFundChange(text) {
    this.props.maintenanceFundChanged(text);
  }

  onCableChange(text) {
    this.props.cableChanged(text);
  }

  onBorrowedDownPaymentChange(text) {
    this.props.expensesBorrowedDownPaymentChanged(text);
  }

  onOtherChange(text) {
    this.props.expensesOtherChanged(text);
  }

  onPropertyManagementChange(text) {
    this.props.propertyManagementChanged(text);
  }

  onToastPress(category) {
    let toastText;
    if (category === 'Maintenance') {
      toastText = 'Lorem ipsum dolor sit amet.';
    } else if (category === 'Payment') {
      toastText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    } else {
      toastText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.';
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
        TotalExpensesMonthly
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
      toastTextStyle
    } = styles;
    const type = this.props.navigation.state.params.type;
    const name = this.props.navigation.state.params.name;
    const id = this.props.navigation.state.params.id;
    const toastPosition = this.state.width > this.state.height ? 50 : 145;
    const translateIcon = 0;
    let Mortgage = 0;
    let MaintenanceFund = this.props.maintenanceFund;
    let PropertyManagement = this.props.propertyManagement;
    let TotalExpensesMonthly = 0;

    return (
      <View onLayout={this.onLayout} style={containerStyle}>
        <ScrollView onScroll={() => this.onScroll()}>

          <SimpleHeader headerText={type} />

          {/* Progress bar */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[progressBarFilledStyle, { width: 3 / 6 * (this.state.width) }]} />
            <View style={[progressBarEmptyStyle, { width: 3 / 6 * (this.state.width) }]} />
          </View>
          {/* Progress bar */}

          <View style={headerContentStyle}>
            <Text style={{ fontSize: 19 }}>
              {name}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#aaa' }}>
              3. EXPENSES (MONTHLY)
            </Text>
          </View>

          <View style={contentContainerStyle}>

            <View style={[inputContainerStyle, { marginTop: 10 }]}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Mortgage</Text>
              </View>
              <View style={valueContainerStyle}>
                <Text style={dataTextStyle}>$ {Mortgage}</Text>
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Taxes</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='$ 000,000,000.00'
                  onChangeText={this.onTaxesChange.bind(this)}
                  value={this.props.taxes}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Condo</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='$ 000,000,000.00'
                  onChangeText={this.onCondoChange.bind(this)}
                  value={this.props.condo}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Insurance</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='$ 000,000,000.00'
                  onChangeText={this.onInsuranceChange.bind(this)}
                  value={this.props.insurance}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Utilities</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='$ 000,000,000.00'
                  onChangeText={this.onUtilitiesChange.bind(this)}
                  value={this.props.utilities}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <View>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Maintenance Fund</Text>
                  <Text style={{ fontSize: 12 }}>(Use 15% as default)</Text>
                </View>
                <View style={[iconContainerStyle, { paddingLeft: 3 }]}>
                  <TouchableOpacity onPress={() => this.onToastPress('Maintenance')}>
                    <Image
                      style={iconStyle}
                      source={require('../../../assets/tooltipIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[valueContainerStyle, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <Input
                  placeholder='000 %'
                  onChangeText={this.onMaintenanceFundChange.bind(this)}
                  value={this.props.maintenanceFund}
                  width={(this.state.width - 30) / 4.5}
                  textAlign='right'
                />
                <Text style={[dataTextStyle, { alignSelf: 'center' }]}>$ 00,000.00</Text>
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Cable/Internet</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='$ 000,000,000.00'
                  onChangeText={this.onCableChange.bind(this)}
                  value={this.props.cable}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <View style={{ flex: 2 }}>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Borrowed Down Payment</Text>
                </View>
                <View style={iconContainerStyle}>
                  <TouchableOpacity onPress={() => this.onToastPress('Payment')}>
                    <Image
                      style={iconStyle}
                      source={require('../../../assets/tooltipIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='$ 000,000,000.00'
                  onChangeText={this.onBorrowedDownPaymentChange.bind(this)}
                  value={this.props.borrowedDownPaymentMonthly}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Other</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='$ 000,000,000.00'
                  onChangeText={this.onOtherChange.bind(this)}
                  value={this.props.other}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View
              style={[inputContainerStyle, {
                marginHorizontal: 15,
                marginVertical: 15,
                backgroundColor: '#e8e8e8',
                borderRadius: 10
              }]}
            >
              <View style={labelContainerStyle}>
                <View style={{ flex: 2, paddingBottom: 10 }}>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Property Management</Text>
                </View>
                <View style={[iconContainerStyle, { paddingBottom: 10, transform: [{ translateX: translateIcon }] }]}>
                  <TouchableOpacity onPress={() => this.onToastPress('Management')}>
                    <Image
                      style={iconStyle}
                      source={require('../../../assets/tooltipIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ paddingRight: 5 }}>
                    <Input
                      placeholder='000'
                      onChangeText={this.onPropertyManagementChange.bind(this)}
                      value={this.props.propertyManagement}
                      width={(this.state.width - 30) / 6}
                      textAlign='right'
                    />
                  </View>
                  <View style={{ paddingRight: 10 }}>
                    <Text style={dataTextStyle}>% of Net Rent</Text>
                  </View>
                </View>
                <View style={{ paddingRight: 10, paddingBottom: 15 }}>
                  <Text style={dataTextStyle}>$ 00,000.00</Text>
                </View>
              </View>
            </View>

            {/* Grey line */}
            <View style={inputContainerStyle}>
              <View style={{ backgroundColor: '#f0f0f0', height: 2, width: (this.state.width - 30) / 2, marginLeft: 15 }} />
              <View style={{ backgroundColor: '#aaa', height: 2, width: (this.state.width - 30) / 2, marginTop: 5 }} />
            </View>
            {/* Grey line */}

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Total Expenses (Monthly)</Text>
              </View>
              <View style={valueContainerStyle}>
                <Text style={dataTextStyle}>$ {TotalExpensesMonthly}</Text>
              </View>
            </View>

          </View>
          <View style={footerContainerStyle}>
            <View style={buttonsContainerStyle}>
              <TouchableOpacity
              onPress={() => {
                  this.props.navigation.navigate('OtherCosts', { type, name, id });
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
    height: 675,
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
    height: 100,
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
    token: state.token.token
  };
};

export default connect(mapStateToProps, {
  taxesChanged,
  condoChanged,
  insuranceChanged,
  utilitiesChanged,
  maintenanceFundChanged,
  cableChanged,
  expensesBorrowedDownPaymentChanged,
  expensesOtherChanged,
  propertyManagementChanged,
  clearExpenses,
  clearRevenue,
  clearPropertyInformation
})(MonthlyExpenses);
