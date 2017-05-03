import React from 'react';
import {
  BackAndroid,
  ListView,
  ScrollView,
  View,
} from 'react-native';

import { connect } from 'react-redux';

import styles from '../styles/Gauge';
import CustomToolbarAndroid from './CustomToolbarAndroid';
import LoginViewAndroid from './LoginViewAndroid';
import SemiGaugeView from './SemiGaugeView';
import I18n from './../i18n/translations';

const ResultViewAndroid = (props, x, y, z) => {
  let ds = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});

  const renderer = (data, section, row, highlight) =>
    <SemiGaugeView result={data}/>
  // Use pagingEnabled prop on ScrollView to control horizontal scroll
  return(
    <View style={{flex: 1}}>
      <CustomToolbarAndroid
        style={styles.toolbar}
        icon={source={'uri':'toolbar_icon'}}
        navIcon={source={'uri':'toolbar_icon'}}
        title={I18n.t('Overview')}
        actions={[
          { title: I18n.t('Profile') }
        ]}
        onActionSelected={(i) => {
          console.log('navigator', props.navigator);
          props.navigator.push({
            id: 'login',
            title: 'Login',
          });
          console.log('selected ', i);
        }}
        />
      <ScrollView style={styles.list}
        bounces={true}
        indicatorStyle={'white'} >
        <ListView
          enableEmptySections={true}
          dataSource={ds.cloneWithRows(props.overview.content)}
          renderRow={renderer}
        />
      </ScrollView>
    </View>
  );
};

let mapStateToProps = function(state) {
  console.log('state', state);
  return {
    overview: state.overview,
  };
};

export default connect(mapStateToProps)(ResultViewAndroid);
