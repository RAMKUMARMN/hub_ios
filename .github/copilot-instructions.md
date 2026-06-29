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

## Agent Guidelines

This repository uses the following agents:

| Agent | File | Purpose |
|---|---|---|
| `ios-agent` | `.github/agents/ios-agent.agent.md` | Coordinator — routes to single-task agents |
| `ios-xcode` | `.github/agents/ios-xcode.agent.md` | Xcode project configuration |
| `ios-push` | `.github/agents/ios-push.agent.md` | APNs push notifications and Universal Links |
| `ios-platform` | `.github/agents/ios-platform.agent.md` | iOS permissions and platform features |
| `ios-ci` | `.github/agents/ios-ci.agent.md` | CI workflows for iOS builds |
| `ios-planner` | `.github/agents/ios-planner.agent.md` | Implementation planning |
| `ios-code-reviewer` | `.github/agents/ios-code-reviewer.agent.md` | Code review before merge |

Prompts are in `.github/prompts/` and skills in `.agents/skills/`.

When asking for help, prefix your request with the agent name:
- "@ios-xcode Update deployment target to iOS 17"
- "@ios-push Verify APNs setup for hub_ios"
- "@ios-platform Add NSCameraUsageDescription to Info.plist"
- "@ios-ci Create ios-build.yml workflow"
