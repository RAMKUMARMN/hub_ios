---
name: ios-ci-workflow
description: Create a GitHub Actions CI workflow for iOS builds with Flutter analyze, test, simulator build, code signing, and notifications.
metadata:
  model: models/gemini-3.1-pro-preview
  last_modified: Mon, 29 Jun 2026 00:00:00 GMT
---

# iOS CI Workflow

## Contents
- [Workflow Layout](#workflow-layout)
- [Triggers](#triggers)
- [Jobs](#jobs)
- [Caching](#caching)
- [Code Signing](#code-signing)
- [Required Secrets](#required-secrets)

## Workflow Layout

```
.github/workflows/
└── ios-build.yml
```

## Triggers

```yaml
name: iOS CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

## Jobs

| Job | Command | Purpose |
|---|---|---|
| `analyze` | `flutter analyze` | Dart static analysis |
| `test` | `flutter test` | Unit and widget tests |
| `build-ios` | `flutter build ios --no-codesign --debug` | Simulator build |
| `build-release` | `flutter build ipa --release` | Release IPA (manual dispatch, signing) |

### Example workflow

```yaml
name: iOS CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  analyze:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: "3.x"
          cache: true
      - run: flutter pub get
      - run: flutter analyze

  test:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: "3.x"
          cache: true
      - run: flutter pub get
      - run: flutter test

  build-ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: "3.x"
          cache: true
      - run: flutter pub get
      - run: flutter build ios --no-codesign --debug
      - uses: actions/upload-artifact@v4
        with:
          name: ios-simulator-build
          path: build/ios/iphonesimulator/
```

## Caching

```yaml
- uses: subosito/flutter-action@v2
  with:
    flutter-version: "3.x"
    cache: true

- uses: actions/cache@v4
  with:
    path: |
      ~/.cocoapods
      ios/Pods
    key: ${{ runner.os }}-pods-${{ hashFiles('ios/Podfile.lock') }}
```

## Code Signing

Release signing uses GitHub Secrets and requires `CONFIRM_RELEASE_SIGNING`:

```yaml
- name: Install signing certificate
  if: github.event_name == 'workflow_dispatch'
  run: |
    echo $BUILD_CERTIFICATE_BASE64 | base64 --decode > cert.p12
    security create-keychain -p $KEYCHAIN_PASSWORD build.keychain
    ...
  env:
    BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
    BUILD_CERTIFICATE_PASSWORD: ${{ secrets.BUILD_CERTIFICATE_PASSWORD }}
    KEYCHAIN_PASSWORD: ${{ secrets.KEYCHAIN_PASSWORD }}
    APPLE_TEAM_ID: ${{ secrets.APPLE_TEAM_ID }}
```

## Required Secrets

| Secret | Description |
|---|---|
| `BUILD_CERTIFICATE_BASE64` | Base64-encoded distribution certificate (.p12) |
| `BUILD_CERTIFICATE_PASSWORD` | Certificate password |
| `KEYCHAIN_PASSWORD` | Temporary keychain password |
| `APPLE_TEAM_ID` | Apple Developer Team ID |
| `PROVISIONING_PROFILE_BASE64` | Base64-encoded provisioning profile |
| `SLACK_WEBHOOK_URL` | Slack webhook for failure notifications |
