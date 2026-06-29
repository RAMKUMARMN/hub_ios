---
mode: agent
agent: ios-xcode
name: ios-xcode-prompt
description: "Prompt for the ios-xcode agent. Configures Xcode project settings, code signing, capabilities, Info.plist, and Podfile dependencies."
---

### Requirements

1. **Xcode Settings:** Set deployment target to iOS 16+. Manage build settings via `.xcconfig` files.
2. **Code Signing:** Use automatic signing for development. For release, configure signing via GitHub Secrets (`BUILD_CERTIFICATE_BASE64`, `BUILD_CERTIFICATE_PASSWORD`, `KEYCHAIN_PASSWORD`, `APPLE_TEAM_ID`, `PROVISIONING_PROFILE_BASE64`).
3. **Capabilities:** Enable capabilities (Push Notifications, Background Modes) via entitlements files.
4. **Info.plist:** Add usage description keys for camera, photo library, location, etc. Configure `CFBundleURLTypes` for deep links.
5. **Dependencies:** Manage CocoaPods via `Podfile`. Keep Podfile and Flutter-generated config committed.

### Constraints

- Use `flutter build` commands, not direct xcodebuild
- Release signing requires `CONFIRM_RELEASE_SIGNING` token
- Never hardcode certificates, provisioning profiles, or secrets
- Xcode project files are XML — edit with care for merge conflicts

### Success Criteria

- `flutter build ios --no-codesign --debug` compiles for simulator
- All required capabilities are enabled in the project
- Info.plist contains all required usage description keys
- Podfile dependencies resolve without conflicts

### Usage Template

```
Update [file] with:
- Deployment target: [version]
- [Optional] Capabilities: [list]
- [Optional] Info.plist keys: [key: value]
Show the diff and wait for my confirmation before applying.
```
