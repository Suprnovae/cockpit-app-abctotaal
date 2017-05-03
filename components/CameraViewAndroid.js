import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

class CameraViewAndroid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: Camera.constants.Type.back,
      flashMode:Camera.constants.FlashMode.off,
    };
  }
  render() {
    console.log('render render');
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          type={this.state.cameraType}
          flashMode={Camera.constants.FlashMode.off}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <View style={styles.buttonBar}>
          <TouchableHighlight
              style={styles.capture}
              onPress={this._switchFlash.bind(this)}>
              <Icon name="flash" size={50} style={{fontSize: 20, height: 22, color: 'white',}}/>
          </TouchableHighlight>
          <TouchableHighlight
              style={styles.capture}
              onPress={this._takePicture.bind(this)}>
              <Icon name="camera" size={50} style={{fontSize: 20, height: 22, color: 'white',}}/>
          </TouchableHighlight>
          <TouchableHighlight
              style={styles.capture}
              onPress={this._switchCamera.bind(this)}>
              <Icon name="refresh" size={50} style={{fontSize: 20, height: 22, color: 'white',}}/>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  _switchCamera() {
    console.log('switching camera');
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  }
  _switchFlash() {
    console.log('switching Flash');
    var state = this.state;
    state.flashMode = state.flashMode === Camera.constants.FlashMode.off ? Camera.constants.FlashMode.on : Camera.constants.FlashMode.off;
    this.setState(state);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    borderColor: 'green',borderWidth:2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  buttonBar:{
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    right: 0,
    left: 0,
    justifyContent: "center"
  },
  capture: {
    padding: 10,
    borderWidth: 0,
    borderColor: "black",
    margin: 15,
    borderRadius: 20,
  },
});

module.exports = CameraViewAndroid;
