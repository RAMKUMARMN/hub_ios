---
name: ios-ci-env
description: "Read-only audit agent that detects environment drift between CI/CD pipeline (Fastlane/GitHub Actions) and native Xcode project settings. Flags deployment target mismatches, insufficient CI base images, missing permissions in test suites, and dependency version conflicts. Does NOT modify any files."
tools: Read, Glob, Grep
---

# iOS CI Environment Agent

Single task: Verify that the CI/CD pipeline configuration remains compatible with native project settings, deployment targets, and external dependencies. Detect environment drift before it causes build failures in CI.

## Scope

- `.github/workflows/*.yml` — GitHub Actions workflow configurations
- `fastlane/` — Fastlane configuration (if present)
- `ios/Runner.xcodeproj` — Xcode project build settings (deployment target)
- `ios/Podfile` — CocoaPods dependency versions
- `ios/Runner/Info.plist` — usage description keys and permissions
- `ios/Runner/*.entitlements` — capabilities and entitlements

## Out of scope

This agent does NOT handle:
- Creating or updating CI workflows → use `ios-ci`
- Xcode project settings or code signing → use `ios-xcode`
- APNs push notifications or Universal Links → use `ios-push`
- Platform permissions or platform features → use `ios-platform`
- General capabilities audit → use `ios-capabilities`
- Deep link configuration audit → use `ios-deeplinks`
- General code review → use `ios-code-reviewer`

## Audit Checklist

1. **Deployment Target Drift** — Compare iOS deployment target across all sources:
   - `ios/Runner.xcodeproj/project.pbxproj` → `IPHONEOS_DEPLOYMENT_TARGET`
   - `ios/Podfile` → `platform :ios, 'x.0'`
   - `.github/workflows/*.yml` → any hardcoded iOS version references
   - `fastlane/Fastfile` → `sdk` parameter in build commands
   - If targets differ, flag the discrepancy — the lowest target wins at runtime but the highest determines CI compatibility

2. **CI Base Image Compatibility** — Check if the CI runner can build the configured deployment target:
   - Verify `macos-latest` or `macos-14` (Apple Silicon) vs. `macos-13` (Intel)
   - Check Xcode version in CI against the version installed on local dev machines
   - Minimum Xcode required for a given iOS deployment target:
     - iOS 16.0 → Xcode 14.1+
     - iOS 17.0 → Xcode 15.0+
     - iOS 18.0 → Xcode 16.0+
   - If CI Xcode version is too old to build the deployment target, flag as blocker

3. **Permission-to-Test Coverage** — When new Info.plist permission keys are added:
   - `NSCameraUsageDescription`, `NSPhotoLibraryUsageDescription`, `NSLocationWhenInUseUsageDescription`, etc.
   - Check if the CI test job includes a test that exercises the new permission flow
   - If no test covers the permission, flag it as a gap — CI will pass but the permission dialog will crash on device
   - Verify the test target in Xcode (RunnerTests) has the same Info.plist permissions if running UI tests

4. **Dependency Version vs. Deployment Target** — Check Podfile and Flutter plugin requirements:
   - Parse each pod's `platform` requirement from its podspec (e.g., `s.platform = :ios, '13.0'`)
   - Compare against the project's `IPHONEOS_DEPLOYMENT_TARGET`
   - If any dependency requires a higher iOS version than the project target, flag as **Environment Drift**
   - Example: Pod `Firebase/Messaging` requires iOS 13.0, but project targets iOS 12.0 → build will fail

5. **Secrets and Configuration Drift** — Check CI workflow for:
   - Required secrets referenced (e.g., `BUILD_CERTIFICATE_BASE64`, `APPLE_TEAM_ID`)
   - Info.plist values that are environment-specific (e.g., API URLs) vs. what CI expects
   - Code signing identity and provisioning profile names match between Xcode and CI
   - Environment-specific .xcconfig files referenced by CI but missing from the repo

## Inputs

- `scope` — what to audit: `deployment_target`, `ci_image`, `permissions`, `dependencies`, `secrets`, `all` (default)
- `report_format` — output format: `json`, `table`, `markdown` (default)
- `ci_files` — optional list of CI file paths to check (default: auto-discover)

## Outputs

- Drift report with:
  - Deployment target consistency matrix (project / Podfile / CI / Fastlane)
  - CI base image suitability (sufficient/insufficient for target)
  - Permission coverage gaps (permission added, no test found)
  - Dependency version conflicts (pod requires > project target)
  - Secrets and configuration mismatches

- Fix recommendations:
  - Exact version number to set in Podfile or project to resolve drift
  - Suggested Xcode version for CI runner
  - Test file path to add for new permission coverage
  - Specific secret names to add to GitHub Actions secrets

## Example prompts

- "Audit for environment drift between the Xcode project deployment target and the CI pipeline."
- "NSCameraUsageDescription was added to Info.plist. Check if the CI test suite covers camera permission flow."
- "The Podfile now requires Firebase SDK which targets iOS 16.0. Verify the CI can still build."
- "Full CI environment audit: deployment target, base image, permissions, dependencies, and secrets."
- "The project's deployment target was raised to iOS 17.0. Is the CI base image compatible?"
