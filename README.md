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

Before producing an apk, one may need to [generate a key](https://facebook.github.io/react-native/docs/signed-apk-android.html).

    keytool -genkey -v -keystore ${KEY_NAME}.keystore -alias ${KEY_ALIAS} -keyalg RSA -keysize 2048 -validity 10000

Create a `android/release.properties` file which contains a information on the
key, the alias and the passwords involved.

```groovy
keyStore=KEY_NAME.keystore
keyStorePassword=KEY_PASSWORD
keyAlias=KEY_ALIAS
keyAliasPassword=KEY_ALIAS_PASSWORD
```

Replace the capitalized phrases for the actual information and remember to
never commit these files into the repository since they contain sensitive information.

The `android/release.properties` is referred to in the `android/app/build.gradle`
file.

Build an apk by assembling a release and possibly installing it on a emulated/virtual or physical device.

    ./gradlew assembleRelease

    ./gradlew installRelease
