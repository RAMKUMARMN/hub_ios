import fs from "fs";
import { HUB_IOS_PATH } from "../config.js";

export async function discoverMissingComponentsHandler() {
  const expected = [
    "Views",
    "Models",
    "Services",
    "ViewModels"
  ];

  const existing = fs.readdirSync(HUB_IOS_PATH);

  const missing = expected.filter(
    item => !existing.includes(item)
  );

  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(missing, null, 2),
      },
    ],
  };
}