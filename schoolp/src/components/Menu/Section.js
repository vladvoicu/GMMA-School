import React from 'react';
import { View } from 'react-native';

const Section = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 0.5,
    paddingLeft: 25,
    paddingBottom: 15,
    paddingTop: 15,
    backgroundColor: '#fafafa',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ccc',
    position: 'relative'
  }
};

export { Section };
