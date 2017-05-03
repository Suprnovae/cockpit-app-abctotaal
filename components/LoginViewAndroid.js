import React from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import I18n from '../i18n/translations';
import styles from '../styles/LoginForm';
import { connect } from 'react-redux';
import CustomToolbarAndroid from './CustomToolbarAndroid';
import LoginView, { mapStateToProps, mapDispatchToProps } from './LoginView';
console.log('LOGINVIEW', { LoginView, mapStateToProps, mapDispatchToProps });

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
      icon={source={'uri':'toolbar_icon'}}
      navIcon={source={'uri':'toolbar_icon'}}
      title={I18n.t('Login')}
      actions={[]}/>
    <View style={styles.container} accessibilityLabel="overview.android.parent">
      <ScrollView
        accessibilityLabel="overview.android"
        keyboardShouldPersistTaps={false}
        automaticallyAdjustContentInsets={true}
        alwaysBounceVertical={false}
        style={styles.scrollView} >
        <View style={styles.innerContainer}><LoginView {...props}/></View>
      </ScrollView>
    </View>
  </View>

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewAndroid);
