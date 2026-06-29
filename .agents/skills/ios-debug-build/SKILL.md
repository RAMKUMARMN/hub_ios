---
name: ios-debug-build
description: Build, test, and troubleshoot a debug iOS build for simulator using Flutter and Xcode. Includes build commands, cache management, and common failure resolutions.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: Mon, 29 Jun 2026 00:00:00 GMT
---

# iOS Debug Build

## Contents
- [Build Commands](#build-commands)
- [Flutter Analyze](#flutter-analyze)
- [Common Failures](#common-failures)
- [Cache Management](#cache-management)

## Build Commands

```bash
# Simulator build (no code signing)
flutter build ios --no-codesign --debug

# Simulator build with specific device
flutter build ios --no-codesign --debug --simulator

# Release build (requires signing)
flutter build ipa --release

# Release build with export options
flutter build ipa --release --export-options-plist ExportOptions.plist
```

## Flutter Analyze

Run before every build to catch issues early:

```bash
flutter analyze
```

## Common Failures

### Code Signing Error

```
No signing certificate "iOS Distribution" found
```

**Fix:** Install the distribution certificate and provisioning profile. For simulator builds, use `--no-codesign`.

### CocoaPods Dependency Conflict

```
[!] Unable to satisfy the following requirements:
```

**Fix:** `cd ios && pod repo update && pod install` to resolve dependency versions.

### Swift Package Resolution Failure

```
xcodebuild: error: Could not resolve package dependencies
```

**Fix:** `cd ios && xcodebuild -resolvePackageDependencies -workspace Runner.xcworkspace -scheme Runner`

## Cache Management

```bash
# Clean Flutter build cache
flutter clean

# Clean CocoaPods cache
cd ios && pod cache clean --all && pod deintegrate && pod install

# Reset Flutter + iOS
flutter clean && cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
```
