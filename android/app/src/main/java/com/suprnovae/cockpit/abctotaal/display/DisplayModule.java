package com.suprnovae.cockpit.abctotaal.display;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;
import android.content.Context;
import android.content.ContextWrapper;
//import android.hardware.display.DisplayManager;
import android.view.Display;
import android.view.WindowManager;
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

  private final Context getContext() {
    //return getReactApplicationContext().getApplicationContext();
    return getReactApplicationContext().getBaseContext();
  }

  public Display getDisplay() {
    WindowManager wm = (WindowManager) getContext().
      getSystemService(Context.WINDOW_SERVICE);
    return(wm.getDefaultDisplay());
  }

  @ReactMethod
  public void getRealHeight(Promise promise) {
    DisplayMetrics m = new DisplayMetrics();
    getDisplay().getMetrics(m);
    promise.resolve(m.heightPixels);
  }

  @ReactMethod
  public void getRealWidth(Promise promise) {
    DisplayMetrics m = new DisplayMetrics();
    getDisplay().getMetrics(m);
    promise.resolve(m.widthPixels);
  }

  @ReactMethod
  public void getUsableHeight(Promise promise) {
    DisplayMetrics m = new DisplayMetrics();
    getDisplay().getRealMetrics(m);
    promise.resolve(m.heightPixels);
  }

  @ReactMethod
  public void getUsableWidth(Promise promise) {
    DisplayMetrics m = new DisplayMetrics();
    getDisplay().getRealMetrics(m);
    promise.resolve(m.widthPixels);
  }
}
