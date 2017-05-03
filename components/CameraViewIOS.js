import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

class CameraViewIOS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cameraType: Camera.constants.Type.back
    };
  }

  render(){
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          type={this.state.cameraType}
          torchMode={Camera.constants.FlashMode.off}
          aspect={Camera.constants.Aspect.fill}>
            <View style={styles.buttonBar}>
                <TouchableHighlight style={styles.button} onPress={this._switchCamera.bind(this)}>
                    <Text style={styles.buttonText}>Flip</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button} onPress={this._takePicture.bind(this)}>
                    <Text style={styles.buttonText}>Take</Text>
                </TouchableHighlight>
            </View>

        </Camera>
      </View>
    );
  }

  _switchCamera() {
    console.log('switching camera');
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);
  }

  _takePicture() {
    console.log('taking picture');
    this.camera.capture()
        .then((data)=>console.log(data))
        .catch(err => console.log(err));
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  buttonBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    right: 0,
    left: 0,
    justifyContent: "center"
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    margin: 5
  },
  buttonText: {
    color: "#FFFFFF"
  }
});

module.exports = CameraViewIOS;
