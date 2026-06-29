---
mode: agent
agent: ios-ci
name: ios-ci-prompt
description: "Prompt for the ios-ci agent. Creates or updates GitHub Actions CI workflows for iOS builds with analyze, test, simulator build, signing, and notifications."
---

### Requirements

1. **Workflow Layout:** Create `.github/workflows/ios-build.yml` with jobs for `analyze` (flutter analyze), `test` (flutter test), and `build` (simulator or IPA).
2. **Caching:** Cache CocoaPods (`~/.cocoapods`), Flutter (`~/.pub-cache`), and pub dependencies.
3. **Signing:** Use certificates and provisioning profiles from GitHub Secrets (`BUILD_CERTIFICATE_BASE64`, `BUILD_CERTIFICATE_PASSWORD`, `KEYCHAIN_PASSWORD`, `APPLE_TEAM_ID`, `PROVISIONING_PROFILE_BASE64`). Guard release signing behind typed confirmation.
4. **Artifacts:** Upload build artifacts as GitHub Actions artifacts.
5. **Notifications:** Post build summary to Slack via `SLACK_WEBHOOK_URL` secret.

### Constraints

- Use `flutter build ios --no-codesign` for simulator builds
- Use `flutter build ipa` for release builds with signing
- Release signing job requires `CONFIRM_RELEASE_SIGNING` confirmation token
- Secrets referenced by name — never inline values
- `workflow_dispatch` trigger for manual release builds

### Success Criteria

- Workflow triggers on push, pull_request, and workflow_dispatch
- `flutter analyze` passes
- `flutter test` passes
- Simulator build completes and uploads as artifact
- Release signing job exists and is guarded by confirmation token

### Usage Template

```
Create a CI workflow with:
- Build type: [simulator | release]
- Triggers: [push, PR, workflow_dispatch]
- [Optional] Signing secrets: [secret names]
Show the diff and wait for my confirmation before applying.
```
