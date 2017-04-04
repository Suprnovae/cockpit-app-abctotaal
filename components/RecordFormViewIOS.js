import React, { Component } from 'react';
import {
  DatePickerIOS,
  NavigatorIOS,
  ScrollView,
  Text,
  TextInput,
  ToolbarAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

var moment = require('moment');

import styles from '../styles/Initial';
import CameraViewIOS from '../components/CameraViewIOS';
import Collapsible from 'react-native-collapsible';

export default class RecordFormViewIOS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: this.props.records,
      nav: this.props.navigator,
      date: new Date(),
      showDatePicker: false,
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      collapsed: true
    };
  }

  _toggleExpanded() {
    this.setState({ collapsed: !this.state.collapsed});
    this.setState({showDatePicker: !this.state.showDatePicker});
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  render() {
    var showDatePicker = this.state.showDatePicker ?
            <DatePickerIOS
                okText='Ok'
                dismissText='Dismiss'
                date={this.state.date}
                onDateChange={this.onDateChange.bind(this)}
                timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                mode="datetime"/> : <View /> ;

    return(
      <ScrollView style={styles.list}>
        <View style={[styles.container]} >
          <View style={styles.priceblock}>
            <View style={styles.newrecordcurrency}>
              <TextInput
                style={{height:70, fontSize: 32, fontWeight: 'bold', color:'#2196F3', textAlign:'left'}}
                defaultValue='EUR' />
            </View>
            <View style={styles.newrecordprice}>
              <TextInput
                style={{height:90, fontSize: 54, fontWeight: 'bold', color:'#2196F3',textAlign:'right'}}
                keyboardType='numeric'
                placeholder='0.00' />
            </View>
          </View>

          <View style={styles.newrecordblock}>
            <View style={styles.newrecordleft}>
              <Text style={{height: 40,  fontSize: 16,}}>Description</Text>
            </View>
            <View style={styles.newrecordright}>
              <TextInput
                style={{height: 40}}
                placeholder='Enter description of record...' />
            </View>
          </View>

          <TouchableHighlight onPress={this._toggleExpanded.bind(this)}>
            <View style={styles.newrecordblock}>
              <View style={styles.newrecordleft}>
                <Text style={{height: 40,  fontSize: 16,}}>On</Text>
              </View>

              <View style={styles.newrecordright}>
                <Text style={styles.text}>{moment(this.state.date).format('LLL')}</Text>
              </View>
            </View>
          </TouchableHighlight>

          <Collapsible collapsed={this.state.collapsed} align="center">
            <View style={styles.datepicker}>{showDatePicker}</View>
          </Collapsible>

          <View style={styles.newrecordblock}>
            <View style={styles.categoryleft}>
              <Text style={{height: 40,  fontSize: 16,}}>Dot</Text>
            </View>
            <View style={styles.categoryright}>
              <Text style={{height: 40,  fontSize: 16,}}>Uncategorized</Text>
            </View>
            <View style={styles.newrecordicon}>
              <Text style={{height: 40,  fontSize: 16,}}>icon</Text>
            </View>
          </View>

          <View style={styles.newrecordblock}>
            <View style={styles.categoryleft}>
              <Text style={{height: 40,  fontSize: 16}}>icon</Text>
            </View>
            <View style={styles.categoryright}>
              <TouchableHighlight onPress={this.openCamera.bind(this)}>
                <Text style={{height: 40,  fontSize: 16}}>Add Scan</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  onDateChange(date) {
    this.setState({date: date});
  };

  openCamera() {
    this.props.navigator.push({
      title: "Camera",
      component: CameraViewIOS,
      rightButtonTitle: 'Cancel',
      onClick: () => {
        this.props.navigator.pop();
      }
    });
  }
}
