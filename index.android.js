/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  BackAndroid,
  Component,
  ListView,
  ScrollView,
  Navigator,
  View,
  Text,
  TextInput,
} from 'react-native';

import CameraViewAndroid from './components/CameraViewAndroid';
import LedgerViewAndroid from './components/LedgerViewAndroid';
import RecordFormViewAndroid from './components/RecordFormViewAndroid';
import ResultViewAndroid from './components/ResultViewAndroid';
import styles, { colors } from './styles/Initial';
import MockData from './data/records';

import LoginViewAndroid from './components/LoginViewAndroid';

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
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(MockData.records),
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{name: 'Resultaat', id:'overview' ,index: 0}}
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
    case 'ledger':
      return(
        <LedgerViewAndroid
          navigator={navigator}
          records={this.state.dataSource} />
      );
    case 'new':
      return (
        <RecordFormViewAndroid
          navigator={navigator} />
      );
    case 'camera':
      return (
        <CameraViewAndroid
          navigator={navigator}
          route={route} {...this.props} />
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
