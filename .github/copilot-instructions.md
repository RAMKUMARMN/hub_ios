---
applyTo: "**/*.swift,**/*.plist,**/*.xcconfig,**/*.entitlements"
---
# Project coding standards for iOS (Flutter build config)

Apply the [general coding guidelines](./general-coding.instructions.md) to all code.

## Xcode Project Guidelines
- Use Xcode 15+ for project file editing
- Set deployment target to iOS 16+
- Enable Push Notifications capability in Signing & Capabilities
- Use `.xcconfig` files for environment-specific build settings
- Never hardcode provisioning profiles or certificates — use GitHub Secrets

## Info.plist Guidelines
- Declare all usage descriptions (`NSCameraUsageDescription`, etc.)
- Set `FirebaseMessagingAutoInitEnabled` for FCM auto-init
- Configure `CFBundleURLTypes` for deep link handling

## Flutter Integration Guidelines
- Do not write Flutter/Dart code here — that lives in `hub_mobile/`
- Use `flutter build ios --no-codesign` for simulator builds
- Release IPAs require human confirmation with `CONFIRM_RELEASE_SIGNING` token
- Podfile and Flutter-generated config should be committed
- APNs handled via Firebase Cloud Messaging or AWS SNS (boto3 in backend)

## Code Signing Guidelines
- Development: automatic signing with Xcode
- Distribution: manual signing via CI using exported certificate + provisioning profile
- Certificates and profiles stored as base64 in GitHub Secrets
- Never commit `.p12` or `.mobileprovision` files to the repository
