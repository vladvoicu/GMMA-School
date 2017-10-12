import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Section } from './Section';
import { Card, Button, XHeader } from '../common';

class Menu extends Component {
  static navigationOptions = {
    header: null
  }

  state = { width: 0, height: 0 };

  onLayout = (e) => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  }

  renderContent() {
    const { contentStyle, cardContainerStyle, greyBarStyle, textStyle } = styles;
    const { navigate } = this.props.navigator;

    if (this.state.width > this.state.height) {
      return (
        <ScrollView>
          <View style={contentStyle}>
            <View style={cardContainerStyle}>
              <Card>
                <Section>
                  <Button textStyle={textStyle} onPress={() => navigate('Dashboard')}>
                    <Text>My Dashboard</Text>
                  </Button>
                </Section>
                <Section>
                  <Button textStyle={textStyle} onPress={() => navigate('Portfolio')}>
                    <Text>My Portfolio</Text>
                  </Button>
                </Section>
                <Section>
                  <Button textStyle={textStyle} onPress={() => navigate('Analysis')}>
                    <Text>Analysis</Text>
                  </Button>
                </Section>
                <Section>
                  <Button textStyle={textStyle}>
                    <Text>Mortgage Calculator</Text>
                  </Button>
                </Section>
                <Section>
                  <Button textStyle={textStyle}>
                    <Text>Mortgages</Text>
                  </Button>
                </Section>
                <Section>
                  <Button textStyle={textStyle}>
                    <Text>About</Text>
                  </Button>
                </Section>
                <Section>
                  <Button textStyle={textStyle}>
                    <Text>Settings</Text>
                  </Button>
                </Section>
              </Card>
            </View>
            <View style={greyBarStyle} />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={contentStyle}>
          <View style={cardContainerStyle}>
            <Card>
              <Section>
                <Button textStyle={textStyle} onPress={() => navigate('Dashboard')}>
                  <Text>My Dashboard</Text>
                </Button>
              </Section>
              <Section>
                <Button textStyle={textStyle} onPress={() => navigate('Portfolio')}>
                  <Text>My Portfolio</Text>
                </Button>
              </Section>
              <Section>
                <Button textStyle={textStyle} onPress={() => navigate('Analysis')}>
                  <Text>Analysis</Text>
                </Button>
              </Section>
              <Section>
                <Button textStyle={textStyle}>
                  <Text>Mortgage Calculator</Text>
                </Button>
              </Section>
              <Section>
                <Button textStyle={textStyle}>
                  <Text>Mortgages</Text>
                </Button>
              </Section>
              <Section>
                <Button textStyle={textStyle}>
                  <Text>About</Text>
                </Button>
              </Section>
              <Section>
                <Button textStyle={textStyle}>
                  <Text>Settings</Text>
                </Button>
              </Section>
            </Card>
          </View>
          <View style={greyBarStyle} />
        </View>
      );
    }
  }

  render() {
    return (
      <View onLayout={this.onLayout} style={styles.containerStyle}>
        <XHeader headerText="Menu" onPress={() => { this.props.buttonPressed(true); }} />
        {this.renderContent()}
      </View>
    );
  }
}

  const styles = {
    containerStyle: {
      flex: 1,
      backgroundColor: '#fafafa'
    },
    contentStyle: {
      flex: 1,
      flexDirection: 'row'
    },
    cardContainerStyle: {
      flex: 7,
      backgroundColor: '#fafafa'
    },
    greyBarStyle: {
      flex: 1,
      backgroundColor: '#ccc'
    },
    textStyle: {
      backgroundColor: '#fafafa',
      fontSize: 18
    },
  };

export default Menu;
