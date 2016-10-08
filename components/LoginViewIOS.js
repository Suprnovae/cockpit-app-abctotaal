import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles/LoginForm';
import { connect } from 'react-redux';
import form, { mapStateToProps, mapDispatchToProps } from './LoginView'
console.log({ form, mapStateToProps, mapDispatchToProps });

let LoginViewIOS = props => container(props);
LoginViewIOS.propTypes = {
  handle: React.PropTypes.string,
  secret: React.PropTypes.string,
  authenticate: React.PropTypes.func.isRequired,
};

const container = props =>
  <View style={styles.container}>
    <ScrollView
      keyboardShouldPersistTaps={false}
      automaticallyAdjustContentInsets={true}
      alwaysBounceVertical={false}
      style={styles.scrollView}>
      <View style={styles.innerContainer}>{form(props)}</View>
    </ScrollView>
  </View>

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewIOS);
