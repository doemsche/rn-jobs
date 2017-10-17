import { AsyncStorage } from 'react-native';
import { FB_LOGIN_SUCCESS, FB_LOGIN_FAIL } from './types';
import { Facebook } from 'expo';

//AsyncStorage <=> LocalStoarge
//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token', token);
//AsyncStorage returns a promise!!

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    console.log(token);
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let {
    type,
    token
  } = await Facebook.logInWithReadPermissionsAsync('127363224583934', {
    permissions: ['public_profile']
  });
  if (type === 'cancel') {
    return dispatch({ type: FB_LOGIN_FAIL });
  }
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
};
