# Project Structure Skill

Purpose: Acquire and summarize repository structure, dependency graph, and suggest refactor or modularization strategies.

When to use:
- Get an overview of modules, targets, and where responsibilities live.
- Propose splitting large monolithic targets into smaller modules.
- Create migration plans (e.g., to Swift Package Manager or feature modules).

Context to provide:
- Root of repository and where Xcode workspace or Package.swift lives.
- Any constraints: CI, release cadence, supported OS versions.

Response format:
- Top-level bullet summary of modules and important files.
- Concrete refactor suggestions with estimated steps and risk notes.

Example prompts:
- "Summarize this repo’s iOS targets and recommend three ways to reduce build times."
- "Propose a module layout to isolate networking, persistence, and UI. Include an incremental migration plan."
