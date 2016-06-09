import React, {
  Dimensions,
  Image,
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import styles from '../styles/LoginForm';
import { authenticate } from '.././actions';

import { connect } from 'react-redux';
import Button from './Button';
import CustomToolbarAndroid from './CustomToolbarAndroid';

const LoginViewAndroid = (props) => container(props);

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height -80;

LoginViewAndroid.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewAndroid);

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
};

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
  }
};
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
        onSubmitEditing={() => props.isSignup ? this._passwordConfirmationRef.focus() : this.submitForm()}
      />
    </View>
    {passwordConfirmationField(props)}
    <View style={styles.loginButtonContainer}>
      <Button
        onPress={ () => {
          let pass = () => {
            console.log('passing on for', this.email);
            props.navigator.pop();
          };
          let fail = () => {
            console.log('shit');
          };
          props.authenticate(this.email, this.password, pass, fail);
        } }
        textStyle={{fontSize: 14}}
        style={styles.loginButton}
      >
        {props.isSignup ? "Sign Up" : "Login"}
      </Button>
    </View>
  </View>;

const container = (props) => {
  return (
    <View style={{flex: 1}}>
      <CustomToolbarAndroid
        style={styles.toolbar}
        icon={require('image!toolbar_icon')}
        navIcon={require('image!toolbar_icon')}
        title='Login'
        actions={[]}/>
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={false}
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false}
          style={styles.scrollView} >
          <View style={styles.innerContainer}>
            {form(props)}
          </View>
          <View style={styles.horizontalLine} />
        </ScrollView>
      </View>
    </View>
  );
  /*
  renderForm() {
    return (
    );
  }

  submitForm() {
    if (this.state.isSignup) {
      if (!this.email || !this.password || !this.passwordConfirmation)
        return console.error("Missing input fields");
      if (this.password !== this.passwordConfirmation)
        return console.error("Passwords don't match");

      console.error("signup");
    } else {
      console.error("login");
    }
  }

  changeSignup() {
    this.setState({ isSignup: !this.state.isSignup });
  }
  */
};
