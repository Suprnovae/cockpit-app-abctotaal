import React from 'react';
import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgb(74, 74, 74)',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  gauge: {
    width: 260,
    height: 125,
    bottom: 0,
  },
  rainbow: {
    margin: 0,
    marginTop: 0,
    left: 0,
    top: -5,
  },
  dial: {
    position: 'absolute',
    bottom: -(180/2),
    left: (260/2)-(80/2),
  },
  loop: {
    position: 'absolute',
    bottom: -(260/2),
    left: (260/2)-(26/2),
  },
  title: {
    marginTop: 10,
    color: '#2196F3',
    color: 'white',
    fontSize: 36,
  },
  value: {
    marginTop: 5,
    marginBottom: 10,
    color: '#2196F3',
    color: 'white',
    fontSize: 28,

  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 20,
  },
  tab: {
    color: 'white',
    fontSize: 16,
    margin: 2.5,
    textAlign: 'center',
    textAlignVertical: 'bottom',
  },
  diff: {
    padding: 5,
    paddingBottom: 2,
    //paddingTop: 6,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  list:{
    backgroundColor: '#333',
  },
});
