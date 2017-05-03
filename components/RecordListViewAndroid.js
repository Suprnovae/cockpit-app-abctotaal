import React, { Component } from 'react';
import {
  ListView,
  NativeModules,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import DisplayAndroid from NativeModules.DisplayAndroid;

import RecordListItem from './RecordListItem';
import styles from '../styles/Initial';

export default class RecordListViewAndroid extends Component {

  render() {
    const hStatusBar = StatusBar.currentHeight;
    const height = await DisplayAndroid.getHeight();
    const hAvailable = height - hStatusBar;
    console.log(`height is ${height}`);

    return(
      <ScrollView style={{height: hAvailable}}>
        <ListView
          dataSource={this.props.dataSource}
          renderRow = {this.renderRecord}
          style = {styles.ListView}
        ></ListView>
      </ScrollView>
    );
  }

  renderRecord(dataSource) {
    return(
      <RecordListItem record={dataSource} />
    );
  }
}
