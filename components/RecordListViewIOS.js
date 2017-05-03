import React, { Component } from 'react';
import {
  ListView,
  PropTypes,
  ScrollView,
  Text,
} from 'react-native';

import RecordListItem from './RecordListItem';
import styles from '../styles/Initial';

// FIX: How do we get access to a store inside the components?
// Shouldn't use of Provider expose the store to all the components contained
// within the Provider or does it work differently for connected components?
const RecordListViewIOS = (props, x, y, z) => {
  var renderRecord = (rowData, sectionID, rowID, highlightRow) => {
    console.log("record", rowData);
    return (
      <RecordListItem record={rowData} />
    );
  };
  console.log("record list", props.records);
  return(
    <ScrollView style={styles.list}>
      <ListView
        dataSource={props.ds.cloneWithRows(props.records)}
        renderRow = {renderRecord}
        style = {styles.ListView}
      ></ListView>
    </ScrollView>
  );
};

RecordListViewIOS.propTypes = {
  records: PropTypes.array.isRequired,
  ds: PropTypes.object.isRequired,
};

export default RecordListViewIOS;
