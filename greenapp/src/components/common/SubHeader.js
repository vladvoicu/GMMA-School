import React from 'react';
import { Text, View } from 'react-native';

const SubHeader = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{ props.subheaderText }</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    position: 'relative'
  },
  textStyle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#fff'
  }
};
export { SubHeader };
