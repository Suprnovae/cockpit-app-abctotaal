import React, {
  Component,
  ListView,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles/Gauge';
import SemiGaugeView from './SemiGaugeView';

const ResultViewIOS = (props, x, y, z) => {
  let ds = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
  console.log('props', props);

  const renderer = (data, _) => <SemiGaugeView result={data} />

  // TODO: Use pagingEnabled prop on ScrollView to control horizontal scroll

  console.log('overview:', props.overview);
  return(
    <ScrollView style={styles.list}
      bounces={true}
      indicatorStyle={'white'} >
      <ListView
        enableEmptySections={true}
        dataSource={ds.cloneWithRows(props.overview.content)}
        renderRow={renderer}
      />
    </ScrollView>
  );
}

let mapStateToProps = function(state) {
  console.log('state', state);
  return {
    overview: state.overview
  };
};

export default connect(mapStateToProps)(ResultViewIOS);
