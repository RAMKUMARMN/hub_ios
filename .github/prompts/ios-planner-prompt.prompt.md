---
mode: agent
agent: ios-planner
name: ios-planner-prompt
description: "Prompt for the ios-planner agent. Generates structured implementation plans for Xcode config changes, APNs setup, Universal Links, platform features, or CI pipelines."
---

### Requirements

1. **Explore the codebase** to understand current file structure, existing patterns, and conventions.
2. **Produce a numbered step-by-step plan** covering each file change required.
3. **Identify dependencies** between steps (e.g., enable capability before configuring entitlements).
4. **Risk assessment** — flag breaking changes, signing impacts, or build-breaking changes.
5. **Validation plan** — list `flutter analyze`, `flutter build ios --no-codesign`, or other commands for each stage.

### Constraints

- Do not implement code — output the plan only
- Reference specific file paths relative to repo root
- Follow existing conventions (Xcode patterns, Info.plist structure)

### Output Format

```
## Implementation Plan: [Title]

### Step 1: [File path]
Action: create | modify | delete
Details: [what to add/change]

### Step 2: ...
...

### Risk Assessment
- [Critical/Medium/Low] risks identified
- [Specific items]

### Validation Checklist
- [ ] `flutter analyze` passes
- [ ] `flutter build ios --no-codesign` compiles
```

### Usage Template

```
Plan the implementation of [describe task].
Consider [constraints or special requirements].
```
