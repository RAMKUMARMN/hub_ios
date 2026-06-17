import fs from "fs";
import { HUB_IOS_PATH } from "../config.js";

export async function discoverIosStatusHandler() {
  const files = fs.readdirSync(HUB_IOS_PATH);

  const initialized = files.some(
    file =>
      file.endsWith(".xcodeproj") ||
      file.endsWith(".xcworkspace") ||
      file === "Package.swift" ||
      file === "Sources" ||
      file === "Views"
  );

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(
          {
            initialized,
            files,
          },
          null,
          2
        ),
      },
    ],
  };
}