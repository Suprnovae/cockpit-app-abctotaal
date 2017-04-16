// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
  Navigator,
} from 'react-native';
import I18n from './i18n/translations';

import LoginViewAndroid from './components/LoginViewAndroid';
import ResultViewAndroid from './components/ResultViewAndroid';
import styles, { colors } from './styles/Initial';

const actions = [
  {title: 'Settings', icon: {source:{'uri':'app_logo'}}, show: 'always'},
  {title: 'Boom', icon: {source:{'uri':'app_logo'}}, show: 'always'},
];

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { addRecord, getReport } from './actions';
import basicApp from './reducers';

// TODO: refactor to central file for both iOS and Android
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

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator && _navigator.getCurrentRoutes().length > 1) {
    console.log(_navigator.getCurrentRoutes());
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = (route, navigationOperations, onComponentRef) => {
  _navigator = navigationOperations;

  switch (route.id) {
  case 'overview':
    return(
      <ResultViewAndroid navigator={navigationOperations} />
    );
  case 'login':
    return(
      <LoginViewAndroid
        navigator={navigationOperations}
        route={route} {...this.props} />
    );
  }
};

class WinAdmCockpit extends Component {
  render() {
    return (
      <Provider store={store}>
      <Navigator
        initialRoute={{name: 'Overview', id:'overview', index: 0}}
        renderScene={RouteMapper}
      />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('suprnovae.cockpit.abctotaal', () => WinAdmCockpit);
