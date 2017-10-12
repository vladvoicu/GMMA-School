import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import { SimpleHeader, Input } from '../../common';
import { vacancyChanged, rentalIncomeChanged, otherChanged, clearRevenue, clearPropertyInformation } from '../../../actions';

class MonthlyRevenue extends Component {
  static navigationOptions = {
    header: null
  }

  state = { width: 0, height: 0, isToastOpen: false }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  }

  onVacancyChange(text) {
    this.props.vacancyChanged(text);
  }

  onRentalIncomeChange(text) {
    this.props.rentalIncomeChanged(text);
  }

  onOtherChange(text) {
    this.props.otherChanged(text);
  }

  onToastPress() {
    const toastText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.';
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
        Otherrevenuemonthly
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
    let NetRent = 0;

    return (
      <View onLayout={this.onLayout} style={containerStyle}>
        <ScrollView onScroll={() => this.onScroll()}>

          <SimpleHeader headerText={type} />

           {/* Progress bar */}
           <View style={{ flexDirection: 'row' }}>
            <View style={[progressBarFilledStyle, { width: 2 / 6 * (this.state.width) }]} />
            <View style={[progressBarEmptyStyle, { width: 4 / 6 * (this.state.width) }]} />
          </View>
          {/* Progress bar */}

          <View style={headerContentStyle}>
            <Text style={{ fontSize: 19 }}>
              {name}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#aaa' }}>
              2. REVENUE (MONTHLY)
            </Text>
          </View>

          <View style={contentContainerStyle}>

            <View style={[inputContainerStyle, { marginTop: 10 }]}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Net Rent</Text>
              </View>
              <View style={valueContainerStyle}>
                <Text style={dataTextStyle}>$ {NetRent}</Text>
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Vacancy (%)</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='000 %'
                  onChangeText={this.onVacancyChange.bind(this)}
                  value={this.props.vacancy}
                  width={this.state.width / 4}
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
                  value={this.props.rentalIncome}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View style={[inputContainerStyle, { marginBottom: 10 }]}>
              <View style={labelContainerStyle}>
                <View>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Other</Text>
                </View>
                <View style={iconContainerStyle}>
                  <TouchableOpacity onPress={() => this.onToastPress()}>
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
                  onChangeText={this.onOtherChange.bind(this)}
                  value={this.props.other}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

          </View>
          <View style={footerContainerStyle}>
            <View style={buttonsContainerStyle}>
              <TouchableOpacity
              onPress={() => {
                  this.props.navigation.navigate('MonthlyExpenses', { type, name, id });
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
    height: 230,
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
    backgroundColor: '#fff',
    margin: 10
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
    marginTop: 13,
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
    token: state.token.token
  };
};

export default connect(mapStateToProps, { vacancyChanged, rentalIncomeChanged, otherChanged, clearRevenue, clearPropertyInformation })(MonthlyRevenue);
