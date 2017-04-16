// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  NavigatorIOS,
  Text,
} from 'react-native';
import I18n from './i18n/translations';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { getReport } from './actions';
import basicApp from './reducers';
import styles, { colors } from './styles/Initial';

import LoginViewIOS from './components/LoginViewIOS';
import ResultViewIOS from './components/ResultViewIOS';

const initialState = {
  auth: {},
  records: [],
  overview: {
    content: [],
  },
};

const nativeImageSource = require('nativeImageSource');

const store = createStore(basicApp, initialState, applyMiddleware(thunk));
let unsubscribe = store.subscribe(() => {
  console.log("state changed to", store.getState());
});
store.dispatch(getReport());

class WinAdmCockpit extends Component {
  state: Object
  gotoAccount: Function

  constructor(props) {
    super(props);
    this.state = {
      refs: {}
    }

    this.gotoAccount = this.gotoAccount.bind(this)
  }

  gotoAccount() {
    console.log('goto account', this.state.refs.nav);
    this.state.refs.nav.push({
      title: "Login",
      component: LoginViewIOS,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS
          ref={ref => { this.state.refs.nav = ref }}
          style={styles.container}
          initialRoute={{
            component: ResultViewIOS,
            title: I18n.t('Overview'),
            //leftButtonIcon: require('image!NavBarButtonIcon'),
            rightButtonIcon: nativeImageSource({
              ios: 'NavBarButtonAccount',
              // http://facebook.github.io/react-native/docs/images.html#why-not-automatically-size-everything
              height: 0, // TODO: set height
              width: 0, // TODO: set width
            }),
            rightButtonTitle: I18n.t('Account'),
            onLeftButtonPress: () => {console.log('pressed');},
            onRightButtonPress: this.gotoAccount
          }}
          itemWrapperStyle={styles.ItemWrapper}
          tintColor={colors.tint}
          barTintColor={colors.background}
          titleTextColor={colors.title}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('WinAdmCockpit', () => WinAdmCockpit);
