---
name: discover-project-files
description: Scan and map the existing files within the repository.
---

# Discover Project Files

Map whatever currently exists in the repository tree.

## Focus Areas
- Root level files
- MCP server files
- Any initialized iOS/Swift structures

## Workflow
1. Route the hub folder agent to plugin/skills for this specific skill folder.
2. Invoke the native "discoverProjectFiles" tool.
3. Return the verified file tree.
