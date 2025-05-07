import fs from "fs"
import path from "path"

const indexFilePath = path.resolve(
  __dirname,
  "../registry/default/g2/index.ts" // Corrected path
)
const pageFilePath = path.resolve(
  __dirname,
  "../app/(app)/visualizations/page.tsx" // Corrected path
)

function generateComponentsCode() {
  // Read the index.ts file
  const indexFileContent = fs.readFileSync(indexFilePath, "utf-8")

  // Extract component names and paths
  const componentMatches = indexFileContent.matchAll(
    /export { default as (\w+) } from ".*";/g
  )
  const components = Array.from(componentMatches).map((match) => match[1])

  // Generate JSX code for rendering components
  const componentsCode = components
    .map(
      (component) => `
        <div key="${component}">
          <h3>${component}</h3>
          <Charts.${component} />
        </div>
      `
    )
    .join("\n")

  return componentsCode
}

function updatePageFile() {
  // Read the existing page.tsx file
  const pageFileContent = fs.readFileSync(pageFilePath, "utf-8")

  // Generate the new components code
  const componentsCode = generateComponentsCode()

  // Find the insertion point for the components
  const insertionPoint = '<div className="grid flex-1 gap-12">'
  if (!pageFileContent.includes(insertionPoint)) {
    console.error(
      `Placeholder "${insertionPoint}" not found in page.tsx.`
    )
    return
  }

  // Insert the components code after the placeholder
  const updatedPageFileContent = pageFileContent.replace(
    insertionPoint,
    `${insertionPoint}\n${componentsCode}`
  )

  // Write the updated content back to the page.tsx file
  fs.writeFileSync(pageFilePath, updatedPageFileContent, "utf-8")
  console.log("page.tsx has been updated with all components.")
}

// Run the script
try {
  console.log("Updating page.tsx with components...")
  updatePageFile()
  console.log("Update complete.")
} catch (error) {
  console.error("An error occurred:", error)
}
