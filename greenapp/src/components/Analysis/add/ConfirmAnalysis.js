import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import ModalDropdown from 'react-native-modal-dropdown';
import { Header, Input } from '../../common';
import {
  propertyChosen,
  nameChanged,
  addressChanged,
  cityChanged,
  provinceChanged,
  postalCodeChanged,
  ownershipChanged,
  setPropertyObject,
  clearModal,
  addToResidentials,
  addToCommercials,
  updateResidentialsArray,
  updateCommercialsArray,
  updateCompleteAnalyses,
  updateIncompleteAnalyses
} from '../../../actions';
import Menu from '../../Menu/Menu';

const { width: screenWidth } = Dimensions.get('window');

class ConfirmAnalysis extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.menuAnimatedValue = new Animated.Value(0);
    this.mainAnimatedValue = new Animated.Value(0);
    this.properties = [];
    this.options = [];
    this.selectedProperty = {};

    for (const property of this.props.residentials) {
      this.properties.push(property);
      this.options.push(property.Name);
    }

    for (const property of this.props.commercials) {
      this.properties.push(property);
      this.options.push(property.Name);
    }

  }

  state = {
    width: 0,
    height: 0,
    isOpen: false,
    shownText: 'Choose Property',
    isSelected: false,
    modalVisible: false,
    checkboxSelected: false,
    onEdit: false,
    originalPropName: '',
    propName: '',
    selectedIndex: -1
   }

  getButtonPressed = (isPressed) => {
    if (isPressed === true) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    let menuToValue;
    let mainToValue;
    if (!this.state.isOpen) {
      menuToValue = 0;
      this.menuAnimatedValue.setValue(-this.state.width);
      mainToValue = this.state.width;
      this.mainAnimatedValue.setValue(0);
    } else {
      menuToValue = -this.state.width;
      this.menuAnimatedValue.setValue(0);
      mainToValue = 0;
      this.mainAnimatedValue.setValue(this.state.width);
    }

    Animated.timing(this.menuAnimatedValue, {
      toValue: menuToValue,
      duration: 300,
      easing: Easing.out(Easing.bezier(0, 0, 0.8, 1))
    }).start();

    Animated.timing(this.mainAnimatedValue, {
      toValue: mainToValue,
      duration: 300,
      easing: Easing.out(Easing.bezier(0, 0, 0.8, 1))
    }).start();

    this.setState({ isOpen: !this.state.isOpen });
  }

  onSelect(index, value) {
    this.setState({ shownText: value, isSelected: true });

    for (const prop of this.props.residentials) {
      if (value === prop.Name) {
        this.selectedProperty = prop;
        this.setState({ propName: value, selectedIndex: this.props.residentials.indexOf(prop) });
        break;
      }
    }

    for (const prop of this.props.commercials) {
      if (value === prop.Name) {
        this.selectedProperty = prop;
        this.setState({ propName: value, selectedIndex: this.props.commercials.indexOf(prop) });
        break;
      }
    }
    console.log(this.selectedProperty);
  }

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  }

  renderPropertyData() {
    const { propertyTextStyle } = styles;

    if (this.state.selectedIndex === -1) {
      return (
        <View style={{ height: 133.3 }} />
      );
    } else {
      return (
        <View>
          <Text style={[propertyTextStyle, { paddingTop: 10 }]}>
            {this.selectedProperty.Name}
          </Text>
          <Text style={[propertyTextStyle, { paddingBottom: 15 }]}>
            {this.selectedProperty.Type} property
          </Text>
          <Text style={propertyTextStyle}>
            {this.selectedProperty.StreetNumber} {this.selectedProperty.StreetName}
          </Text>
          <Text style={propertyTextStyle}>
            {this.selectedProperty.City}
          </Text>
          <Text style={propertyTextStyle}>
            {this.selectedProperty.ZipCode}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    const { buttonStyle, footerTextStyle } = styles;
    const Type = this.props.navigation.state.params.type;
    const Name = this.state.propName;

    if (this.state.isSelected) {
      return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={footerTextStyle}>
            <Text style={{ fontSize: 18 }}>Thats the one!</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              style={[buttonStyle, { borderColor: '#999', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }]}
              onPress={() => this.props.navigation.navigate('PropertyInformation', { type: { Type }, name: { Name } })}
              >
              <Text style={{ fontSize: 22 }}>
                Begin Analysis
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({
                isSelected: false,
                shownText: 'Choose Property',
                propName: '',
                selectedIndex: -1
              })}
              style={{ justifyContent: 'center', marginRight: 30 }}
            >
              <Text style={{ fontSize: 20 }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
          <View style={footerTextStyle}>
            <Text style={{ fontSize: 18, color: '#aaa' }}>Thats the one!</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={[buttonStyle, { borderColor: '#aaa', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }]}>
              <Text style={{ fontSize: 22, color: '#aaa' }}>
                Begin Analysis
              </Text>
            </View>
            <View style={{ justifyContent: 'center', marginRight: 30, height: 50 }}>
              <Text style={{ fontSize: 20, color: '#aaa' }}>
                Cancel
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }

  onNameChange(text) {
    this.props.nameChanged(text);
  }

  onAddressChange(text) {
    this.props.addressChanged(text);
  }

  onCityChange(text) {
    this.props.cityChanged(text);
  }

  onProvinceChange(text) {
    this.props.provinceChanged(text);
  }

  onPostalCodeChange(text) {
    this.props.postalCodeChanged(text);
  }

  onModalClose() {
    this.props.clearModal();
    this.setState({ onEdit: false, modalVisible: false, checkboxSelected: false });
  }

  onChecked() {
    this.setState({ checkboxSelected: !this.state.checkboxSelected });

    if (!this.state.checkboxSelected) {
      this.props.ownershipChanged('1');
    } else {
      this.props.ownershipChanged('0');
    }
  }

  onModalX() {
    if (this.props.name === '' &&
        this.props.address === '' &&
        this.props.city === '' &&
        this.props.province === '' &&
        this.props.postalCode === '') {
          this.onModalClose();
        } else {
          this.setState({ onEdit: false, checkboxSelected: false });
          this.props.clearModal();
        }
  }

  getCurrentDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const current = year + '-' + month + '-' + day;

    return current;
  }

  getAnalysesForProperty(id) {
    const analyses = [];
    for (const analysis of this.props.complete) {
      if (id === analysis.PropertyId) {
        analyses.push(analysis);
      }
    }

    for (const analysis of this.props.incomplete) {
      if (id === analysis.PropertyId) {
        analyses.push(analysis);
      }
    }

    return analyses;
  }

  onModalAdd() {
    const addressArray = this.props.address.split(' ');
    const streetNumber = addressArray[0];
    let streetName ;
    for (let i = 1; i < addressArray.length; i++) {
      if ( i === 1 ) {
        streetName = addressArray[1];
      } else {
        streetName = streetName + ' ' + addressArray[i];
      }
      streetName.trim();
    }

    const zipCode = this.props.province + ' ' + this.props.postalCode;

    const propertyToEdit = {
      PropertyId: this.selectedProperty.PropertyId,
      Type: this.props.type,
      Name: this.props.name,
      StreetName: streetName,
      StreetNumber: streetNumber,
      City: this.props.city,
      ZipCode: zipCode,
      MortgageOwn: this.props.mortgageOwn
    };

   const propertyToAdd = {
     Type: this.props.type,
     Name: this.props.name,
     StreetName: streetName,
     StreetNumber: streetNumber,
     City: this.props.city,
     ZipCode: zipCode,
     HealthValue: 0,
     AnnualROI: 0,
     PurchaseDate: this.getCurrentDate(),
     MortgageOwn: this.props.mortgageOwn
   };

    // console.log(JSON.stringify(property, null, 2));

    if (!this.state.onEdit) {
      axios.post('http://localhost:8888/greenmortgage/wp-json/gmma/v1/properties', propertyToAdd, { headers: {'Token' : this.props.token}})
      .then(() => {
        console.log('Post done!');
        axios.get('http://localhost:8888/greenmortgage/wp-json/gmma/v1/properties/last',{ headers: {'Token' : this.props.token}})
          .then((response) => {
            console.log('Get done!');
            if (response.data.Type === 'Residential') {
              this.props.addToResidentials(response.data);
              this.options.push(response.data.Name);
              this.onSelect(this.props.residentials.indexOf(response.data), response.data.Name);
            } else {
              this.props.addToCommercials(response.data);
              this.options.push(response.data.Name);
              this.onSelect(this.props.commercials.indexOf(response.data), response.data.Name);
            }
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
      } else {
        if (this.props.type === 'Residential') {
       this.props.updateResidentialsArray(propertyToEdit, this.state.selectedIndex);
       axios.put('http://localhost:8888/greenmortgage/wp-json/gmma/v1/properties/' + this.selectedProperty.PropertyId, propertyToEdit, { headers: {'Token' : this.props.token}})
         .then(() => console.log('Put done!'))
         .catch(error => {
           console.log(error.response);
           if ( error.response.status === 404 ) {
             this.props.navigation.navigate('InvalidToken');
           }
         });

          if (propertyToEdit.Name !== this.state.originalPropName) {

           const analyses = this.getAnalysesForProperty(this.selectedProperty.PropertyId);

           for (const analysis of analyses) {
             axios.put('http://localhost:8888/greenmortgage/wp-json/gmma/v1/analyses/' + analysis.AnalysisId,
               {
                 ForProperty: propertyToEdit.Name
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
           }

           this.props.updateCompleteAnalyses(this.state.originalPropName, propertyToEdit.Name);
           this.props.updateIncompleteAnalyses(this.state.originalPropName, propertyToEdit.Name);
         }
     } else if (this.props.type === 'Commercial') {
       this.props.updateCommercialsArray(propertyToEdit, this.state.selectedIndex);
       axios.put('http://localhost:8888/greenmortgage/wp-json/gmma/v1/properties/' + this.selectedProperty.PropertyId, propertyToEdit, { headers: {'Token' : this.props.token}})
         .then(() => console.log('Put done!'))
         .catch(error => {
           console.log(error.response);
           if ( error.response.status === 404 ) {
             this.props.navigation.navigate('InvalidToken');
           }
         });

          if (propertyToEdit.Name !== this.state.originalPropName) {

             const analyses = this.getAnalysesForProperty(this.selectedProperty.PropertyId);

             for (const analysis of analyses) {
               axios.put('http://localhost:8888/greenmortgage/wp-json/gmma/v1/analyses/' + analysis.AnalysisId,
                 {
                   ForProperty: propertyToEdit.Name
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
             }

           this.props.updateCompleteAnalyses(this.state.originalPropName, propertyToEdit.Name);
           this.props.updateIncompleteAnalyses(this.state.originalPropName, propertyToEdit.Name);
         }
     }

      }

      this.properties = [];
      for (const prop of this.props.residentials) {
        this.properties.push(prop);
      }
      for (const prop of this.props.commercials) {
        this.properties.push(prop);
      }
      for (const option of this.options) {
        if (option === this.state.originalPropName) {
          this.options[this.options.indexOf(option)] = propertyToEdit.Name;
        }
      }

      this.onSelect(this.options.indexOf(propertyToEdit.Name), propertyToEdit.Name);
      this.onModalClose();
  }

  onEditPress() {
    const originalName = this.selectedProperty.Name;

    if (this.state.selectedIndex !== -1) {
      this.props.nameChanged(this.selectedProperty.Name);
      const address = this.selectedProperty.StreetNumber + ' ' + this.selectedProperty.StreetName;
      this.props.addressChanged(address);
      this.props.cityChanged(this.selectedProperty.City);
      const zipCodeArray = this.selectedProperty.ZipCode.split(' ');
      const province = zipCodeArray[0];
      const zipCode = zipCodeArray[1] + ' ' + zipCodeArray[2];
      this.props.provinceChanged(province);
      this.props.postalCodeChanged(zipCode);
      this.props.propertyChosen(this.selectedProperty.Type);
      // this.props.ownershipChanged(this.selectedProperty.MortgageOwn);

      let checkboxSelected;
      switch (this.selectedProperty.MortgageOwn) {
        case '0':
          checkboxSelected = false;
          break;
        case '1':
          checkboxSelected = true;
          break;
        default:
          checkboxSelected = false;
      }

      this.setState({ onEdit: true, checkboxSelected, modalVisible: true, originalPropName: originalName });
    }
  }

  renderModalPropButtons() {
    const { propertyIconStyle, modalPropButtonStyle } = styles;

    if (this.props.type === 'Residential' && !this.state.onEdit) {
      return (
        <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20, justifyContent: 'space-between' }}>
          <TouchableOpacity>
            <View style={[modalPropButtonStyle, { backgroundColor: '#fff', width: (this.state.width - 45) / 2 }]}>
              <Image
                style={propertyIconStyle}
                source={require('../../../assets/residentialIcon.png')}
              />
              <Text style={{ fontSize: 18 }}>Residential</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.propertyChosen('Commercial');
            }}
          >
            <View style={[modalPropButtonStyle,  { width: (this.state.width - 45) / 2 }]}>
              <Image
                style={propertyIconStyle}
                source={require('../../../assets/commercialIcon.png')}
              />
              <Text style={{ fontSize: 18 }}>Commercial</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.type === 'Commercial' && !this.state.onEdit) {
      return (
        <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20, justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => {
              this.props.propertyChosen('Residential');
            }}
          >
            <View style={[modalPropButtonStyle, { width: (this.state.width - 45) / 2 }]}>
              <Image
                style={propertyIconStyle}
                source={require('../../../assets/residentialIcon.png')}
              />
              <Text style={{ fontSize: 18 }}>Residential</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[modalPropButtonStyle, { backgroundColor: '#fff', width: (this.state.width - 45) / 2 }]}>
              <Image
                style={propertyIconStyle}
                source={require('../../../assets/commercialIcon.png')}
              />
              <Text style={{ fontSize: 18 }}>Commercial</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 20, justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => {
              this.props.propertyChosen('Residential');
            }}
          >
            <View style={[modalPropButtonStyle, { width: (this.state.width - 45) / 2 }]}>
              <Image
                style={propertyIconStyle}
                source={require('../../../assets/residentialIcon.png')}
              />
              <Text style={{ fontSize: 18 }}>Residential</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.propertyChosen('Commercial');
            }}
          >
            <View style={[modalPropButtonStyle, { width: (this.state.width - 45) / 2 }]}>
              <Image
                style={propertyIconStyle}
                source={require('../../../assets/commercialIcon.png')}
              />
              <Text style={{ fontSize: 18 }}>Commercial</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderCheckbox() {
    if (!this.state.checkboxSelected) {
      return (
        <View
          style={{
            borderWidth: 1,
            borderColor: '#aaa',
            width: 30,
            height: 30,
            backgroundColor: '#fff'
          }}
        />
      );
    } else if (this.state.checkboxSelected) {
        return (
          <View
            style={{
              borderWidth: 1,
              borderColor: '#aaa',
              width: 30,
              height: 30,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              style={{ width: 25, height: 25, tintColor: '#999' }}
              source={require('../../../assets/checkIcon.png')}
            />
          </View>
        );
    }
  }

  renderButtonText() {
    if (this.state.onEdit) {
      return (
        <Text style={{ fontSize: 22 }}>
          Edit
        </Text>
        );
    } else {
      return (
        <Text style={{ fontSize: 22 }}>
          Add
        </Text>
      );
    }
  }

  renderAddButton() {
    const { buttonStyle } = styles;

    if (this.props.name !== '' &&
      this.props.address !== '' &&
      this.props.city !== '' &&
      this.props.province !== '' &&
      this.props.postalCode !== '' &&
      this.props.type !== '') {
        return (
          <TouchableOpacity
            onPress={() => this.onModalAdd()}
            style={[buttonStyle, { borderColor: '#999', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }]}
          >
            {this.renderButtonText()}
          </TouchableOpacity>
        );
      } else {
        return (
          <View style={[buttonStyle, { borderColor: '#aaa', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }]}>
            <Text style={{ fontSize: 22, color: '#aaa' }}>
              Add
            </Text>
          </View>
        );
      }
  }
  renderModal() {
    const { modalContainer, modalHeaderStyle, modalIconStyle } = styles;

    return (
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => console.log('Closed!')}
        supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
      >
        <View style={{ backgroundColor: '#fff', height: 30 }} />
        <View style={modalContainer}>
          <View style={modalHeaderStyle}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '500' }}>Add a Property Profile</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => this.onModalX()}>
                <Image
                  style={modalIconStyle}
                  source={require('../../../assets/modalClose.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 20, marginTop: 10, fontSize: 16 }}>Property Type</Text>
                {this.renderModalPropButtons()}
              <Input
                label='Create a nickname for this property'
                placeholder='House of Lepa Brena'
                onChangeText={this.onNameChange.bind(this)}
                value={this.props.name}
                width={this.state.width - 40}
                marginLeft={20}
              />
              <Input
                label='Street Address'
                placeholder='000 Main Street'
                onChangeText={this.onAddressChange.bind(this)}
                value={this.props.address}
                width={this.state.width - 40}
                marginLeft={20}
              />
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Input
                    label='City or Town'
                    placeholder='Caransebes'
                    onChangeText={this.onCityChange.bind(this)}
                    value={this.props.city}
                    width={this.state.width * 4 / 6 - 20}
                    marginLeft={20}
                  />
                </View>
                <View>
                  <Input
                    label='Province'
                    placeholder='CS'
                    onChangeText={this.onProvinceChange.bind(this)}
                    value={this.props.province}
                    width={this.state.width * 2 / 6 - 40}
                    marginLeft={20}
                  />
                </View>
              </View>
              <Input
                label='Postal Code'
                placeholder='405 815'
                onChangeText={this.onPostalCodeChange.bind(this)}
                value={this.props.postalCode}
                width={this.state.width * 2 / 5 - 40}
                marginLeft={20}
              />
              <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.onChecked()}>
                  {this.renderCheckbox()}
                </TouchableOpacity>
                <Text style={{ marginLeft: 10, fontSize: 14 }}>I own this property</Text>
              </View>
              <View style={{ height: 30 }} />
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                {this.renderAddButton()}
                <TouchableOpacity
                  onPress={() => this.onModalClose()}
                  style={{ justifyContent: 'center', marginRight: 30 }}
                >
                  <Text style={{ fontSize: 20 }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ height: 30 }} />
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  render() {
   const {
     containerStyle,
     menuContainerStyle,
     headingContainerStyle,
     propertyContainerStyle,
     iconStyle,
     iconContainerStyle,
     dropdownStyle,
     dropdownButtonStyle,
     dropdownTextStyle,
     dropdownButtonTextStyle
   } = styles;
   const type = this.props.navigation.state.params.type;

   return (
     <View onLayout={this.onLayout} style={ containerStyle }>
       <Animated.View style={[menuContainerStyle, { transform: [{ translateX: this.menuAnimatedValue }] }]}>
         <Menu
           buttonPressed={this.getButtonPressed}
           navigator={this.props.navigation}
         />
       </Animated.View>

       <Animated.View style={[containerStyle, { transform: [{ translateX: this.mainAnimatedValue }] }]}>
         <Header headerText={type} onPress={() => this.toggleMenu()} />
         <ScrollView style={{ backgroundColor: this.state.isSelected ? '#fff' : '#fafafa' }}>
           <View style={headingContainerStyle}>
             <Text style={{ fontSize: 16 }}>
               Property not in the dropdown list?
             </Text>
             <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
               <Text style={{ fontSize: 16, fontWeight: '500' }}>
                 Add a Property Profile
               </Text>
             </TouchableOpacity>
           </View>

           <View onLayout={this.onLayout} style={propertyContainerStyle}>
             {this.renderModal()}
             <View style={{ padding: 15 }}>
               <Text style={{ fontSize: 20, paddingBottom: 10, paddingLeft: 10 }}>Apply this {type} to:</Text>
               <ModalDropdown
                 options={this.options}
                 onSelect={(index, value) => this.onSelect(index, value)}
                 style={[dropdownButtonStyle, { width: screenWidth - 30 }]}
                 dropdownStyle={[dropdownStyle, { width: screenWidth - 30 }]}
                 textStyle={dropdownButtonTextStyle}
                 dropdownTextStyle={dropdownTextStyle}
                 dropdownTextHighlightStyle={{ color: '#808080' }}
               >
                 <Text style={{ fontSize: 16, transform: [{ translateY: 8 }] }}>{this.state.shownText}</Text>
                 <View style={{ alignItems: 'flex-end', marginRight: 10, justifyContent: 'center' }}>
                   <Image
                     style={{ tintColor: '#999', width: 15, height: 15, transform: [{ translateY: -10 }] }}
                     source={require('../../../assets/downArrowIcon.png')}
                   />
                 </View>
               </ModalDropdown>
               {this.renderPropertyData()}
               <TouchableOpacity onPress={() => this.onEditPress()}>
                 <View style={iconContainerStyle}>
                   <Image
                     style={iconStyle}
                     source={require('../../../assets/editIcon.png')}
                   />
                 </View>
               </TouchableOpacity>
             </View>
           </View>
           {this.renderButton()}
         </ScrollView>
       </Animated.View>
     </View>
   );
 }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  menuContainerStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#fafafa'
  },
  headingContainerStyle: {
    backgroundColor: '#fff',
    height: 80,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  propertyContainerStyle: {
    backgroundColor: '#f0f0f0',
    height: 275
  },
  propertyTextStyle: {
    fontSize: 16,
    paddingLeft: 10
  },
  iconStyle: {
    height: 30,
    width: 30,
    tintColor: '#999',
    marginBottom: 20,
    marginRight: 10
  },
  iconContainerStyle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 5,
    height: 50,
    width: 180
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#eee'
  },
  modalHeaderStyle: {
    flexDirection: 'row',
    borderBottomWidth: 0.2,
    borderColor: '#aaa',
    height: 70
  },
  modalIconStyle: {
    height: 20,
    width: 20,
    tintColor: '#999',
  },
  propertyIconStyle: {
    height: 25,
    width: 25,
    tintColor: '#999',
    marginRight: 10
  },
  modalPropButtonStyle: {
    backgroundColor: '#eee',
    // borderWidth: 0.3,
    flexDirection: 'row',
    width: (screenWidth - 45) / 2,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerTextStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownButtonStyle: {
    backgroundColor: '#fff',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10
  },
  dropdownStyle: {
    height: 158,
    transform: [{ translateX: -11 }, { translateY: 2 }]
  },
  dropdownButtonTextStyle: {
    fontSize: 16
  },
  dropdownTextStyle: {
    fontSize: 14,
    paddingLeft: 11
  }
};

const mapStateToProps = state => {
  return {
    commercials: state.assets.commercials,
    residentials: state.assets.residentials,
    complete: state.analyses.complete,
    incomplete: state.analyses.incomplete,
    type: state.property.property,
    name: state.property.name,
    address: state.property.address,
    city: state.property.city,
    province: state.property.province,
    postalCode: state.property.postalCode,
    mortgageOwn: state.property.ownership,
    token: state.token.token
  };
};

export default connect(mapStateToProps,
  {
    propertyChosen,
    nameChanged,
    addressChanged,
    cityChanged,
    provinceChanged,
    postalCodeChanged,
    ownershipChanged,
    clearModal,
    addToResidentials,
    addToCommercials,
    updateResidentialsArray,
    updateCommercialsArray,
    updateCompleteAnalyses,
    updateIncompleteAnalyses
  })(ConfirmAnalysis);
