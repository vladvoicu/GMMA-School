import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonHeader = ({ onPress }) => {

  return (
    <TouchableOpacity onPress={onPress} >
     <Icon name="bars" style={{padding: 10, marginLeft:10}} size={20} color="black" type={"font-awesome"}/>
    </TouchableOpacity>
  );
};



export default ButtonHeader ;
