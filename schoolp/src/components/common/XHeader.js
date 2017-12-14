import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

const XHeader = ({ onPress, headerText, backgroundColor }) => {
  const { textStyle, containerStyle, iconStyle, iconContainerStyle } = styles;

  return (
    <View style={[containerStyle, { backgroundColor }]}>
      <View style={iconContainerStyle}>
        <TouchableOpacity onPress={onPress}>
          <Image
            style={iconStyle}
            source={require('../../assets/modalClose.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: 200, justifyContent: 'center' }}>
        <Text style={textStyle}>{headerText}</Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

const styles = {
  iconStyle: {
    height: 19,
    width: 19,
    tintColor: '#999',
    margin: 15
  },
  iconContainerStyle: {
    flex: 1
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
  containerStyle: {
    backgroundColor: '#fafafa',
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderColor: '#bbb',
    height: 55,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export { XHeader };
