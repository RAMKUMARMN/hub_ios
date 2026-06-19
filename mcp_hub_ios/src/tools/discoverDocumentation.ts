import fs from "fs";
import path from "path";
import { HUB_IOS_PATH } from "../config.js";

export async function discoverDocumentationHandler() {
  const readme = path.join(HUB_IOS_PATH, "README.md");

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            readmeExists: fs.existsSync(readme),
          },
          null,
          2
        ),
      },
    ],
  };
}