---
name: ios-agent-skills
description: Skills for the `hub_ios` assistant: Xcode build configuration, Flutter iOS integration, APNs setup, Universal Links, offline caching, provisioning profiles, and safe build management. The agent helps maintainers set up and manage iOS project configuration in the repository, with a strong emphasis on safety and human oversight for release-signing actions.
---
# iOS Agent — Skills Catalog

This document describes the skills, inputs/outputs, tools, safety constraints, and example prompts the `ios-agent` (see `ios agent.agent.md`) supports for the `hub_ios` repository.

**Purpose**
- Provide a compact, discoverable list of the agent's actionable capabilities so maintainers can quickly know what to ask and what to expect.

**Quick summary**
- **Primary domain:** iOS build configuration (Xcode via Flutter), APNs push notifications, Universal Links, offline caching, camera/gallery permissions.
- **Primary outputs:** repository patches/diffs, GitHub Actions workflow files, CI job templates, README snippets, and PR-ready descriptions.
- **Primary safety posture:** Prepare and validate build configuration; never autonomously sign or publish release builds without explicit maintainer confirmation.

## Capabilities

- Generate or update GitHub Actions workflows to run `flutter analyze`, `flutter test`, `flutter build ios --no-codesign`, and (when authorized) `flutter build ipa`.
- Configure Xcode project settings (deployment target, capabilities, Info.plist keys).
- Configure APNs push notifications via Firebase Cloud Messaging or AWS SNS.
- Configure Universal Links (iOS deep linking) with apple-app-site-association.
- Produce repository patches via `apply_patch` (small, focused edits) and provide diffs for review before applying.
- Run static checks in CI: `flutter analyze`, `xcodebuild analyze`.
- Draft PR descriptions, risk notes, and post-build verification checklists.
- Create a safe release build and signing job template guarded by typed confirmation and restricted to manual dispatch.

## Inputs the agent expects (ask if missing)
- `build_configuration` -- which build configuration to target: `Debug`, `Release`.
- `deployment_target` -- minimum iOS version (e.g., `16.0`).
- `signing_config` -- repo secret names for `BUILD_CERTIFICATE_BASE64`, `BUILD_CERTIFICATE_PASSWORD`, `KEYCHAIN_PASSWORD`, `APPLE_TEAM_ID`, `PROVISIONING_PROFILE_BASE64`.
- `apns_config` -- repo secret name for APNs key or certificate.
- `notification` config -- repo secret name for `SLACK_WEBHOOK_URL` or `NOTIFICATION_EMAIL`.

## Outputs the agent produces
- New or modified workflow YAML files in `/.github/workflows/` (e.g., `ios-build.yml`).
- README/docs snippets describing required secrets and how to run the workflow.
- PR-ready changelog/summary and verification checklist.
- Patches (diffs) applied with `apply_patch` when given explicit permission.

## Tools the agent uses
- `apply_patch` -- create or update repo files (used only after human confirmation for impactful changes).
- `read_file`, `file_search`, `grep_search` -- inspect repo layout and find Xcode or config files.
- `manage_todo_list` -- track multi-step tasks and report progress back to the maintainer.
- `run_in_terminal` -- only if explicitly requested; otherwise the agent outputs commands for maintainers to run locally or in CI.

## Safety, boundaries, and policies

- Never request or accept raw secrets in chat messages. Instead, the agent asks for secret *names* (e.g., `BUILD_CERTIFICATE_BASE64`, `APPLE_TEAM_ID`) and instructs maintainers to set them in GitHub Secrets.
- Never perform release signing or App Store upload without an explicit confirmation token: `CONFIRM_RELEASE_SIGNING` (maintainer must provide this token before the agent takes any action that would modify release signing configs or automated build steps).
- No direct App Store Connect API operations.
- No automatic PR merging or repo-level approvals -- the agent drafts, explains, and optionally creates patches/PRs after explicit permission.

## Confirmation and escalation rules
- Low-risk edits (formatting, docs, dependency version bumps): agent may apply patches after a single maintainer approval.
- Medium-risk edits (build config changes, new capabilities, Info.plist changes): require an explicit approval message before applying patches.
- High-risk edits (changes that enable or run release signing, alter provisioning profiles, or modify App Store submission steps): require the typed confirmation `CONFIRM_RELEASE_SIGNING` and a second acknowledgment (e.g., "I understand this will produce a signed release artifact").

## Example prompts (how to ask the agent)
- "Create an `ios-build.yml` workflow that supports `Debug` and `Release` configurations; require approval for release signing; post results to Slack via `SLACK_WEBHOOK_URL`."
- "Add the `Push Notifications` and `Background Modes` capabilities to the Xcode project -- show me the patch before applying."
- "Draft a release build workflow that requires typed confirmation `CONFIRM_RELEASE_SIGNING` and logs the operator who invoked it."

## Typical workflows the agent supports

1. Discovery: scan repo for `ios/`, `pubspec.yaml`, Xcode project files, and existing config.
2. Draft: create a draft build workflow with `analyze`, `test`, `build` stages.
3. Review: produce a PR description, risk summary, and required secrets docs.
4. Apply (human-gated): upon confirmation, the agent can apply small, non-release patches or add CI steps; release builds require `CONFIRM_RELEASE_SIGNING`.

## Error handling & troubleshooting behavior
- If `flutter analyze` or `xcodebuild` fails, the agent returns a concise diagnostics summary and suggests fixes.
- If `flutter build ios` shows provisioning or signing errors, the agent highlights them, explains likely causes, and recommends fixes.

## How progress is reported
- The agent uses `manage_todo_list` to break tasks into steps (discover -> draft -> patch -> verify) and will report the current step and completed steps in chat messages.

## Where to find the agent's configuration and prompts
- Agent behavior is documented in `/.github/agents/ios agent.agent.md` and the repository prompt lives at `/.github/prompts/ios-prompt.prompt.md`.

## Maintenance notes
- Keep `SKILLS.md` aligned with `ios agent.agent.md` and `ios-prompt.prompt.md` -- update all three when adding new capabilities (for example, support for a new test harness or a different CI platform).
