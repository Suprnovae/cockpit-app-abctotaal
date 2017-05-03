import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import styles from '../styles/LoginForm';
import { connect } from 'react-redux';
import LoginView, { mapStateToProps, mapDispatchToProps } from './LoginView';
console.log('LOGINVIEW', { LoginView, mapStateToProps, mapDispatchToProps });

let LoginViewIOS = props => container(props);
LoginViewIOS.propTypes = {
  handle: React.PropTypes.string,
  secret: React.PropTypes.string,
  authenticate: React.PropTypes.func.isRequired,
};

const container = props =>
  <View style={styles.container} accessiblityLabel="overview.ios.parent">
    <ScrollView
      accessibilityLabel="overview.ios"
      keyboardShouldPersistTaps={true}
      automaticallyAdjustContentInsets={true}
      alwaysBounceVertical={false}
      style={styles.scrollView}>
      <View style={styles.innerContainer}><LoginView {...props}/></View>
    </ScrollView>
  </View>

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewIOS);
