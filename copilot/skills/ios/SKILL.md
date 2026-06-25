# iOS Development Skill

Purpose: Help with iOS-specific code, Xcode projects, Swift package management, and platform conventions.

When to use:
- Implement or review Swift code in this repository.
- Generate or update unit/UI tests for iOS targets.
- Diagnose Xcode build errors and suggest fixes.
- Create migration steps for Swift versions or platform changes.

Context to provide (always):
- Target platform (iOS, watchOS, tvOS) and minimum OS version.
- Xcode project or SwiftPM package path.
- Swift version and any important dependencies (CocoaPods/SwiftPM/Carthage).
- Repro steps, error logs, or failing tests when applicable.

Response format:
- Short summary of change or diagnosis.
- Concrete code diffs or patch-style snippets.
- Commands to run locally (build/test/lint) and expected output.

Example prompts:
- "Using the `App` target in this repo, implement a `NetworkClient` that uses `URLSession` and retries transient failures. Show file path and full Swift code."
- "Xcode build fails with "Thread 1: signal SIGABRT" on launch — analyze typical causes and list targeted fixes. Include how to reproduce and one-line commands to gather logs."

Limitations:
- Ask for project-specific paths and logs if not provided.
- Prefer small incremental patches rather than large monolithic rewrites.
