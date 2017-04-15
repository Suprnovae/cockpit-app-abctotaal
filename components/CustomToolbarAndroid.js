import React, { Component } from 'react';
import {
  AppRegistry,
  BackAndroid,
  ToolbarAndroid,
  ListView,
  ScrollView,
  Navigator,
  View,
  Text,
} from 'react-native';

import styles from '../styles/Initial';

export default class CustomToolbarAndroid extends Component {
  // Perhaps we should check props.icon and props.navIcon and default if
  // undefined
  render() {
    return(
        <ToolbarAndroid
          title={this.props.title}
          titleColor ='white'
          style={styles.toolbar}
          icon={source={'uri':'toolbar_icon'}}
          navIcon={source={'uri':'toolbar_icon'}}
          onActionSelected={this.props.onActionSelected}
          actions={this.props.actions} />

    );
  }
}
