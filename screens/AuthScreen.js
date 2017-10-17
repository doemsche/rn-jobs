import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
//fb app id: 127363224583934
class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();

    this.onAuthCompletet(this.props);
  }

  onAuthCompletet(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('i am here');
    this.onAuthCompletet(nextProps);
  }

  render() {
    return <View />;
  }
}

const mapStateToProps = ({ auth }) => {
  console.log(auth);
  return { token: auth.token };
};

export default connect(mapStateToProps, actions)(AuthScreen);
