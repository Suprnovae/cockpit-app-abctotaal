/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Animate,
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
  Text,
  ListView,
} from 'react-native';

import ResultViewIOS from './components/ResultViewIOS';
import CameraViewIOS from './components/CameraViewIOS';
import RecordFormViewIOS from './components/RecordFormViewIOS';
import RecordListViewIOS from './components/RecordListViewIOS';
import RecordListIOS from './containers/RecordListIOS';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { addRecord, getReport } from './actions';
import basicApp from './reducers';
import DatabaseManager from './components/DatabaseManager';
import styles, { colors } from './styles/Initial';
import MockData from './data/records';

import LoginViewIOS from './components/LoginViewIOS';

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
    var titles = [
      'something happening',
      'talk to the President',
      'something something darkside',
      'make some music',
      'share some love',
      'give a stranger a hug',
      'send mom flowers',
    ];
    var price = Math.floor(Math.random()*200);
    var title = titles[Math.floor(Math.random()*titles.length)];

    // Just an example of how to start the "new record" view
    /*
    this.refs.nav.navigator.push({
        title: "New Record", // "Camera",
        component: RecordFormViewIOS, //CameraViewIOS,
        rightButtonTitle: 'Save',
        onRightButtonPress: () => {
            this.refs.nav.navigator.pop();
        }
    });
    */
    // See components/DatabaseManager.js for implementation. This should become
    // part of the Redux store
    DatabaseManager.loadAndQueryDB();
    // example of a call to the Redux store to add a new record, this should be
    // called as a result of the save operation at the "new record" form
    store.dispatch(addRecord(price, 'XTS', title));

    this.refs.nav.navigator.push({
      title: "Login",//"New Record", // "Camera",
      component: LoginViewIOS,//RecordFormViewIOS, //CameraViewIOS,
      /*
      rightButtonTitle: 'Cancel',
      onRightButtonPress: () => {
        this.refs.nav.navigator.pop();
      }
      */
    });
  }

  render() {
    console.log("WinAdm Cockpit");
    // FIX: Figure out why rowHasChanged is never fired. Somehow we append the
    // dataset and perform the cloneWithRows inside components/RecordListViewIOS
    // but the rowHasChanged check is never executed.
    let ds = new ListView.DataSource({rowHasChanged: function (r1, r2) {
      console.log("rowHasChanged", r1, r2);
      return true; //(r1 !== r2);
    }});
    return (
      <Provider store={store}>
        <NavigatorIOS
          ref="nav"
          style={styles.container}
          initialRoute={{
            component: ResultViewIOS,
            passProps: { ds: ds },
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
