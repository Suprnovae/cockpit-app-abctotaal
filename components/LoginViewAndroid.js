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
import { connect } from 'react-redux';
import CustomToolbarAndroid from './CustomToolbarAndroid';
import form, { mapStateToProps, mapDispatchToProps } from './LoginView'
console.log({ form, mapStateToProps, mapDispatchToProps });

let LoginViewAndroid = props => container(props);
LoginViewAndroid.propTypes = {
  handle: React.PropTypes.string,
  secret: React.PropTypes.string,
  authenticate: React.PropTypes.func.isRequired,
};

const container = props =>
  <View style={{flex: 1}}>
    <CustomToolbarAndroid
      style={styles.toolbar}
      icon={require('image!toolbar_icon')}
      navIcon={require('image!toolbar_icon')}
      title={I18n.t('Login')}
      actions={[]}/>
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps={false}
        automaticallyAdjustContentInsets={true}
        alwaysBounceVertical={false}
        style={styles.scrollView} >
        <View style={styles.innerContainer}>{form(props)}</View>
      </ScrollView>
    </View>
  </View>

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewAndroid);
