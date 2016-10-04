import React, { Component } from 'react';
import {
  View,
  Image,
  ListView,
  Text,
} from 'react-native';

import { Card, Button } from 'react-native-material-design';

const styles = require('../styles/Initial');

export default class ListElementView extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Text style={styles.instructions}>{this.props.value}</Text>
        </Card.Body>
        <Card.Actions position="right">
          <Button value="Meer" text="Meer" />
        </Card.Actions>
      </Card>
    );
  }
}
