import React, { Component } from 'react';
import {
  DatePickerAndroid,
  ScrollView,
  Text,
  TextInput,
  TimePickerAndroid
  ToolbarAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';


var moment = require('moment');

import ActionButton from 'react-native-action-button';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomToolbarAndroid from './CustomToolbarAndroid';
import styles from '../styles/Initial';

export default class RecordFormViewAndroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: this.props.records,
      nav: this.props.navigator,
      date: new Date(2020, 4, 25),
      isoFormatHour:14,
      isoFormatMinute:30
    };
  }

  async showDatePicker(stateKey, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      } else {
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = date.toLocaleDateString();
        newState[stateKey + 'Date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  async showTimePicker(stateKey, options) {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      var newState = {};
      if (action === TimePickerAndroid.timeSetAction) {
        newState[stateKey + 'Text'] = this._formatTime(hour, minute);
        newState[stateKey + 'Hour'] = hour;
        newState[stateKey + 'Minute'] = minute;
      } else if (action === TimePickerAndroid.dismissedAction) {
        newState[stateKey + 'Text'] = 'dismissed';
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }

  _formatTime(hour, minute) {
    return hour + ':' + (minute < 10 ? '0' + minute : minute);
  }

  render() {
    const toolbarActions = [
      {title: 'Save', show: 'always'},
    ];

    let hSoftMenuBar = ExtraDimensions.get("SOFT_MENU_BAR_HEIGHT");
    let hStatusBar = ExtraDimensions.get("STATUS_BAR_HEIGHT");
    let hWindow = ExtraDimensions.get("REAL_WINDOW_HEIGHT");
    let paddingTop = 168+56; // styles.{priceblockAndroid, toolbar}.height
    let offset = hWindow-(paddingTop+hStatusBar+hSoftMenuBar);

    return(
      <View style={{flex: 1}}>
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title='New Record'
          navIconName='close'
          actions={[
          { title: 'Save', iconName: 'check', iconColor: 'white', show: 'always' },
          ]}/>

        <View>
          <View style={styles.priceblockAndroid}>
            <View style={styles.newrecordcurrencyAndroid}>
              <TextInput
                style={{height:70, fontSize: 32, fontWeight: 'bold', color:'#2196F3', textAlign:'left'}}
                underlineColorAndroid='#4A4A4A'
                defaultValue='USD'/>
            </View>

            <View style={styles.newrecordprice}>
              <TextInput
                style={{height:90, fontSize: 54, fontWeight: 'bold', color:'#2196F3',textAlign:'right'}}
                keyboardType='numeric'
                underlineColorAndroid='#4A4A4A'
                placeholder='0.00' />
            </View>
          </View>

          <View style={styles.newrecordblockAndroid}>
            <View style={styles.descriptionAndroid}>
              <TextInput
                style={{height: 40, fontSize: 16, textAlign:'left'}}
                underlineColorAndroid='white'
                placeholder='Enter description of record...' />
            </View>
          </View>

          <View style={styles.newrecordblockAndroid}>
            <View style={styles.categoryleft}>
              <Text style={{height: 40,  fontSize: 16, textAlign:'center', marginTop:5}}>ico</Text>
            </View>
            <View style={styles.categoryright}>
              <TouchableWithoutFeedback
                onPress={this.showDatePicker.bind(this, 'simple', {date: this.state.simpleDate})}>
                <Text style={{ color:'black', fontSize: 16, textAlign:'left', marginTop:5}}>{moment(this.state.simpleDate).format('ddd, ll')}</Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.timepicker}>
              <TouchableWithoutFeedback
                onPress={this.showTimePicker.bind(this, 'isoFormat', {
                  hour: this.state.isoFormatHour,
                  minute: this.state.isoFormatMinute,
                  is24Hour: true,
                })}>
                <Text style={{color:'black', height: 40,  fontSize: 16, textAlign:'right', marginTop:5}}>{this.state.isoFormatHour}:{this.state.isoFormatMinute}</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={styles.newrecordblockAndroid}>
            <View style={styles.categoryleft}>
              <Text style={{height: 40,  fontSize: 16, textAlign:'center', marginTop:5}}>Dot</Text>
            </View>
            <View style={styles.categoryright}>
              <Text style={{height: 40,  fontSize: 16, color:'gray', marginTop:5}}>Uncategorized</Text>
            </View>
          </View>
        </View>

        <ActionButton
          buttonColor="#42A5F5"
          offsetY={offset-28}
          onPress={this._openCamera.bind(this)}
          icon={<Icon name="camera" size={30} style={{fontSize: 20, height: 22, color: 'white',}}/>}
        />
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
}
