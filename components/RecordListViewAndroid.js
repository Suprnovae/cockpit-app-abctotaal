import React, { Component } from 'react';
import {
  ListView,
  ScrollView,
  Text,
} from 'react-native';

import ExtraDimensions from 'react-native-extra-dimensions-android';
import RecordListItem from './RecordListItem';
import styles from '../styles/Initial';

export default class RecordListViewAndroid extends Component {

  render() {
    const height = 400; //ExtraDimensions.get('REAL_WINDOW_HEIGHT'); //-(ExtraDimensions.get('STATUS_BAR_HEIGHT')+ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT'));
    const hSoftMenuBar = ExtraDimensions.get("SOFT_MENU_BAR_HEIGHT");
    const hStatusBar = ExtraDimensions.get("STATUS_BAR_HEIGHT");
    const hWindow = ExtraDimensions.get("REAL_WINDOW_HEIGHT");
    const hAvailable = hWindow-(hStatusBar+hSoftMenuBar+styles.toolbar.height);

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
