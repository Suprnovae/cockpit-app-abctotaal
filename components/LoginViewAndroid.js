import React, {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import CustomToolbarAndroid from './CustomToolbarAndroid';

import Button from './Button';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height -80;

const styles = StyleSheet.create({
  loginButtonContainer: {
    marginTop: 5,
    width: windowWidth * 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    width: windowWidth * 0.8,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.25)"
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(42, 55, 68)"
  },
  scrollView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "rgb(42, 55, 68)",
    overflow: "visible"
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "rgb(42, 55, 68)"
  },
  inputContainer: {
    width: windowWidth * 0.8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "rgba(255,255,255,0.75)",
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "rgb(42, 55, 68)",
    color: "white",
    fontSize: 16,
    padding: 5
  },
  tpLogo: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    tintColor: "rgb(130, 181, 65)"
  },
  socialText: {
    color: "white",
    fontSize: 30,
    marginTop: 8,
    fontWeight: "600",
    marginBottom: 15
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    marginTop: 2,
    marginHorizontal: 10,
    backgroundColor: "rgba(255,255,255, 0.2)"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.5)"
  },
  footerText: {
    color: "white",
    fontSize: 14
  },
  footerActionText: {
    fontWeight: "600"
  }
});

export default class LoginViewAndroid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSignup: false };

    this.email = null;
    this.password = null;
    this.passwordConfirmation = null;
  }

  componentDidMount() {

  }

  render() {
    let footerText = this.state.isSignup ? (
      <Text style={styles.footerText}>
        Already signed up? <Text style={styles.footerActionText}>Login.</Text>
      </Text>
    ) : (
      <Text style={styles.footerText}>
        Don t have an account? <Text style={styles.footerActionText}>Sign Up.</Text>
      </Text>
    );

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
            ref="scrollView"
            keyboardShouldPersistTaps={false}
            automaticallyAdjustContentInsets={true}
            alwaysBounceVertical={false}
            style={styles.scrollView} >
            <View style={styles.innerContainer}>
              {this.renderForm()}
            </View>
            <View style={styles.horizontalLine} />
          </ScrollView>
        </View>
      </View>
    );
  }

  renderForm() {
    let passwordConfirmationField = this.state.isSignup ? (
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
          onSubmitEditing={() => this.submitForm()}
        />
      </View>
    ) : null;

    return (
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
            returnKeyType={this.state.isSignup ? "next" : "go"}
            onSubmitEditing={() => this.state.isSignup ? this._passwordConfirmationRef.focus() : this.submitForm()}
          />
        </View>
        {passwordConfirmationField}
        <View style={styles.loginButtonContainer}>
          <Button
            onPress={() => this.submitForm()}
            textStyle={{fontSize: 14}}
            style={styles.loginButton}
          >
            {this.state.isSignup ? "Sign Up" : "Login"}
          </Button>
        </View>
      </View>
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

}
