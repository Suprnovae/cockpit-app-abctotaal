import React from 'react';
import {
  Alert,
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

export const mapStateToProps = function(state) {
  console.log("state is", state);
  return {
    handle: state.credentials ? state.credentials.handle : undefined,
    secret: state.credentials ? state.credentials.secret : undefined,
  }
};

export const mapDispatchToProps = function(dispatch) {
  return {
    authenticate: (h, s) => dispatch(authenticate(h, s))
  }
};

export default class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      refs: {}
    }
    console.log('this.state', this.state);

    // binding to this
    // https://facebook.github.io/react/docs/reusable-components.html#autobinding
    this.login = this.login.bind(this)
  }

  login() {
    const email = this.state.email, password = this.state.password;

    let pass = () => {
      console.log('passing on for', email);
      this.props.navigator.pop();
    };

    let fail = (e) => {
      console.log('authentication failed', e);
      Alert.alert(
        I18n.t('Invalid credentials'),
        I18n.t('Verify credentials, try again'),
        [{text: I18n.t('OK')}]
      );
    };

    this.props.authenticate(email, password).then(pass).catch(fail);
  }

  render() {
    return(
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={ref => { this.state.refs.handle = ref }}
            placeholder={I18n.t('Email')}
            placeholderTextColor="rgba(255,255,255,0.75)"
            keyboardType="email-address"
            selectionColor="white"
            accessibilityLabel={I18n.t('Email')}
            style={styles.input}
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={email => this.setState({email})}
            returnKeyType="next"
            onSubmitEditing={_ => this.state.refs.secret.focus()}
          />
        </View>
        <View style={styles.inputContainer} onResponderMove={i => console.log('parent', i)}>
          <TextInput
            ref={ref => { this.state.refs.secret = ref }}
            placeholder={I18n.t('Password')}
            placeholderTextColor="rgba(255,255,255,0.75)"
            secureTextEntry={true}
            selectionColor="white"
            accessibilityLabel={I18n.t('Password')}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={password => this.setState({password})}
            onResponderMove={i => console.log('child', i)}
            onStartShouldSetResponderCapture={i => console.log('start', i)}
            returnKeyType={"go"}
            onSubmitEditing={this.login}
          />
        </View>
        <View style={styles.loginButtonContainer}>
          <Button
            accessibilityLabel={I18n.t('Login')}
            onPress={this.login}
            textStyle={{fontSize: 14}}
            style={styles.loginButton} >
            { this.props.isSignup ? I18n.t('Sign Up') : I18n.t('Login') }
          </Button>
        </View>
      </View>
    );
  }
}
