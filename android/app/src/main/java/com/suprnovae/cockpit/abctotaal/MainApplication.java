package com.suprnovae.cockpit.abctotaal;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

import com.oblador.vectoricons.VectorIconsPackage;
import com.lwansbrough.RCTCamera.*;
//import org.pgsqlite.SQLitePluginPackage;

import com.suprnovae.cockpit.abctotaal.display.DisplayPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public String getJSMainModuleName() {
      return "index.android";
    }

    @Override
    public @Nullable String getBundleAssetName() {
      return "index.android.bundle";
    }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ReactNativeI18n(),
          new DisplayPackage(),
          new VectorIconsPackage(),
          new RCTCameraPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
