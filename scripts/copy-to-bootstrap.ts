import { readdir, stat, mkdir, copyFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

async function copyDirectory(source, destination) {
  if (!existsSync(destination)) {
    await mkdir(destination, { recursive: true });
  }

  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);

    const shouldSkip =
      [
        "node_modules",
        "k8s",
        ".storybook",
        "theme.css",
        "get-base-url.ts",
      ].some(
        (skipItem) => entry.name === skipItem || sourcePath.endsWith(skipItem)
      ) || sourcePath.includes("types");

    if (shouldSkip) {
      console.log(`Skipping ${sourcePath}`);
      continue;
    }

    if ((await stat(sourcePath)).isDirectory()) {
      await copyDirectory(sourcePath, destinationPath);
    } else {
      await copyFile(sourcePath, destinationPath);
    }
  }
}

async function main() {
  const source = join("admin");
  const destination = join("..", "bootstrap", "admin");

  console.info(`Copying files from ${source} to ${destination}...`);
  await copyDirectory(source, destination);
  console.log("Files copied successfully!");
}

main().catch((err) => {
  console.error("Error:", err);
});
