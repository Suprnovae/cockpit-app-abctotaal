# Build

React-native utilizes a bridge to simplify development. Prior to publishing an
app one is to produce the bundle which wraps all of the application logic into
an asset that can be bundled into the executable for publishing.

## iOS

![iOS build status on Bitrise](https://www.bitrise.io/app/8ba75a56197d5bf4.svg?token=p9czcJJ9L_7gEInbs6MFVA)

Build a bundle for iOS into `ios/main.jsbundle`.

    react-native bundle
    --platform ios
    --entry-file index.ios.js
    --bundle-output ios/main.jsbundle

The following environment variables need to be configured on Bitrise in order
to complete a build with [Fastlane](https://docs.fastlane.tools):

 - `IOS_CODESIGNING_ID` setup as secret env var (e.g.: `iPhone Distribution: Codesigning Entity's Name (XXXXXXXXXX)`)
 - `IOS_APPLE_TEAM_ID` setup as secret env var
 - `SLACK_URL`
 - `IOS_BUILD_DIR`


## Android

![Android build status on Bitrise](https://www.bitrise.io/app/677e139a058b6ec3.svg?token=OY6IXAwg15VlslFf_OrfKQ)

Build a bundle for Android into `android/app/src/main/assets/index.android.bundle`.

    react-native bundle
    --platform android
    --dev false
    --bundle-output android/app/src/main/assets/index.android.bundle
    --entry-file index.android.js
    --assets-dest android/app/src/main/res/

Before producing an apk, one may need to [generate a key](https://facebook.github.io/react-native/docs/signed-apk-android.html).

    keytool -genkey -v -keystore ${KEY_NAME}.keystore -alias ${KEY_ALIAS} -keyalg RSA -keysize 2048 -validity 10000

Provide a few environment variables in order to perform APK signing:

 - `ANDROID_KEYSTORE_PATH`: the path to the keystore file
 - `ANDROID_KEYSTORE_PASSWORD`: the password to the keystore file
 - `ANDROID_KEY_ALIAS`: the key alias
 - `ANDROID_KEY_ALIAS_PASSWORD`: key alias password

Build an apk by assembling a release and possibly installing it on a emulated/virtual or physical device.

    ./gradlew assembleRelease

    ./gradlew installRelease
