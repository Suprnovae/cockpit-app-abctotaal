import React, {
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
