---
name: ios-agent-skills
description: Skills for the `hub_ios` assistant: Xcode build configuration, APNs push notifications, Universal Links, platform permissions, offline caching, and safe build management. The coordinator routes requests to single-task agents.
---

# iOS Agent — Skills Catalog

This document describes the skills, inputs/outputs, tools, safety constraints, and example prompts the `ios-agent` (see `ios-agent.agent.md`) supports for the `hub_ios` repository.

**Purpose**
- Provide a compact, discoverable list of the agent's actionable capabilities so maintainers can quickly know what to ask and what to expect.

**Quick summary**
- **Primary domain:** iOS build configuration (Xcode via Flutter), APNs push notifications, Universal Links, platform permissions, offline caching, CI workflows.
- **Primary outputs:** repository patches/diffs, Xcode project file changes, Info.plist updates, GitHub Actions workflow files, and PR-ready descriptions.
- **Primary safety posture:** Prepare and validate build configuration; never autonomously sign or publish release builds without explicit maintainer confirmation.

## Capabilities

### Xcode Build Configuration (handled by `ios-xcode` agent)
- Configure deployment target and build settings
- Set up code signing with certificates and provisioning profiles
- Enable capabilities (Push Notifications, Background Modes)
- Manage Info.plist keys and URL schemes
- Configure CocoaPods dependencies

### Push Notifications & Universal Links (handled by `ios-push` agent)
- APNs push notification setup
- Firebase Cloud Messaging integration for iOS
- Universal Links configuration
- apple-app-site-association file generation

### Platform Features & Permissions (handled by `ios-platform` agent)
- Info.plist usage description keys
- Entitlements configuration
- Offline caching (Hive, shared_preferences)
- Background modes and app groups

### CI Workflows (handled by `ios-ci` agent)
- Flutter analyze, test, and build jobs
- CocoaPods and Flutter dependency caching
- Code signing with confirmation gates
- Artifact upload and Slack notifications

### Infrastructure Skills (reusable guides in `.agents/skills/`)
- `ios-xcode-setup` — Xcode project configuration
- `ios-push-setup` — APNs and Universal Link setup
- `ios-platform-setup` — iOS permissions and platform features
- `ios-ci-workflow` — GitHub Actions CI workflow template
- `ios-debug-build` — Build commands and troubleshooting

## Inputs the agent expects (ask if missing)
- `deployment_target` — minimum iOS version (e.g., 16.0)
- `build_configuration` — Debug or Release
- `signing_config` — secret names for certificates and provisioning profiles
- `apns_config` — APNs key ID, team ID
- `universal_link_domain` — domain for Universal Links
- `permissions` — list of Info.plist usage description keys

## Outputs the agent produces
- New or modified Xcode project settings
- Info.plist and entitlements updates
- APNs configuration and Universal Link setup
- CI workflow YAML files in `/.github/workflows/`
- README/docs snippets describing required secrets
- PR-ready changelog/summary and verification checklist

## Tools the agent uses
- Repository editing tools for making focused edits
- File search and read tools to inspect repo layout
- Progress tracking tools to manage multi-step tasks

## Safety, boundaries, and policies

- Never request or accept raw secrets in chat messages. Instead, ask for secret *names* (e.g., `BUILD_CERTIFICATE_BASE64`, `APPLE_TEAM_ID`) and instruct maintainers to set them in GitHub Secrets.
- Never perform release signing or App Store upload without an explicit confirmation token: `CONFIRM_RELEASE_SIGNING`.
- No direct App Store Connect API operations.
- No automatic PR merging or repo-level approvals — draft and explain only.

## Confirmation and escalation rules
- Low-risk edits (formatting, docs, dependency version bumps): apply patches after a single maintainer approval.
- Medium-risk edits (build config changes, new capabilities, Info.plist changes): require explicit approval before applying.
- High-risk edits (changes that enable or run release signing, alter provisioning profiles): require `CONFIRM_RELEASE_SIGNING` and a second acknowledgment.

## Example prompts (how to ask the agent)

### Xcode Build
- "Update the deployment target in the Xcode project to iOS 17."
- "Enable the Push Notifications capability in the Xcode project."

### Push Notifications
- "Verify the APNs push notification setup for hub_ios."
- "Configure Universal Links for app.hub.example.com."

### Platform Features
- "Add NSCameraUsageDescription and NSPhotoLibraryUsageDescription to Info.plist."
- "Configure Hive for offline caching."

### CI Workflows
- "Create an ios-build.yml workflow with analyze, test, and build-ios jobs for simulator."

## Agent Architecture

The coordinator (`ios-agent`) routes to single-task agents:

| Agent | Responsibility |
|---|---|
| `ios-xcode` | Xcode project configuration |
| `ios-push` | APNs push notifications and Universal Links |
| `ios-platform` | iOS permissions and platform features |
| `ios-ci` | CI workflows for iOS builds |
| `ios-planner` | Implementation planning |
| `ios-code-reviewer` | Code review before merge |

## How progress is reported
- Each agent breaks tasks into steps and reports current/completed steps

## Where to find configuration
- Agent configs: `/.github/agents/*.agent.md`
- Prompts: `/.github/prompts/*.prompt.md`
- Skills: `/.agents/skills/*/SKILL.md`
- Hooks: `/.github/hooks/*.json`
- General guidelines: `/.github/copilot-instructions.md`

## Maintenance notes
- Keep `SKILLS.md` aligned with individual agent files and prompts
- When adding a new skill, create `/.agents/skills/<name>/SKILL.md` and update this catalog
- When adding a new single-task agent, create the agent file, prompt file, register it in the coordinator's handoffs, and add to `opencode.jsonc`
