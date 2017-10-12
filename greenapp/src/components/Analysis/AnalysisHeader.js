import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

const AnalysisHeader = ({ onPress, headerText, navigator }) => {
  const { textStyle, containerStyle, iconStyle, iconContainerStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={onPress}>
          <Image
            style={iconStyle}
            source={require('../../assets/menu-2-512.png')}
          />
        </TouchableOpacity>
      </View>
      <Text style={textStyle}>{headerText}</Text>
      <View style={iconContainerStyle}>
        <TouchableOpacity onPress={() => navigator.navigate('Compare')}>
          <Text style={{ fontWeight: '500' }}>Compare</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigator.navigate('AddAnalysis')}>
          <Image
            style={iconStyle}
            source={require('../../assets/plusIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  iconStyle: {
    height: 20,
    width: 20,
    tintColor: '#808080',
    margin: 15
  },
  iconContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    flex: 1
  },
  containerStyle: {
    backgroundColor: '#f8f8f8',
    paddingTop: 15,
    height: 55,
    borderBottomWidth: 0.3,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default AnalysisHeader;
