// @ts-nocheck
export function extractAndAdaptG2Code(
    originalG2SourceCode: string, 
    g2InstanceVarName = "g2ChartInstance.current", 
    domContainerVarName = "chartRef.current"
) {
    let g2CodeBlock = "";
    const imports = new Set<string>();
    let helperCode = "";

    // 1. Extract imports from @antv packages
    const importRegex = /import\s+{[^}]*}?\s*from\s+['"](@antv\/[a-zA-Z0-9_-]+[^'"]*)['"];?/g;
    let importMatch;
    while ((importMatch = importRegex.exec(originalG2SourceCode)) !== null) {
        imports.add(importMatch[0]);
    }
     // Add default G2 import if Chart is used but no specific import was found
    // Ensure 'register' is included if used for palettes.
    // The react-component-generator.ts will be responsible for importing and using the hook,
    // and then using G2's `register` with the resolved colors.
    if (originalG2SourceCode.includes("new Chart(") && !Array.from(imports).some((imp: string) => imp.includes("@antv/g2"))) {
        imports.add('import { Chart, register } from "@antv/g2";');
    } else {
        let g2ImportFound = false;
        let registerImported = false;
        imports.forEach(imp => {
            if (imp.includes("@antv/g2")) {
                g2ImportFound = true;
                if (imp.includes("register")) {
                    registerImported = true;
                }
            }
        });

        if (g2ImportFound && !registerImported) {
            imports.forEach(imp => {
                if (imp.includes("@antv/g2") && !imp.includes("register")) {
                    imports.delete(imp);
                    if (imp.includes("{") && imp.includes("}")) {
                         imports.add(imp.replace('}', ', register }'));
                    } else { // Fallback if import style is unusual, e.g. import * as G2 from '@antv/g2'
                         imports.add('import { register } from "@antv/g2";'); // Add separately
                    }
                }
            });
        } else if (!g2ImportFound && originalG2SourceCode.includes("new Chart(")) {
             // This case should be covered by the first if, but as a safeguard:
             imports.add('import { Chart, register } from "@antv/g2";');
        }
    }

    let originalChartVarName = null;
    let initializationStartIndex = -1;
    let initializationEndIndex = -1; 

    const chartVarRegex = /(?:const|let|var)\s+([a-zA-Z_]\w*)\s*=\s*new\s+Chart\s*\(([\s\S]*?)\);/m;
    const chartVarMatch = originalG2SourceCode.match(chartVarRegex);

    if (chartVarMatch) {
        originalChartVarName = chartVarMatch[1];
        initializationStartIndex = chartVarMatch.index;
        initializationEndIndex = chartVarMatch.index + chartVarMatch[0].length;
    }

    // 2. Attempt to extract helper functions and top-level const/let.
    // These are items defined *before* the main chart initialization.
    const potentialHelpers = [];
    // Refined regex to better capture full bodies of multi-line helpers.
    // It looks for the start of the next declaration or the end of the string.
    const topLevelDeclarationRegex = /^(?:export\s+)?(?:async\s+)?(?:const|let|var|function(?:\s*\*)?|class)\s+([a-zA-Z_]\w*)\s*[\s\S]*?(?=\n\s*^(?:(?:export\s+)?(?:async\s+)?(?:const|let|var|function(?:\s*\*)?|class)\s+[a-zA-Z_]\w*)|^\s*$(?![\r\n]))/gm;
    
    const codeToSearchForHelpers = initializationStartIndex !== -1 
        ? originalG2SourceCode.substring(0, initializationStartIndex) 
        : originalG2SourceCode; // If no chart init found, search whole script.

    let regexMatchForHelpers;
    topLevelDeclarationRegex.lastIndex = 0; // Reset regex state

    while((regexMatchForHelpers = topLevelDeclarationRegex.exec(codeToSearchForHelpers)) !== null) {
        if (!regexMatchForHelpers[0].includes("new Chart(")) { // Should not be needed if searching before init
            potentialHelpers.push(regexMatchForHelpers[0]);
        }
    }
    
    if (potentialHelpers.length > 0) {
        helperCode = "// Helper code extracted from original (review and adapt if necessary):\n" + potentialHelpers.join("\n\n") + "\n";
        
        // Handle originalChartVarName first if it exists
        if (originalChartVarName) {
            helperCode = helperCode.replace(new RegExp(`\\b${originalChartVarName}\\.`, "g"), `${g2InstanceVarName}.`);
            helperCode = helperCode.replace(new RegExp(`\\b${originalChartVarName}\\b(?!\\.)`, "g"), `${g2InstanceVarName}`);
        }

        // Fallback for literal 'chart' if originalChartVarName was not 'chart' or was null
        if (originalChartVarName !== 'chart') {
            helperCode = helperCode.replace(/\bchart\./g, `${g2InstanceVarName}.`);
            helperCode = helperCode.replace(/\bchart\b(?!\.)/g, `${g2InstanceVarName}`);
        }
    }

    // Removed static palette registration from helperCode.
    // The React component will use the hook to get colors and register the palette.

    // 3. Extract the G2 chart initialization logic and subsequent code
    if (chartVarMatch) { 
        let chartArgs = chartVarMatch[2];

        // Use domContainerVarName for the container property
        chartArgs = chartArgs.replace(
            /container\s*:\s*(['"`])?[a-zA-Z0-9_]+(['"`])?/,
            `container: ${domContainerVarName}`
        );
        chartArgs = chartArgs.replace(
            /container\s*:\s*document\.getElementById\([^)]+\)/,
            `container: ${domContainerVarName}`
        );

        // Use g2InstanceVarName for assigning the new Chart instance
        let chartInitializationCode = `${g2InstanceVarName} = new Chart(${chartArgs});\n`;

        const postInitializationCode = originalG2SourceCode.substring(initializationEndIndex);
        
        let adaptedPostInitializationCode = postInitializationCode;

        // Handle originalChartVarName first if it exists
        if (originalChartVarName) {
            adaptedPostInitializationCode = adaptedPostInitializationCode.replace(
                new RegExp(`\\b${originalChartVarName}\\.`, "g"), 
                `${g2InstanceVarName}.`
            );
            adaptedPostInitializationCode = adaptedPostInitializationCode.replace(
                new RegExp(`\\b${originalChartVarName}\\b(?!\\.)`, "g"), 
                `${g2InstanceVarName}`
            );
        }
        
        // Fallback for literal 'chart' if originalChartVarName was not 'chart' or was null
        if (originalChartVarName !== 'chart') {
            adaptedPostInitializationCode = adaptedPostInitializationCode.replace(
                /\bchart\./g,
                `${g2InstanceVarName}.`
            );
            adaptedPostInitializationCode = adaptedPostInitializationCode.replace(
                /\bchart\b(?!\.)/g,
                `${g2InstanceVarName}`
            );
        }
        
        // Code to apply the shadcnPalette theme.
        // The palette 'shadcnPalette' is expected to be registered by the React component
        // using the useShadcnChartColors hook before this code runs.
        const themeOverrideCode = `${g2InstanceVarName}.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });`;
        
        let finalAdaptedCode = chartInitializationCode; // Start with the chart init

        let tempPostInitOps = adaptedPostInitializationCode;
        
        // Find the last existing .theme() call to append our specific palette theme after it
        let lastThemeCallEnd = -1;
        // Regex to find .theme() calls for the specific g2InstanceVarName
        const themeCallEndRegex = new RegExp(`\\b${g2InstanceVarName.replace('.', '\\.')}\\.theme\\s*\\([^)]*\\)(\\.then\\s*\\([^)]*\\))?;?`, 'g');

        let match;
        while ((match = themeCallEndRegex.exec(tempPostInitOps)) !== null) {
            lastThemeCallEnd = match.index + match[0].length;
        }

        if (lastThemeCallEnd !== -1) {
            // Insert after the last existing theme call in the post-initialization code
            tempPostInitOps = tempPostInitOps.substring(0, lastThemeCallEnd) + "\n" + themeOverrideCode + tempPostInitOps.substring(lastThemeCallEnd);
        } else {
            // No existing theme call in post-init code, prepend the theme override to post-init operations
            tempPostInitOps = "\n" + themeOverrideCode + "\n" + tempPostInitOps;
        }
        
        finalAdaptedCode += tempPostInitOps;
        g2CodeBlock = finalAdaptedCode;

        const renderCallPatternInAdapted = new RegExp(`\\b${g2InstanceVarName.replace('.', '\\.')}\\.render\\s*\\(\\s*\\)\\s*;`);
        if (!renderCallPatternInAdapted.test(adaptedPostInitializationCode)) {
            g2CodeBlock += `\n// TODO: Ensure '${g2InstanceVarName}.render()' is called appropriately.`;
            
            if (originalChartVarName) {
                const originalRenderRegex = new RegExp(`\\b${originalChartVarName}\\.render\\s*\\(\\s*\\)\\s*;`);
                if (!postInitializationCode.match(originalRenderRegex)) {
                     g2CodeBlock += `\n// Original G2 script operations after 'new Chart(...)' did not appear to include a render call for '${originalChartVarName}'.`;
                     g2CodeBlock += `\n// Review original script and adapt necessary logic, including the render call.`;
                     g2CodeBlock += `\n// Original script content after initialization (partial for reference):\n`;
                     const snippetMaxLength = 500; 
                     let snippet = postInitializationCode.trimStart().substring(0, snippetMaxLength);
                     if (postInitializationCode.trimStart().length > snippetMaxLength) {
                         snippet += "\n// ... (code truncated)";
                     }
                     g2CodeBlock += snippet.split('\n').map(l => `// ${l}`).join('\n');
                }
            } else {
                 g2CodeBlock += `\n// Could not identify original chart variable name to check for its render call.`;
            }
        }
    } else {
        // Fallback if no `new Chart(...)` was found by the regex
        g2CodeBlock = `// TODO: Could not automatically find 'new Chart(...)' initialization.\n`;
        g2CodeBlock += `// Please review the original script and adapt the G2 logic, ensuring to use '${g2InstanceVarName}' for the chart instance and '${domContainerVarName}' for the container.\n`;
        
        // Suggest applying the theme, assuming palette is registered by the component
        g2CodeBlock += `\n// Remember to register 'shadcnPalette' with resolved colors and apply the theme: \n// register('palette.shadcnPalette', () => resolvedShadcnColors); \n// ${g2InstanceVarName}.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });\n`;

        if (helperCode.trim().length > 0) {
             g2CodeBlock += `// Some top-level declarations might have been extracted into 'helpers' above.\n`;
        }
        g2CodeBlock += `// Original script content (partial for reference):\n`;
        
        const snippetMaxLength = 1000;
        let displaySnippet = originalG2SourceCode.substring(0, snippetMaxLength);
        if (originalG2SourceCode.length > snippetMaxLength) {
            displaySnippet += "\n// ... (code truncated)";
        }
        
        // Basic adaptation attempt for the snippet
        if (originalChartVarName && originalChartVarName !== 'chart') {
            displaySnippet = displaySnippet.replace(new RegExp(`\\b${originalChartVarName}\\.`, "g"), `${g2InstanceVarName}.`);
            displaySnippet = displaySnippet.replace(new RegExp(`\\b${originalChartVarName}\\b(?!\\.)`, "g"), `${g2InstanceVarName}`);
        }
        // Always try to adapt literal 'chart' in snippet as it's a common case / fallback
        displaySnippet = displaySnippet.replace(/\bchart\./g, `${g2InstanceVarName}.`);
        displaySnippet = displaySnippet.replace(/\bchart\b(?!\.)/g, `${g2InstanceVarName}`);
        
        g2CodeBlock += `// (Attempted to adapt chart references to '${g2InstanceVarName}' in the snippet below)\n`;
        
        g2CodeBlock += displaySnippet.split('\n').map(l => `// ${l}`).join('\n');
    }

    return {
        imports: Array.from(imports).join("\n"),
        g2Code: g2CodeBlock.trim(), 
        helpers: helperCode.trim() 
    };
}