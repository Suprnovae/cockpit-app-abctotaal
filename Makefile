BUNDLE=react-native bundle
RM=rm -f
COPY=cp

production: api/production.js
	@${RM} api.js && ${COPY} $< api.js

test: api/test.js
	@${RM} api.js && ${COPY} $< api.js

clean-api:
	@${RM} api.js

api.js:
ifndef ${API_IMPLEMENTATION_TYPE}
	make production
endif
	make ${API_IMPLEMENTATION_TYPE}

ios: api.js index.ios.js
	@${BUNDLE} \
		--platform ios \
		--entry-file $< \
		--bundle-output ios/main.jsbundle

android: api.js index.android.js
	@${BUNDLE} \
		--platform android \
		--dev false \
		--bundle-output android/app/src/main/assets/index.android.bundle \
		--entry-file $< \
		--assets-dest android/app/src/main/res/

.PHONY: ios android production test clean-api clean
