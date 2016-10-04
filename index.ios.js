// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  NavigatorIOS,
  Text,
} from 'react-native';

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
  rightButtonPress() {
    this.refs.nav.navigator.push({
      title: "Login",
      component: LoginViewIOS,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <NavigatorIOS
          ref="nav"
          style={styles.container}
          initialRoute={{
            component: ResultViewIOS,
            title: 'Resultaat',
            //leftButtonIcon: require('image!NavBarButtonIcon'),
            rightButtonIcon: require('image!NavBarButtonAccount'),
            onLeftButtonPress: () => {console.log('pressed');},
            onRightButtonPress:this.rightButtonPress.bind(this)
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

AppRegistry.registerComponent('WinAdm Cockpit', () => WinAdmCockpit);
