---
name: discover-missing-components
description: Identify missing foundational iOS files (Xcode project, Podfile, App source).
---

# Discover Missing Components

Perform a gap analysis on the repository structure.

## Focus Areas
- Missing workspace/project files (.xcodeproj, .xcworkspace)
- Missing dependency managers (Podfile, Package.swift)
- Missing source directories

## Workflow
1. Route the hub folder agent to plugin/skills for this specific skill folder.
2. Invoke the native "discoverMissingComponents" tool.
3. Return the list of required architectural gaps.
