import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, width, marginLeft, marginRight, textAlign, marginTop, fontSize }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={[containerStyle, { width, marginLeft, marginRight, marginTop }]}>
      <Text style={[labelStyle, { fontSize } ]}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCapitalize = 'none'
        placeholderTextColor='#ccc'
        autoCorrect={false}
        style={inputStyle}
        textAlign={textAlign}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#808080',
    backgroundColor: '#fff',
    fontSize: 18,
    lineHeight: 25,
    height: 35,
    paddingVertical: 0,
    paddingHorizontal: 5
  },
  labelStyle: {
    fontSize: 16,
    paddingBottom: 5
  },
  containerStyle: {

  }
};

export { Input };
