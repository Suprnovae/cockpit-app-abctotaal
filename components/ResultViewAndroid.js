import React, {
  BackAndroid,
  Component,
  ListView,
  ScrollView,
  Navigator,
  View,
} from 'react-native';

import CustomToolbarAndroid from './CustomToolbarAndroid';
import results from '../data/results';
import SemiGaugeView from './SemiGaugeView';
import styles from '../styles/Gauge';
import LoginANDROID from './LoginANDROID';

// FIX: How do we get access to a store inside the components?
// Shouldn't use of Provider expose the store to all the components contained
// within the Provider or does it work differently for connected components?
const ResultViewAndroid = (props, x, y, z) => {
  let ds = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
  console.log('somethng');

  const renderer = (data, section, row, highlight) =>
    <SemiGaugeView result={data}/>
  // Use pagingEnabled prop on ScrollView to control horizontal scroll
  return(
    <View style={{flex: 1}}>
      <CustomToolbarAndroid
        style={styles.toolbar}
        icon={require('image!toolbar_icon')}
        navIcon={require('image!toolbar_icon')}
        title='Resultaat'
        actions={[
          { title: 'Profiel' }
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
          dataSource={ds.cloneWithRows(results.data)}
          renderRow={renderer}
        />
      </ScrollView>
    </View>
  );
};

export default ResultViewAndroid;
