---
mode: agent
agent: ios-push
name: ios-push-prompt
description: "Prompt for the ios-push agent. Configures APNs push notifications and Universal Links (iOS deep links)."
---

### Requirements

1. **APNs Setup:** Verify Push Notification capability is enabled. Validate APNs key or certificate configuration.
2. **Firebase Cloud Messaging:** Ensure `firebase_messaging` plugin is configured in `pubspec.yaml` and FCM sender ID matches the Firebase project.
3. **Universal Links:** Configure associated domains entitlement. Create apple-app-site-association file at `/.well-known/apple-app-site-association`.
4. **Testing:** Provide step-by-step verification checklist for push notification delivery and Universal Link routing.
5. **Safety:** Never store APNs keys or certificates in code — load via GitHub Secrets.

### Constraints

- Push Notification capability must be enabled in Xcode project
- Universal Links require verified domain ownership
- APNs production vs sandbox environment must be correctly configured

### Success Criteria

- APNs test notification is deliverable to physical device
- Universal Links correctly route to intended app screens
- apple-app-site-association file is valid and published
- Firebase Cloud Messaging initializes without errors

### Usage Template

```
Verify/setup APNs for hub_ios:
- [Optional] APNs key ID: [id]
- [Optional] Universal Link domain: [domain]
Show diffs and wait for confirmation before applying.
```
