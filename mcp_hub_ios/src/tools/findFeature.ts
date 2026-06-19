import fs from "fs";
import path from "path";
import { HUB_IOS_PATH } from "../config.js";

export async function findFeatureHandler({
  feature,
}: {
  feature: string;
}) {
  const matches: string[] = [];

  function scan(dir: string) {
    const entries = fs.readdirSync(dir, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (
        entry.name
          .toLowerCase()
          .includes(feature.toLowerCase())
      ) {
        matches.push(
          path.relative(HUB_IOS_PATH, fullPath)
        );
      }
    }
  }

  scan(HUB_IOS_PATH);

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(matches, null, 2),
      },
    ],
  };
}