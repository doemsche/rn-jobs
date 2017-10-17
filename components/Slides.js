import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
  renderSlides() {
    return this.props.data.map((slide, idx) => {
      return (
        <View
          style={[styles.slideStyle, { backgroundColor: slide.color }]}
          key={slide.text}
        >
          <Text style={styles.textStyle}>{slide.text}</Text>
          {this.renderLastSlide(idx)}
        </View>
      );
    });
  }
  renderLastSlide(idx) {
    if (idx === this.props.data.length - 1) {
      return (
        <Button
          onPress={this.props.onComplete}
          buttonStyle={styles.buttonStyle}
          title="Onwards!"
          raised
        />
      );
    }
  }
  render() {
    return (
      <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  textStyle: {
    fontSize: 30,
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15
  }
};

export default Slides;
