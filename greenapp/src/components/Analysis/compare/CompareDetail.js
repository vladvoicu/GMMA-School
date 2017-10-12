import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { addSelectedCompareObject, clearSelectedCompareArray, getAnalysisType, setCancel } from '../../../actions';

class CompareDetail extends Component {
  constructor(props) {
    super(props);
    const { ForProperty } = this.props.analysisProp;
    this.property = {};

    for (const property of this.props.residentials) {
      if (ForProperty === property.Name) {
        this.property = property;
        break;
      }
    }

    for (const property of this.props.commercials) {
      if (ForProperty === property.Name) {
        this.property = property;
        break;
      }
    }
  }

  state = { isChecked: false };

  componentDidUpdate() {
    if (this.state.isChecked === true && this.props.cancel === true) {
      this.setState({ isChecked: false });
    }
  }

  isPressed() {
    const { ForProperty, Type, AnalysisId } = this.props.analysisProp;

    if (this.props.cancel === true) {
      this.props.setCancel(false);
    }

    this.setState({ isChecked: !this.state.isChecked });
    this.props.getAnalysisType(Type);
    this.props.buttonPressed(AnalysisId);

    if (this.state.isChecked === false) {
      this.props.addSelectedCompareObject(AnalysisId);
    } else {
      this.props.clearSelectedCompareArray();
    }
  }

  renderIcon() {
    const { iconStyle } = styles;

    if (this.property.Type === 'Residential') {
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

  renderCheckbox(isChecked, cancel) {
    const { checkContainerStyle, checkIconStyle } = styles;

    if (!isChecked || cancel) {
      return (
        <View style={checkContainerStyle} />
      );
    } else {
      return (
        <View style={checkContainerStyle}>
          <Image
            style={checkIconStyle}
            source={require('../../../assets/checkIcon.png')}
          />
        </View>
      );
    }
  }

  renderContent() {
    const {
      containerStyle,
      iconContainerStyle,
      textContainerStyle,
      headerTextStyle,
      addressStyle,
      dateStyle
    } = styles;
    const { ForProperty } = this.props.analysisProp;
    const { selected } = this.props;

    const analysisDate = new Date(this.props.analysisProp.Date);
    const stringDate = analysisDate.toString();
    const splitDate = stringDate.split(' ');

    if (selected === true) {
      return (
        <TouchableWithoutFeedback onPress={() => this.isPressed()}>
          <View style={containerStyle}>
            {this.renderCheckbox(this.state.isChecked, this.props.cancel)}
            <View style={iconContainerStyle}>
              {this.renderIcon()}
            </View>
            <View style={textContainerStyle}>
              <Text style={headerTextStyle}>{ForProperty}</Text>
              <Text style={addressStyle}>
                {this.property.StreetNumber} {this.property.StreetName}, {this.property.City}, {this.property.ZipCode}
              </Text>
              <Text style={dateStyle}>{splitDate[1]} {splitDate[2]}, {splitDate[3]}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    } else {
      return (
        <View style={[containerStyle, { opacity: 0.2 }]}>
          {this.renderCheckbox(this.state.isChecked, this.props.cancel)}
          <View style={iconContainerStyle}>
            {this.renderIcon()}
          </View>
          <View style={textContainerStyle}>
            <Text style={headerTextStyle}>{ForProperty}</Text>
            <Text style={addressStyle}>
              {this.property.StreetNumber} {this.property.StreetName}, {this.property.City}, {this.property.ZipCode}
            </Text>
            <Text style={dateStyle}>{splitDate[1]} {splitDate[2]}, {splitDate[3]}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      this.renderContent()
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fafafa',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    flexDirection: 'row'
  },
  iconStyle: {
    height: 25,
    width: 25,
    tintColor: '#999',
    marginRight: 15
  },
  iconContainerStyle: {
    flex: 1,
    marginLeft: 25,
    marginTop: 15,
    alignItems: 'flex-end'
  },
  addressStyle: {
    fontSize: 12,
    color: '#c6c6c6',
  },
  dateStyle: {
    fontSize: 16,
    paddingTop: 2
  },
  headerTextStyle: {
    fontSize: 24,
    paddingBottom: 2
  },
  textContainerStyle: {
    flex: 9,
    marginTop: 11.5,
    marginBottom: 20
  },
  checkContainerStyle: {
    flex: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkIconStyle: {
    height: 15,
    width: 15,
    tintColor: '#999',
  }
};

const mapStateToProps = state => {
  return {
    completeAnalyses: state.analyses.complete,
    commercials: state.assets.commercials,
    residentials: state.assets.residentials,
    compareList: state.compareArray.list,
    cancel: state.compareArray.cancel
   };
};

export default connect(mapStateToProps,
  {
    addSelectedCompareObject,
    clearSelectedCompareArray,
    getAnalysisType,
    setCancel
  })(CompareDetail);
