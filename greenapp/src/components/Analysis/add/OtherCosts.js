import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import Switch from 'react-native-switch-pro';
import { SimpleHeader, Input } from '../../common';
import { repairsChanged, costsRentalIncomeChanged, setApply, clearOtherCosts, clearRevenue, clearExpenses, clearPropertyInformation } from '../../../actions';

class OtherCosts extends Component {
  static navigationOptions = {
    header: null
  }

  state = { width: 0, height: 0, switch: false }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  }

  onRepairsChange(text) {
    this.props.repairsChanged(text);
  }

  onRentalIncomeChange(text) {
    this.props.costsRentalIncomeChanged(text);
  }

  onToastPress(category) {
    let toastText;
    if (category === 'Repairs') {
      toastText = 'Lorem ipsum dolor sit amet.';
    } else if (category === 'Tax') {
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

  onSwitchPress() {
    this.setState({ switch: !this.state.switch });
    this.props.setApply(this.state.switch);
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
        InsurancePremium
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
    let PropertyTransferTax = this.props.propertytransfertax;
    let LegalFees = 0;
    let InsurancePremium = 0;

    return (
      <View onLayout={this.onLayout} style={containerStyle}>
        <ScrollView onScroll={() => this.onScroll()}>

          <SimpleHeader headerText={type} />

          {/* Progress bar */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[progressBarFilledStyle, { width: 4 / 6 * (this.state.width) }]} />
            <View style={[progressBarEmptyStyle, { width: 2 / 6 * (this.state.width) }]} />
          </View>
          {/* Progress bar */}

          <View style={headerContentStyle}>
            <Text style={{ fontSize: 19 }}>
              {name}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#aaa' }}>
              4. OTHER COSTS (INITIAL INVESTMENT)
            </Text>
          </View>

          <View style={contentContainerStyle}>

            <View
              style={[inputContainerStyle, {
                marginHorizontal: 15,
                marginTop: 20,
                marginBottom: 5,
                backgroundColor: '#e8e8e8',
                borderRadius: 10
              }]}
            >
              <View style={[labelContainerStyle, { flex: 4 }]}>
                <View style={{ flex: 2, paddingBottom: 10 }}>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Property Transfer Tax</Text>
                  <Text style={[labelTextStyle, { fontSize: 12 }]}>(BC PTT Only)</Text>
                </View>
                <View style={[iconContainerStyle, { paddingBottom: 10 }]}>
                  <TouchableOpacity onPress={() => this.onToastPress('Tax')}>
                    <Image
                      style={iconStyle}
                      source={require('../../../assets/tooltipIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 3, marginRight: 15 }}>
                <View style={{ paddingTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Switch
                    value={this.state.switch}
                    onSyncPress={() => this.onSwitchPress()}
                    width={50}
                    height={25}
                    backgroundActive='#fff'
                    backgroundInactive='#fff'
                    circleColorActive='#808080'
                    circleColorInactive='#ccc'
                  />
                  <Text style={{ fontSize: 13, paddingLeft: 15 }}>Apply</Text>
                </View>
                <View style={{ paddingBottom: 15 }}>
                  <Text style={dataTextStyle}>$ 000,000,000.00</Text>
                </View>
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Legal Fees</Text>
              </View>
              <View style={valueContainerStyle}>
                <Text style={dataTextStyle}>$ {LegalFees}</Text>
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <View>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Repairs</Text>
                </View>
                <View style={iconContainerStyle}>
                  <TouchableOpacity onPress={() => this.onToastPress('Repairs')}>
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
                  onChangeText={this.onRepairsChange.bind(this)}
                  value={this.props.repairs}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Rental Income</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='$ 000,000,000.00'
                  onChangeText={this.onRentalIncomeChange.bind(this)}
                  value={this.props.othercosts}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <View>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Insurance Premium</Text>
                  <Text style={{ fontSize: 12 }}>(Not Out-of-Pocket)</Text>
                </View>
                <View style={[iconContainerStyle, { paddingLeft: 3, paddingTop: 5 }]}>
                  <TouchableOpacity onPress={() => this.onToastPress('Insurance')}>
                    <Image
                      style={iconStyle}
                      source={require('../../../assets/tooltipIcon.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={valueContainerStyle}>
                <Text style={dataTextStyle}>$ {InsurancePremium}</Text>
              </View>
            </View>

          </View>
          <View style={footerContainerStyle}>
            <View style={buttonsContainerStyle}>
              <TouchableOpacity
              onPress={() => {
                  this.props.navigation.navigate('Calculations', { type, name, id });
                  this.setState({ switch: false });
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
    height: 320,
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
    token: state.token.token
  };
};

export default connect(mapStateToProps, { repairsChanged, costsRentalIncomeChanged, setApply, clearOtherCosts, clearRevenue, clearExpenses, clearPropertyInformation })(OtherCosts);
