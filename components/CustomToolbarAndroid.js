import React, {
  AppRegistry,
  BackAndroid,
  Component,
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
          icon={require('image!toolbar_icon')}
          navIcon={require('image!toolbar_icon')}
          onActionSelected={this.props.onActionSelected}
          actions={this.props.actions} />

    );
  }
}
