---
mode: agent
agent: ios-platform
name: ios-platform-prompt
description: "Prompt for the ios-platform agent. Configures iOS Info.plist permissions, entitlements, offline caching, and platform features."
---

### Requirements

1. **Info.plist Permissions:** Add usage description keys for all required permissions (NSCameraUsageDescription, NSPhotoLibraryUsageDescription, NSLocationWhenInUseUsageDescription, etc.). Provide user-facing strings.
2. **Entitlements:** Configure entitlements for capabilities like Background Modes, Keychain Sharing, App Groups.
3. **Offline Caching:** Configure Hive or shared_preferences for local storage. Provide initialization code examples.
4. **Background Modes:** Configure background fetch, remote notifications, or processing as needed.

### Constraints

- All Info.plist usage descriptions must provide meaningful user-facing text
- Entitlements must match capabilities enabled in Xcode project
- Do not modify Flutter/Dart code — that lives in `hub_mobile/`

### Success Criteria

- Info.plist contains all required usage description keys with proper strings
- Entitlements file contains correct capability identifiers
- Cache initialization is documented

### Usage Template

```
Add/modify [permissions/features] in Info.plist:
- Permissions: [key: description]
- [Optional] Entitlements: [list]
- [Optional] Cache type: [Hive | shared_preferences]
Show the diff and wait for my confirmation before applying.
```
