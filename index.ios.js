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

const store = createStore(basicApp, initialState, applyMiddleware(thunk));
let unsubscribe = store.subscribe(() => {
  console.log("state changed to", store.getState());
});
store.dispatch(getReport());

class WinAdmCockpit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refs: {}
    }

    this.account = this.account.bind(this)
  }

  account() {
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
            rightButtonIcon: require('image!NavBarButtonAccount'),
            rightButtonTitle: I18n.t('Account'),
            onLeftButtonPress: () => {console.log('pressed');},
            onRightButtonPress: this.account
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
