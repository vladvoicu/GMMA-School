import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

const BackHeader = ({ onPress, headerText }) => {
  const { textStyle, containerStyle, iconStyle, iconContainerStyle } = styles;

  return (
    <View style={containerStyle}>
      <View style={iconContainerStyle}>
        <TouchableOpacity onPress={onPress}>
          <Image
            style={iconStyle}
            source={require('../../assets/backIcon.png')}
          />
        </TouchableOpacity>
      </View>
      <Text style={textStyle}>{headerText}</Text>
      <View style={{ flex: 1 }} />
    </View>
  );
};

const styles = {
  iconStyle: {
    height: 25,
    width: 25,
    tintColor: '#999',
    margin: 15
  },
  iconContainerStyle: {
    flex: 1
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    flex: 3
  },
  containerStyle: {
    backgroundColor: '#fafafa',
    paddingTop: 15,
    height: 55,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#bbb'
  }
};

export { BackHeader };
