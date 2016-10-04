package com.suprnovae.cockpit.abctotaal.display;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.content.Context;
import android.util.DisplayMetrics; 

// https://github.com/facebook/react-native/blob/9ac9ec90c3d4136e52c044d086c1a3f45378555a/docs/NativeModulesAndroid.md
public class DisplayModule extends ReactContextBaseJavaModule {
  public DisplayModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "DisplayAndroid";
  }

  @ReactMethod
  public void getRealHeight(Callback error, Callback success) {
    DisplayMetrics m = new DisplayMetrics();
    reactContext.getSystemService(Context.WINDOW_SERVICE).getMetrics(m);
    success.invoke(m.heightPixels)
  }

  @ReactMethod
  public void getRealWidth(Callback error, Callback success) {
    DisplayMetrics m = new DisplayMetrics();
    reactContext.getSystemService(Context.WINDOW_SERVICE).getMetrics(m);
    success.invoke(m.widthPixels)
  }

  @ReactMethod
  public void getUsableHeight(Callback error, Callback success) {
    DisplayMetrics m = new DisplayMetrics();
    reactContext.getSystemService(Context.WINDOW_SERVICE).getRealMetrics(m);
    success.invoke(m.heightPixels)
  }

  @ReactMethod
  public void getUsableWidth(Callback error, Callback success) {
    DisplayMetrics m = new DisplayMetrics();
    reactContext.getSystemService(Context.WINDOW_SERVICE).getRealMetrics(m);
    success.invoke(m.widthPixels)
  }
}
