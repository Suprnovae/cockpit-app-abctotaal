// @flow
import React, {
  AppRegistry,
  BackAndroid,
  Component,
  Navigator,
} from 'react-native';

import LoginViewAndroid from './components/LoginViewAndroid';
import ResultViewAndroid from './components/ResultViewAndroid';
import styles, { colors } from './styles/Initial';

const actions = [
  {title: 'Settings', icon: require('image!app_logo'), show: 'always'},
  {title: 'Boom', icon: require('image!app_logo'), show: 'always'},
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

class WinAdmCockpit extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{name: 'Resultaat', id:'overview', index: 0}}
          renderScene={this.renderScene.bind(this)}
          configureScene={route => (
            route.sceneConfig || Navigator.SceneConfigs.HorizontalSwipeJump
          )}
          ref="navigator"/>
      </Provider>
    );
  }

  renderScene(route, navigator) {
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if(navigator && navigator.getCurrentRoutes().length > 1) {
        console.log(navigator.getCurrentRoutes());
        navigator.pop();
        return true;
      }
      return false;
    });

    switch (route.id) {
    case 'overview':
      return(
        <ResultViewAndroid
          navigator={navigator} />
      );
    case 'login':
      return (
        <LoginViewAndroid
          navigator={navigator}
          route={route} {...this.props} />
      );
    }
  }
}

AppRegistry.registerComponent('WinAdm Cockpit', () => WinAdmCockpit);
