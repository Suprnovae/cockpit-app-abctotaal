import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import styles from '../styles/Initial';

export default class RecordListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      record: this.props.record
    };
  }

  render() {
    var record = this.state.record;

    return(
      <View>
        <Text style={styles.leftColor}> </Text>
        <View style={styles.recordData}>
          <Text numberOfLines={1} style={styles.descriptionText}>{this.props.record.description}</Text>
          <Text style={styles.datetimeText}>{this.props.record.datetime}</Text>
        </View>
        <View style = {styles.price}>
          <Text style={styles.priceText}>{this.props.record.price.currency} {this.props.record.price.value}</Text>
        </View>
      </View>
    );
  }
}
