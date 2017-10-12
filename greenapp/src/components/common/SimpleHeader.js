import React from 'react';
import { Text, View } from 'react-native';

const SimpleHeader = ({ headerText }) => {
  const { textStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{headerText}</Text>
    </View>
  );
};

const styles = {
  textStyle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
  containerStyle: {
    backgroundColor: '#fafafa',
    height: 55,
    paddingTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export { SimpleHeader };
