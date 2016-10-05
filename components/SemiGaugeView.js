import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import I18n from 'react-native-i18n';

import styles from '../styles/Gauge';

// p = 10, c = 8
//   c/p=8/10=10/10-2/10
// p = 10, c = 12
//   c/p=12/10=10/10+2/10

class SemiGaugeView extends Component {
  constructor(props) {
    super(props);
    let result = props.result;
    let achieved = result.actual/(result.predicted);
    console.log(result.actual,'/',result.predicted,'=', achieved);
    if(achieved < 0) { achieved = 0; }
    if(achieved > 2) { achieved = 2; }

    this.state = {
      _pointerLevel: achieved,
      _visorLevel: 1,
      _pointerLevelAnim: new Animated.Value(0),
      _visorLevelAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state._pointerLevelAnim, {toValue: this.state._pointerLevel}).start();
    Animated.timing(this.state._visorLevelAnim, {toValue: this.state._visorLevel}).start();
  }

  render() {
    let profile = {
      inputRange: [0, 2],
      outputRange: ['-75deg', '75deg'],
    };

    let changePointerRotation = this.state._pointerLevelAnim.interpolate(profile);
    let changeVisorRotation = this.state._visorLevelAnim.interpolate(profile);

    let changeColor = this.state._pointerLevelAnim.interpolate({
      inputRange: [0, 50, 100],
      outputRange: ['rgb(241, 28, 64)', 'rgb(116, 240, 67)' ,'rgb(52, 168, 249)'],
    });

    let format = x => I18n.toCurrency(x, {
      unit: '€',
      delimiter: '.',
      separator: ','
    });

    let result = this.props.result;
    //let style = [styles.tab, styles.diff, {borderColor: changeColor}];
    let style = [styles.tab, styles.diff];
    let tags = result.tablets.map(
      (obj, key) => {
        if (obj.value === undefined) {
          return <Text key={key} style={style}>{obj.text}</Text>
        } else {
          return <Text key={key} style={style}>{format(obj.value)}</Text>
        }
      }
    );

    return(
      <View style={styles.container}>
        <Text style={styles.title}>{result.description}</Text>
        <Text style={styles.value}>{format(result.actual)}</Text>
        <View style={[styles.tabs, {width: Dimensions.get('window').width}]}>
          {tags}
        </View>
        <View style={styles.gauge}>
          <Image source={require('../img/bow.png')} style={styles.rainbow} />
          <Animated.Image source={require('../img/dial.png')} style={[styles.dial, { transform: [ { rotate: changePointerRotation, } ] }]} />
          <Animated.Image source={require('../img/loop.png')} style={[styles.loop, { transform: [ { rotate: changeVisorRotation, } ] }]} />
        </View>
      </View>
    );
  }
}

export default SemiGaugeView;

