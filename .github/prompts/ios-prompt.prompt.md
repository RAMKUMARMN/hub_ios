---
mode: agent
agent: ios-agent
name: ios-agent-prompt
description:
  A system prompt for the `hub_ios` assistant. It defines the agent's role as a focused iOS platform helper for the repository, outlines allowed tools, behavior rules, response format, safety heuristics, and developer hints to ensure safe and effective assistance with iOS build configuration, Flutter integration, and platform-specific tasks.
---

### Requirements:

1.  **iOS Build Configuration:**
    *   The workflow should support building iOS targets using Xcode (via Flutter) for simulators and devices.
    *   It must handle provisioning profiles, certificates, and code signing with explicit human confirmation for release builds.
    *   Build artifacts should be versioned and signed only with explicit human confirmation for App Store/TestFlight uploads.
    *   Support for debug and release build configurations with environment-specific settings.
    *   Secrets (e.g., App Store Connect API keys, signing certificates) must be managed securely and never hardcoded.

2.  **Push Notification Integration (APNs):**
    *   Include steps to verify Apple Push Notification service (APNs) configuration.
    *   Validate push notification certificate or key setup for the target environment (production vs. sandbox).
    *   Test push notification delivery on simulators and physical devices.

3.  **Platform-Specific Features:**
    *   Provide guidance for Universal Links (iOS deep linking) configuration.
    *   Assist with offline caching strategy using Hive or shared_preferences.
    *   Support camera and photo library access permission handling for iOS (Info.plist keys).
    *   Troubleshoot Xcode build failures, Swift package resolution issues, and code signing mismatches.

### Constraints:

*   **Platform:** iOS (with Flutter/Dart as the primary language).
*   **Build Toolchain:** Xcode 15+ (via Flutter CLI), iOS 16+ deployment target.
*   **Push Notifications:** APNs (via Firebase Cloud Messaging or AWS SNS).
*   **CI/CD Platform:** GitHub Actions (preferred).
*   **Security:** Adhere to the principle of least privilege. Do not hardcode sensitive information (certificates, private keys, API tokens).
*   **Reproducibility:** Builds must be reproducible for the same commit and configuration.

### Success Criteria:

*   A successful `flutter build ios --no-codesign` produces a valid build for simulator testing.
*   A successful `flutter build ipa` produces a signed IPA for TestFlight/App Store submission (with user confirmation).
*   APNs push notifications are deliverable to target devices with correct payload structure.
*   Universal Links correctly route to the intended app screens.
*   Xcode build completes without errors, with all Swift package dependencies resolved.
*   The iOS project configuration stays in sync with the Flutter version and platform requirements.

### Usage Template (copy-paste)

Below are ready-to-use prompt templates you can paste to the `ios-agent` chat to generate workflows, patches, and documentation. Replace bracketed values before sending.

- Build for simulator:

```
Generate a GitHub Actions workflow `/.github/workflows/ios-build.yml` with these behaviours:
- Triggers: `push` to `main`, `pull_request`, `workflow_dispatch`.
- Jobs: `analyze` (flutter analyze), `test` (flutter test), `build-ios` (flutter build ios --no-codesign --debug).
- Caching: Cache CocoaPods, Flutter, and pub dependencies.
- Artifacts: Upload the build output as a build artifact.
- Notifications: post summary to Slack via `SLACK_WEBHOOK_URL`.

Inputs to set: `SLACK_WEBHOOK_URL` (stored as GitHub Secrets).

Deliverables: workflow file, README snippet for secrets and usage, PR body template, and a verification checklist. Provide diffs and wait for approval before applying changes.
```

- Set up code signing for release:

```
Help me configure code signing for the iOS project in `hub_ios`. I need to:
1. Set up provisioning profiles and certificates for distribution.
2. Configure code signing in Xcode project settings for Release configuration.
3. Add a step to the build workflow for signing using GitHub Secrets (`BUILD_CERTIFICATE_BASE64`, `BUILD_CERTIFICATE_PASSWORD`, `KEYCHAIN_PASSWORD`, `APPLE_TEAM_ID`, `PROVISIONING_PROFILE_BASE64`).
4. Require manual confirmation with token `CONFIRM_RELEASE_SIGNING` before any signing action.

Show the required changes and wait for my confirmation before applying patches.
```

- Verify APNs setup:

```
Verify the APNs push notification setup for `hub_ios`. Check that:
1. The Push Notification capability is enabled in the Xcode project.
2. The APNs key or certificate is correctly configured in the Apple Developer Portal.
3. Firebase Cloud Messaging (or AWS SNS) is correctly configured for iOS push.
4. The `firebase_messaging` or equivalent plugin is correctly configured in `pubspec.yaml`.
5. A test push notification can be sent and received on a physical device.

Provide a step-by-step verification checklist and show any relevant config snippets. Do not modify any files without confirmation.
```

### Chat example (copy-paste)

Use these short chat transcripts to interact with the `ios-agent`. Paste, edit the bracketed values, and send.

- Simulator build flow:

```
User: Create a workflow for building the iOS app for simulator on push to `main`. Use `flutter build ios --no-codesign --debug`, cache Flutter and CocoaPods deps, and upload the build as a GitHub Actions artifact. Show diffs and wait for my confirmation.
```

Agent (expected):
- Scans repository for Flutter/iOS configuration (reports found files).
- Produces draft workflow YAML and shows a unified diff.
- Asks: "Do you want me to apply these changes to the repo? (yes/no)"

User:
```
yes
```

- Release signing with confirmation:

```
User: Set up iOS code signing for release builds using GitHub Secrets. Do NOT auto-sign; require manual confirmation with a confirmation token.
```

Agent (expected):
- Scans repo and drafts files, shows diffs and signing command examples.
- Asks for final confirmation for any signing-impacting edits and shows the explicit confirmation token to use.

User (to approve signing):
```
I confirm the proposed changes and authorize edits, including release signing configuration.
Confirmation token: CONFIRM_RELEASE_SIGNING
I understand this may produce a signed release artifact for App Store submission.
```

Agent (after confirmation):
- Applies patches, commits or opens a PR.
- Posts a short post-change checklist and recommended verification commands (e.g., `flutter build ios --release`).

If the agent needs missing inputs (e.g., Apple Team ID secret name), it will ask a single targeted question such as: "Please confirm the GitHub secret name for your Apple Team ID."
