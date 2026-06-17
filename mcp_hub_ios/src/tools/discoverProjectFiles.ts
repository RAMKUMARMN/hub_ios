import fs from "fs";
import { HUB_IOS_PATH } from "../config.js";

export async function discoverProjectFilesHandler() {
  const files = fs.readdirSync(HUB_IOS_PATH);

  const projectFiles = files.filter(
    file =>
      file.endsWith(".xcodeproj") ||
      file.endsWith(".xcworkspace") ||
      file === "Package.swift"
  );

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(projectFiles, null, 2),
      },
    ],
  };
}