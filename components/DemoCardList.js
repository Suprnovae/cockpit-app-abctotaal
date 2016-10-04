import React, { Component } from 'react';
import {
  ListView,
} from 'react-native';

import ListElementView from './ListElementView';

export default class DemoCardList extends Component {
  render() {
    return(
      <ListView
        dataSource={this.props.dataSource}
        renderRow={(rowData) => <ListElementView value={rowData} />} />
    );
  }
}
