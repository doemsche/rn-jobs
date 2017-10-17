import React, { Component } from 'react';
import { View, ScrollView, Text, Platform, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Review Jobs',
      headerRight: (
        <Button
          title="Settings"
          onPress={() => navigation.navigate('settings')}
          backgroundColor="rgba(0,0,0,0)"
          color="rgba(0,122,255,1)"
        />
      )
    };
  };
  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const {
        company,
        formattedRelativeTime,
        url,
        latitude,
        longitude,
        jobtitle,
        jobkey
      } = job;
      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };
      return (
        <Card key={jobkey} title={jobtitle}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              scrollEnabled={false}
              zoomEnabled={false}
              cacheEnabled={Platform.OS === 'android'}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title="Apply now"
              backgroundColor="#03a9F4"
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
      );
    });
  }
  render() {
    return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
  }
}

const styles = {
  detailWrapper: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
};

function mapStateToProps(state) {
  return {
    likedJobs: state.likedJobs
  };
}

export default connect(mapStateToProps, null)(ReviewScreen);
