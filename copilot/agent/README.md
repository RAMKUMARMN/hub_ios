# Copilot Agents for this iOS Project

This folder contains agent definitions tuned for iOS development workflows.

Included agents:
- ios-developer.agent.md — implement features and refactor with tests.
- ios-tester.agent.md — write and stabilize XCTest/XCUITest cases.
- ios-ci.agent.md — CI/CD recommendations, caching, and workflow snippets.
- ios-code-reviewer.agent.md — focused code review persona.

How to use:
- When interacting with Copilot/agents, prefix prompts with the agent name and include requested context sections from the agent file (e.g., project paths, schemes, logs).
- Ask for patches, not large rewrites; the agents favor small, test-backed changes.

If you want additional specialized agents (SwiftUI, CoreData, Performance Profiler), tell me which ones to add.