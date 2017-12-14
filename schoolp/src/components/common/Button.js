import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, textStyle }) => {
  const { buttonStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {

  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    //marginLeft: 5,
    //marginRight: 5
  }
};

export { Button };
