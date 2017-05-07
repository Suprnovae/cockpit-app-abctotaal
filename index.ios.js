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
  constructor(props) {
    super(props);
    this.state = {
      refs: {}
    };
  }


  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS
          ref={ref => { this.state.refs.nav = ref; }}
          style={styles.container}
          initialRoute={{
            component: LoginViewIOS,
            title: I18n.t('Login'),
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
