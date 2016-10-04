import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
  ListView,
  ScrollView,
  Navigator,
  View,
  Text,
  TextInput,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import CustomToolbarAndroid from './CustomToolbarAndroid';
import Icon from 'react-native-vector-icons/FontAwesome';
import RecordListViewAndroid from './RecordListViewAndroid';
import DatabaseManager from './DatabaseManager';
import styles from '../styles/Initial';

class LedgerViewAndroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.records,
      nav: this.props.navigator,
    };
  }
  render() {
    return(
        <View style={{flex: 1}}>
          <CustomToolbarAndroid
            style={styles.toolbar}
            icon={require('image!toolbar_icon')}
            navIcon={require('image!toolbar_icon')}
            title='ABC Notitie Blok'
            actions={[]}/>
          <View style={styles.container}>
            <RecordListViewAndroid dataSource={this.state.dataSource}/>
          </View>
          <ActionButton buttonColor="#42A5F5">
            <ActionButton.Item buttonColor="#FFC107" title="New" onPress={this._openForm.bind(this)}>
              <Icon name="rocket" size={30} style={{fontSize: 20, height: 22, color: 'white',}}/>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="camera" onPress={this._openCamera.bind(this)}>
              <Icon name="camera" size={30} style={{fontSize: 20, height: 22, color: 'white',}}/>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="login" onPress={this._login.bind(this)}>
              <Icon name="sign-in" size={30} style={{fontSize: 20, height: 22, color: 'white',}}/>
            </ActionButton.Item>
          </ActionButton>
        </View>
      );
  }

  _openCamera() {
    console.log("opening camera view");
    this.state.nav.push({
      id: 'camera',
      title: 'camera',
    });
  }

  _openForm() {
    this.state.nav.push({
      id: 'new',
      title: 'New Record',
    });
    DatabaseManager.loadAndQueryDB();
  }

  _login(){
    this.state.nav.push({
      id:'login',
      title:'Login'
    });
  }
};

module.exports = LedgerViewAndroid;
