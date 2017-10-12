import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

const Header = (props) => {
  const { textStyle, viewStyle, buttonStyle } = styles;

  return (
    <View style={viewStyle}>
      <View style={buttonStyle}>
        <TouchableOpacity onPress={props.onPress} >
          <Image
            style={{ width: 20, height: 20, marginLeft: 10, tintColor: '#808080'}}
            source={require('../../assets/menu-2-512.png')}
            />
        </TouchableOpacity>
      </View>
      <View style={{ width: 200, justifyContent: 'center' }}>
        <Text style={textStyle}>{ props.headerText }</Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    height: 55,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
   position: 'relative'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center'
  },
  buttonStyle: {
    flex: 1
  }
};
export { Header };
