import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import { SimpleHeader, Input } from '../../common';
import {
  purchasePriceChanged,
  downPaymentChanged,
  borrowedDownPaymentChanged,
  numberOfUnitsChanged,
  clearPropertyInformation,
  addToIncomplete
} from '../../../actions';

class PropertyInformation extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    const type = this.props.navigation.state.params.type.Type;
    const ForProperty = this.props.navigation.state.params.name.Name;

    switch (type) {
      case 'Cash Flow Analysis':
        this.Type = 'Cash Flow';
        break;
      case 'Flip Analysis':
        this.Type = 'Flip';
        break;
      case 'Rent vs. Own Analysis':
        this.Type = 'Rent vs. Own';
        break;
      default:
        this.Type = '';
    }

    this.ForProperty = ForProperty;

    for (const prop of this.props.residentials) {
      if (prop.Name === ForProperty) {
         this.PropertyId = prop.PropertyId;
         break;
       }
    }
   for (const prop of this.props.commercials) {
     if (prop.Name === ForProperty) {
       this.PropertyId = prop.PropertyId;
       break;
     }
   }

   this.Date = this.getCurrentDate();
  }

  getCurrentDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const current = year + '-' + month + '-' + day;

    return current;
  }

  state = {
    width: 0,
    isToastOpen: false
  }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  }

  onPurchasePriceChange(text) {
    this.props.purchasePriceChanged(text);
  }

  onDownPaymentChange(text) {
    this.props.downPaymentChanged(text);
  }

  onBorrowedDownPaymentChange(text) {
    this.props.borrowedDownPaymentChanged(text);
  }

  onNumberOfUnitsChange(text) {
    this.props.numberOfUnitsChanged(text);
  }

  onToastPress() {
    const toastText = 'Use this box if you want the amount of borrowed funds to be exempt from the Return On Investment (ROI) calculation.';
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

    const analysis = {
      PropertyId:this.PropertyId,
      Status: 'Incomplete',
      Type:this.Type,
      ForProperty:this.ForProperty,
      Date:this.Date,
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
      PriceperDoor
    };

    axios.post('http://localhost:8888/greenmortgage/wp-json/gmma/v1/analyses', analysis, { headers: {'Token' : this.props.token}})
      .then(() => {
        console.log('Post done!');
        axios.get('http://localhost:8888/greenmortgage/wp-json/gmma/v1/analyses/last',{ headers: {'Token' : this.props.token}})
          .then((response) => {
            console.log('Get done!');
            this.props.addToIncomplete(response.data);
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

    this.props.clearPropertyInformation();
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Start' })
      ]
    }));

  }

  continuePress() {
    const type = this.props.navigation.state.params.type.Type;
    const name = this.props.navigation.state.params.name.Name;
    const analysis = {
      PropertyId:this.PropertyId,
      Status: 'Incomplete',
      Type:this.Type,
      ForProperty:this.ForProperty,
      Date:this.Date
    };

    axios.post('http://localhost:8888/greenmortgage/wp-json/gmma/v1/analyses', analysis, { headers: {'Token' : this.props.token}})
      .then(() => {
        console.log('Post done!');
        axios.get('http://localhost:8888/greenmortgage/wp-json/gmma/v1/analyses/last',{ headers: {'Token' : this.props.token}})
          .then((response) => {
            console.log('Get done!');
            const id = response.data.AnalysisId;
            this.props.navigation.navigate('MonthlyRevenue', { type, name, id });
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
      footerTextContainer,
      buttonsContainerStyle,
      buttonStyle,
      iconStyle,
      iconContainerStyle,
      toastStyle,
      toastTextStyle
    } = styles;
    const type = this.props.navigation.state.params.type.Type;
    const name = this.props.navigation.state.params.name.Name;
    const toastPosition = this.state.width > this.state.height ? 50 : 145;
    let PurchasePrice = this.props.purchasePrice;
    let DownPayment = this.props.downPayment;
    let BorrowedDownPayment = this.props.borrowedDownPayment;
    let TotalMortgage = PurchasePrice - DownPayment + BorrowedDownPayment;
    let NumberofUnits = this.props.numberOfUnits;
    let PriceperDoor = PurchasePrice / NumberofUnits;

    return (
      <View onLayout={this.onLayout} style={containerStyle}>
        <ScrollView onScroll={() => this.onScroll()}>

          <SimpleHeader headerText={type} />

          {/* Progress bar */}
          <View style={{ flexDirection: 'row' }}>
            <View style={[progressBarFilledStyle, { width: 1 / 6 * (this.state.width) }]} />
            <View style={[progressBarEmptyStyle, { width: 5 / 6 * (this.state.width) }]} />
          </View>
          {/* Progress bar */}

          <View style={headerContentStyle}>
            <Text style={{ fontSize: 19 }}>
              {name}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '500', color: '#aaa' }}>
              1. PROPERTY INFORMATION
            </Text>
          </View>

          <View style={contentContainerStyle}>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Purchase Price</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='$ 000,000,000.00'
                  onChangeText={this.onPurchasePriceChange.bind(this)}
                  value={this.props.purchasePrice}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Down Payment %</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='00 %'
                  onChangeText={this.onDownPaymentChange.bind(this)}
                  value={this.props.downPayment}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
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
                <Text style={labelTextStyle}>Down Payment</Text>
              </View>
              <View style={valueContainerStyle}>
                <Text style={dataTextStyle}>$ {(DownPayment/100)*PurchasePrice}</Text>
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <View style={{ flex: 2 }}>
                  <Text style={[labelTextStyle, { paddingTop: 5 }]}>Borrowed Down Payment</Text>
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
                  onChangeText={this.onBorrowedDownPaymentChange.bind(this)}
                  value={this.props.borrowedDownPayment}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
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
                <Text style={labelTextStyle}>Total Mortgage</Text>
              </View>
              <View style={valueContainerStyle}>
                <Text style={dataTextStyle}>$ {TotalMortgage}</Text>
              </View>
            </View>

            <View style={inputContainerStyle}>
              <View style={labelContainerStyle}>
                <Text style={labelTextStyle}>Number of Units</Text>
              </View>
              <View style={valueContainerStyle}>
                <Input
                  placeholder='$ 000,000,000.00'
                  onChangeText={this.onNumberOfUnitsChange.bind(this)}
                  value={this.props.numberOfUnits}
                  width={(this.state.width - 30) / 2}
                  textAlign='right'
                />
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
                <Text style={labelTextStyle}>Price per Door</Text>
              </View>
              <View style={valueContainerStyle}>
                <Text style={dataTextStyle}>$ {PriceperDoor}</Text>
              </View>
            </View>

          </View>
          <View style={footerContainerStyle}>
            <View style={footerTextContainer}>
              <Text style={{ fontSize: 16 }}>
                Your work is saved as you progress. Feel free to take a break and come back later.
              </Text>
            </View>
            <View style={buttonsContainerStyle}>
              <TouchableOpacity
                onPress={() => { this.continuePress() }}
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
    height: 380,
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
    marginBottom: 5,
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
  footerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10
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
    residentials: state.assets.residentials,
    commercials: state.assets.commercials,
    Analysisid: state.propertyInformation.id,
    token: state.token.token
  };
};

export default connect(mapStateToProps, {
  purchasePriceChanged,
  downPaymentChanged,
  borrowedDownPaymentChanged,
  numberOfUnitsChanged,
  clearPropertyInformation,
  addToIncomplete
})(PropertyInformation);
