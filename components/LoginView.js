import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import I18n from '../i18n/translations';

import styles from '../styles/LoginForm';
import { authenticate } from '.././actions';

import { connect } from 'react-redux';
import Button from './Button';

let mapStateToProps = function(state) {
  console.log("state is", state);
  return {
    handle: state.credentials ? state.credentials.handle : undefined,
    secret: state.credentials ? state.credentials.secret : undefined,
  }
};

let mapDispatchToProps = function(dispatch) {
  return {
    authenticate: (h, s) => dispatch(authenticate(h, s))
  }
};

const form = (props) =>
  <View>
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={I18n.t('Email')}
        placeholderTextColor="rgba(255,255,255,0.75)"
        keyboardType="email-address"
        selectionColor="white"
        style={styles.input}
        autoFocus={true}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(email) => this.email = email}
        returnKeyType="next"
        onSubmitEditing={() => this._passwordRef.focus()}
      />
    </View>
    <View style={styles.inputContainer}>
      <TextInput
        ref={(ref) => this._passwordRef = ref}
        placeholder={I18n.t('Password')}
        placeholderTextColor="rgba(255,255,255,0.75)"
        secureTextEntry={true}
        selectionColor="white"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(password) => this.password = password}
        returnKeyType={props.isSignup ? "next" : "go"}
        onSubmitEditing={() => props.isSignup ? this._passwordConfirmationRef.focus() : this.submitForm()}
      />
    </View>
    <View style={styles.loginButtonContainer}>
      <Button
        onPress={ () => {
          let pass = () => {
            console.log('passing on for', this.email);
            props.navigator.pop();
          };
          let fail = (e) => {
            console.log('authentication failed', e);
            Alert.alert(
              I18n.t('Invalid credentials'),
              I18n.t('Verify credentials, try again'),
              [{text: I18n.t('OK')}]
            );
          };
          props.authenticate(this.email, this.password).then(pass).catch(fail);
        } }
        textStyle={{fontSize: 14}}
        style={styles.loginButton} >
        { props.isSignup ? I18n.t('Sign Up') : I18n.t('Login') }
      </Button>
    </View>
  </View>;

export { form as default, mapStateToProps, mapDispatchToProps };
