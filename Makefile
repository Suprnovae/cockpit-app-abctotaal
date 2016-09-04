BUNDLE=react-native bundle

ios: index.ios.js
	@${BUNDLE} \
		--platform ios \
		--entry-file $< \
		--bundle-output ios/main.jsbundle

android: index.android.js
	@${BUNDLE} \
		--platform android \
		--dev false \
		--bundle-output android/app/src/main/assets/index.android.bundle \
		--entry-file $< \
		--assets-dest android/app/src/main/res/

.PHONY: ios android
