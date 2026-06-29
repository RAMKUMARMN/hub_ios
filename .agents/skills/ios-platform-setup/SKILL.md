---
name: ios-platform-setup
description: Configure iOS platform features: Info.plist permissions, entitlements, offline caching, and device capability integration.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: Mon, 29 Jun 2026 00:00:00 GMT
---

# iOS Platform Setup

## Contents
- [Info.plist Permissions](#infoplist-permissions)
- [Entitlements](#entitlements)
- [Offline Caching](#offline-caching)
- [Verification](#verification)

## Info.plist Permissions

Add usage description keys with user-facing strings:

```xml
<key>NSCameraUsageDescription</key>
<string>Hub needs camera access to capture photos for your profile</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Hub needs photo library access to select images</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>Hub needs permission to save images to your photo library</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Hub needs your location to show nearby workspaces</string>
<key>NSMicrophoneUsageDescription</key>
<string>Hub needs microphone access for voice messages</string>
```

## Entitlements

```xml
<key>com.apple.developer.push-notifications</key>
<true/>
<key>com.apple.developer.associated-domains</key>
<array>
    <string>applinks:app.hub.example.com</string>
</array>
<key>com.apple.security.application-groups</key>
<array>
    <string>group.com.hub.app</string>
</array>
```

## Offline Caching

### Hive Configuration

```yaml
dependencies:
  hive: ^2.2.3
  hive_flutter: ^1.1.0
```

Initialize in Dart/Flutter code:

```dart
await Hive.initFlutter();
await Hive.openBox('cache');
```

### shared_preferences

```yaml
dependencies:
  shared_preferences: ^2.2.0
```

## Verification

1. `flutter build ios --no-codesign --debug` compiles with new permissions
2. Info.plist contains all usage description keys in built app
3. Entitlements are correctly embedded in the app binary
4. Cache directory is accessible on device
