# POC PWA APP

This is a POC on creating a PWA using react.

This POC integrated the following features:

- Mobile installation
- Offline support
- Geolocation
- Push notifications (Note: Web push notification won't work by default on IOS - https://firt.dev/ios-15.4b#web-push-notifications-on-ios%EF%BC%8Dwith-a-catch)

## Firebase

This POC uses a Firebase firestore database and it also uses firebase cloud messaging to push notifications.

Dashboard: https://console.firebase.google.com/project/poc-pwa-35c7a/overview

- Note: In this POC, push notifications are being provided by firebase cloud messaging. We'd probably see some delaying on pushing the notifications. Here's the explanation why this happens: https://eladnava.com/google-cloud-messaging-extremely-unreliable/
  It's important to clarify this is not related to the PWA service worker.

## POC explanation

This repository has a [explanation.mp4"](./explanation.mp4) file with a screen recording of all features included in the POC. This screen recording includes:

- 00:00 to 00:40 - mobile installation feature
- 00:40 to 1:00 - offline support feature
- 1:00 to 1:30 - geolocation feature
- 1:30 to 2:11 - push notifications feature
