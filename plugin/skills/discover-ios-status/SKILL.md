---
name: discover-ios-status
description: Assess the initialization state and overall health of the iOS repository.
---

# Discover iOS Status

Analyze the repository to determine if the iOS project has been properly bootstrapped.

## Focus Areas
- Project initialization state
- Root directory configuration

## Workflow
1. Route the hub folder agent to plugin/skills for this specific skill folder.
2. Invoke the native "discoverIosStatus" tool.
3. Return the status report.
