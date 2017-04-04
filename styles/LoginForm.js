import React from 'react';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height-80;

export default StyleSheet.create({
  loginButtonContainer: {
    marginTop: 5,
    width: windowWidth * 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    width: windowWidth * 0.8,
    paddingVertical: 12,
    backgroundColor: "rgba(255,255,255,0.25)"
  },
  container: {
    flex: 1,
    backgroundColor: "rgb(42, 55, 68)"
  },
  scrollView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: "rgb(42, 55, 68)",
    overflow: "visible"
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "rgb(42, 55, 68)",
  },
  inputContainer: {
    width: windowWidth * 0.8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomColor: "rgba(255,255,255,0.75)",
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "rgb(42, 55, 68)",
    color: "white",
    fontSize: 16,
    padding: 5
  },
  tpLogo: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    tintColor: "rgb(130, 181, 65)"
  },
  socialText: {
    color: "white",
    fontSize: 30,
    marginTop: 8,
    fontWeight: "600",
    marginBottom: 15
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    marginTop: 2,
    marginHorizontal: 10,
    backgroundColor: "rgba(255,255,255, 0.2)"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.5)"
  },
  footerText: {
    color: "white",
    fontSize: 14
  },
  footerActionText: {
    fontWeight: "600"
  }
});
