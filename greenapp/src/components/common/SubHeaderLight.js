import React from 'react';
import { Text, View } from 'react-native';

const SubHeaderLight = (props) => {
  const { viewStyle, textStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.subHeaderText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    position: 'relative',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  textStyle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#808080'
  }
};

export { SubHeaderLight };
