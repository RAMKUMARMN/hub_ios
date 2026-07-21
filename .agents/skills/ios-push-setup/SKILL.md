---
name: ios-push-setup
description: Configure APNs push notifications and Universal Links (iOS deep links) following the project's conventions.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: Mon, 29 Jun 2026 00:00:00 GMT
---

# iOS Push Setup

## Contents
- [APNs Configuration](#apns-configuration)
- [Firebase Cloud Messaging](#firebase-cloud-messaging)
- [Universal Links](#universal-links)
- [Verification](#verification)

## APNs Configuration

### Capability

Ensure Push Notifications capability is enabled in Xcode or entitlements:

```xml
<key>com.apple.developer.push-notifications</key>
<true/>
```

### APNs Key

Configure APNs key in Firebase Console or AWS SNS:
- Key ID from Apple Developer Portal
- Team ID from Apple Developer Portal
- Bundle ID matching the app

## Firebase Cloud Messaging

Ensure `pubspec.yaml` includes:

```yaml
dependencies:
  firebase_messaging: ^15.0.0
  firebase_core: ^3.0.0
```

### Verification Checklist

1. Push Notification capability is enabled
2. APNs key is configured in Firebase Console
3. `firebase_messaging` plugin is configured in `pubspec.yaml`
4. Test notification via Firebase Console reaches physical device

## Universal Links

### Associated Domains Entitlement

```xml
<key>com.apple.developer.associated-domains</key>
<array>
    <string>applinks:app.hub.example.com</string>
</array>
```

### apple-app-site-association

Create at `/.well-known/apple-app-site-association`:

```json
{
  "applinks": {
    "details": [
      {
        "appIDs": ["TEAMID.com.hub.app"],
        "components": [
          {
            "/": "/workspace/*",
            "comment": "Matches workspace deep links"
          }
        ]
      }
    ]
  }
}
```

## Verification

1. `swcutil dl` — verify Universal Link registration
2. Simulator test: `xcrun simctl openurl booted "https://app.hub.example.com/workspace/123"`
3. Apple Validation Tool: `curl -v https://app.hub.example.com/.well-known/apple-app-site-association`
4. APNs delivery test with Firebase Console or `pusher` CLI tool
