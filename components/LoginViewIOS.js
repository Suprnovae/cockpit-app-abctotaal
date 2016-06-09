import React, {
  Image,
  PropTypes,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import styles from '../styles/LoginForm';
import { authenticate } from '.././actions';

import { connect } from 'react-redux';
import Button from './Button';

const LoginViewIOS = (props) => container(props);

LoginViewIOS.propTypes = {
  handle: PropTypes.string,
  secret: PropTypes.string,
  authenticate: PropTypes.func.isRequired,
};

let mapStateToProps = function(state) {
  console.log("state is", state);
  return {
    handle: state.credentials ? state.credentials.handle : undefined,
    secret: state.credentials ? state.credentials.secret : undefined,
  }
};

let mapDispatchToProps = function(dispatch) {
  return {
    authenticate: (h, s, success, failure) => {
      return dispatch(authenticate(h, s, success, failure));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewIOS);

const footerText = (props) => {
  if(props.isSignup) {
    return <Text style={styles.footerText}>
      Already signed up? <Text style={styles.footerActionText}>Login.</Text>
    </Text>;
  } else {
    return <Text style={styles.footerText}>
      Don t have an account? <Text style={styles.footerActionText}>Sign Up.</Text>
    </Text>;
  }
}

const passwordConfirmationField = (props) => {
  if(props.isSignup) {
    return
      <View style={styles.inputContainer}>
        <TextInput
          ref={(ref) => this._passwordConfirmationRef = ref}
          placeholder="Password Confirmation"
          placeholderTextColor="rgba(255,255,255,0.75)"
          secureTextEntry={true}
          selectionColor="white"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(password) => this.passwordConfirmation = password}
          returnKeyType="go"
          onSubmitEditing={() => this.submitForm()} />
      </View>
  };
}

const form = (props) =>
  <View>
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Email"
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
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.75)"
        secureTextEntry={true}
        selectionColor="white"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(password) => this.password = password}
        returnKeyType={props.isSignup ? "next" : "go"}
      />
    </View>
    {passwordConfirmationField(props)}
    <View style={styles.loginButtonContainer}>
      <Button
        onPress={ () => {
          let pass = () => {
            props.navigator.pop();
            console.log("making something happen", this.email);
          };
          let fail = () => {
            console.log('shit');
          };
          props.authenticate(this.email, this.password, pass, fail);
        } }
        textStyle={{fontSize: 14}}
        style={styles.loginButton} >
        {props.isSignup ? "Sign Up" : "Login"}
      </Button>
    </View>
  </View>

//const dec = (props) =>
//  <Image source={require('image!NavBarButtonIcon')} style={styles.tpLogo} />
//  <Text style={styles.socialText}>Boekingen</Text>;

const container = (props, something, another, blah) => {
  const footer = null;
//  const footer = <TouchableOpacity style={styles.footer} activeOpacity={0.8} onPress={() => this.changeSignup()}>
//    {footerText(props)}
//  </TouchableOpacity>;

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps={false}
        automaticallyAdjustContentInsets={true}
        alwaysBounceVertical={false}
        style={styles.scrollView}>
        <View style={styles.innerContainer}>
          {null}
          {form(props)}
        </View>
        <View style={styles.horizontalLine} />
        {footer}
      </ScrollView>
    </View>
  );
};
