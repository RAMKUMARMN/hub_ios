# Swift Language Skill

Purpose: Swift-specific patterns, idiomatic refactors, concurrency (async/await), and API design.

When to use:
- Refactor Swift methods into clearer, testable components.
- Convert completion-based APIs to async/await.
- Suggest protocol-oriented designs and value-type usage.

Context to provide:
- Swift language version and toolchain constraints.
- Any style/convention files (SwiftLint config, format rules).

Response format:
- Explain rationale (1-2 lines), then provide code changes with file paths.
- Include tests where relevant (unit test examples using XCTest).

Example prompts:
- "Refactor `UserManager.fetchProfile(completion:)` to `async throws` and update callers. Show patch and unit test."
- "Suggest performance improvements for parsing JSON into model structs; include a benchmark approach."

Safety:
- Avoid changing public API surface without migration guidance.
