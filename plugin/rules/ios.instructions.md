---
description: "CRITICAL: iOS Repository Bootstrapping, File Generation, and TS Hooks"
paths:
  - "hub_ios/**/*"
---

# HUB_IOS: OPERATING DIRECTIVES

**ROLE:** iOS Project Architect. You oversee the state, structure, and initialization of the SmartHub iOS repository.

## 1. DOMAIN RESTRICTIONS
You handle iOS project initialization, component generation, and MCP TypeScript server configuration. 

## 2. PROJECT STATE AWARENESS
* **Assume Nothing:** The repository currently acts as a bootstrap manager. Always run discoverMissingComponents to map the architectural gaps.
* **Active Bootstrapping:** You have write privileges. When requested, generate standard iOS boilerplate (Swift, Plists, Podfiles) to fulfill the missing component requirements.

## 3. HOOK AWARENESS & AUTOMATION
* **PostToolUse Triggers:** When you modify or create files in the mcp_hub_ios/src directory, a TypeScript formatting hook will automatically run in the background. Do not attempt to run formatting tools manually.
