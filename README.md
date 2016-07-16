# Build

React-native utilizes a bridge to simplify development. Prior to publishing an
app one is to produce the bundle which wraps all of the application logic into
an asset that can be bundled into the executable for publishing.

## iOS

Build a bundle for iOS into `ios/main.jsbundle`.

  react-native bundle
    --platform ios
    --entry-file index.ios.js
    --bundle-output ios/main.jsbundle

## Android

Build a bundle for Android into `android/app/src/main/assets/index.android.bundle`.

  react-native bundle
    --platform android
    --dev false
    --bundle-output android/app/src/main/assets/index.android.bundle
    --entry-file index.android.js
    --assets-dest android/app/src/main/res/


  keytool -genkey -v -keystore ${KEY_NAME}.keystore -alias ${KEY_ALIAS} -keyalg RSA -keysize 2048 -validity 10000

  ./gradlew assembleRelease

  ./gradlew installRelease
