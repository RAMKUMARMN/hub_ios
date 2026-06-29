---
name: ios-xcode-setup
description: Configure Xcode project settings, code signing, capabilities, Info.plist keys, and Podfile dependencies following the project's conventions.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: Mon, 29 Jun 2026 00:00:00 GMT
---

# iOS Xcode Setup

## Contents
- [Build Settings](#build-settings)
- [Code Signing](#code-signing)
- [Info.plist](#infoplist)
- [Capabilities](#capabilities)
- [Verification](#verification)

## Build Settings

Configure deployment target via `.xcconfig`:

```ini
IPHONEOS_DEPLOYMENT_TARGET = 16.0
SWIFT_VERSION = 5.0
ENABLE_BITCODE = NO
DEBUG_INFORMATION_FORMAT = dwarf-with-dsym
```

## Code Signing

### Development (automatic)

Xcode automatic signing manages profiles for debug builds.

### Distribution (manual via CI)

Configure release signing via GitHub Secrets:

```yaml
- name: Install signing certificate
  run: |
    echo $BUILD_CERTIFICATE_BASE64 | base64 --decode > cert.p12
    security create-keychain -p $KEYCHAIN_PASSWORD build.keychain
    security default-keychain -s build.keychain
    security unlock-keychain -p $KEYCHAIN_PASSWORD build.keychain
    security import cert.p12 -k build.keychain -P $BUILD_CERTIFICATE_PASSWORD -T /usr/bin/codesign
    security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k $KEYCHAIN_PASSWORD build.keychain
  env:
    BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
    BUILD_CERTIFICATE_PASSWORD: ${{ secrets.BUILD_CERTIFICATE_PASSWORD }}
    KEYCHAIN_PASSWORD: ${{ secrets.KEYCHAIN_PASSWORD }}
```

## Info.plist

```xml
<key>NSCameraUsageDescription</key>
<string>Hub needs camera access to capture photos for your profile</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Hub needs photo library access to select images</string>
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>hub</string>
        </array>
    </dict>
</array>
```

## Capabilities

Enable via `.entitlements` file:

```xml
<key>com.apple.developer.push-notifications</key>
<true/>
<key>com.apple.developer.associated-domains</key>
<array>
    <string>applinks:app.hub.example.com</string>
</array>
```

## Verification

1. `flutter build ios --no-codesign --debug` — simulator build compiles
2. `xcodebuild -showBuildSettings` — verify deployment target and signing
3. Check Info.plist keys are present in built app bundle
4. Verify capabilities in Xcode project editor
