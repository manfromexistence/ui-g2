import fs from "fs";
import path from "path";

const indexFilePath = path.resolve(
  __dirname,
  "../registry/default/g2/index.ts"
);
const pageFilePath = path.resolve(
  __dirname,
  "../app/(app)/visualizations/page.tsx"
);

function generateComponentsCode() {
  // Read the index.ts file
  const indexFileContent = fs.readFileSync(indexFilePath, "utf-8");

  // Extract component names
  const componentMatches = indexFileContent.matchAll(
    /export { default as (\w+) } from ".*";/g
  );
  const components = Array.from(componentMatches).map((match) => match[1]);

  // Generate JSX code for rendering components
  const componentsCode = components
    .map(
      (component) => `
        <div>
          <h3>${component}</h3>
          <Charts.${component} />
        </div>
      `
    )
    .join("\n");

  return componentsCode;
}

function updatePageFile() {
  // Read the existing page.tsx file
  const pageFileContent = fs.readFileSync(pageFilePath, "utf-8");

  // Generate the new components code
  const componentsCode = generateComponentsCode();

  // Find the insertion point for the components
  const insertionPointStart = '<div className="grid flex-1 gap-12">';
  const insertionPointEnd = "</div>";

  const startIndex = pageFileContent.indexOf(insertionPointStart);
  const endIndex = pageFileContent.indexOf(insertionPointEnd, startIndex);

  if (startIndex === -1 || endIndex === -1) {
    console.error(
      `Placeholder "${insertionPointStart}" not found in page.tsx.`
    );
    return;
  }

  // Extract existing components
  const existingComponents = pageFileContent
    .slice(startIndex + insertionPointStart.length, endIndex)
    .trim();

  // Avoid duplicating components by checking for already existing ones
  const newComponents = componentsCode
    .split("\n")
    .filter((line) => !existingComponents.includes(line))
    .join("\n");

  // Combine existing components with new components
  const updatedComponents = `${existingComponents}\n${newComponents}`.trim();

  // Replace the placeholder with the updated components
  const updatedPageFileContent = `${pageFileContent.slice(
    0,
    startIndex + insertionPointStart.length
  )}\n${updatedComponents}\n${pageFileContent.slice(endIndex)}`;

  // Write the updated content back to the page.tsx file
  fs.writeFileSync(pageFilePath, updatedPageFileContent, "utf-8");
  console.log("page.tsx has been updated with all components.");
}

// Run the script
try {
  console.log("Updating page.tsx with components...");
  updatePageFile();
  console.log("Update complete.");
} catch (error) {
  console.error("An error occurred:", error);
}
