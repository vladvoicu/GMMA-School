import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CardSection, Button, Card } from '../common';
const AnalysisDetail = ({ analysis, navigation }) => {
  const { Type, ForProperty, AnalysisId } = analysis;

  return (
    <Card>
      <CardSection>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('AnalysisReport', { id: { AnalysisId }})}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.textStyle}>{Type.toUpperCase()} - {ForProperty}</Text>
              <Image
                style={styles.iconStyle}
                source={require('../../assets/forwardIcon.png')}
              />
            </View>
          </TouchableOpacity>
      </CardSection>
    </Card>
  );
};
const styles = {
  textStyle: {
    fontSize: 18,
    color: '#808080',
    fontWeight: '400'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    //marginLeft: 5,
    //marginRight: 5
  },
  iconStyle: {
    height: 15,
    width: 15,
    tintColor: '#999',
    marginTop: 5.5
  }
};
export default AnalysisDetail;
