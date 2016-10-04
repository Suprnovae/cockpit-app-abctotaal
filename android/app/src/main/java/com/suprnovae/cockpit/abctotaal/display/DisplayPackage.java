package com.suprnovae.cockpit.abctotaal.display;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class DisplayPackage implements ReactPackage {
  public DisplayPackage() {}

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext c) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new DisplayModule(c));
    return modules;
  }

  @Override
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext c) {
    return Collections.emptyList();
  }
}
