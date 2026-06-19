# UI Testing (XCUITest) Skill

Purpose: Generate, maintain, and diagnose UI tests for iOS apps using XCUITest and XCTest.

When to use:
- Create reliable UI tests for flows (login, onboarding, settings).
- Convert flaky tests into stable, deterministic tests.
- Suggest accessibility identifiers and test hooks.

Context to provide:
- App target and example flows (steps a user takes).
- Current failing test logs or screenshots if available.

Response format:
- Provide test file path, full XCTest/XCUITest code, and setup instructions.
- Recommend accessibility identifiers and explain why.

Example prompts:
- "Write an XCUITest that signs in via the main screen and asserts the dashboard loads. Use `XCUIApplication()` and proper waiting."
- "This UI test intermittently fails at `tap()` — suggest robust wait strategies and a fixed test implementation."
