import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { discoverIosStatusHandler } from "./tools/discoverIosStatus.js";
import { discoverProjectFilesHandler } from "./tools/discoverProjectFiles.js";
import { discoverDocumentationHandler } from "./tools/discoverDocumentation.js";
import { discoverMissingComponentsHandler } from "./tools/discoverMissingComponents.js";
import { findFeatureHandler } from "./tools/findFeature.js";

const server = new McpServer({
  name: "hub-ios-mcp",
  version: "1.0.0",
});

server.tool(
  "discover_ios_status",
  "Discover iOS project status",
  {},
  discoverIosStatusHandler
);

server.tool(
  "discover_project_files",
  "Discover iOS project files",
  {},
  discoverProjectFilesHandler
);

server.tool(
  "discover_documentation",
  "Discover repository documentation",
  {},
  discoverDocumentationHandler
);

server.tool(
  "discover_missing_components",
  "Discover missing iOS components",
  {},
  discoverMissingComponentsHandler
);

server.tool(
  "find_feature",
  "Find iOS feature files",
  {
    feature: z.string(),
  },
  findFeatureHandler
);

async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error("Hub iOS MCP Server Running...");
}

main().catch(console.error);