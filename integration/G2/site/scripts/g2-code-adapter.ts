// @ts-nocheck
export function extractAndAdaptG2Code(originalG2SourceCode: string, chartRefName = "chartRef.current") {
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
    if (originalG2SourceCode.includes("new Chart(") && !Array.from(imports).some((imp: string) => imp.includes("@antv/g2"))) {
        imports.add('import { Chart } from "@antv/g2";');
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
    const topLevelDeclarationRegex = /^(?:export\s+)?(?:async\s+)?(?:const|let|var|function|class)\s+([a-zA-Z_]\w*)\s*[\s\S]*?(?:;|}(?!(?:\s*else|\s*catch|\s*finally|\s*\.\s*\w+|\s*,)))[\s;]*(?=\s*\n|\s*$|^(?:export|async|const|let|var|function|class))/gm;
    
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
        
        // Always attempt to replace literal 'chart' and 'chart.'
        helperCode = helperCode.replace(/\bchart\.(?!\w)/g, `${chartRefName}.`);
        helperCode = helperCode.replace(/\bchart\b(?!\.|\w)/g, `${chartRefName}`);

        // If originalChartVarName was identified and is different from 'chart', replace it too.
        if (originalChartVarName && originalChartVarName !== 'chart') {
            helperCode = helperCode.replace(
                new RegExp(`\\b${originalChartVarName}\\.(?!\\w)`, "g"), 
                `${chartRefName}.`
            );
            helperCode = helperCode.replace(
                new RegExp(`\\b${originalChartVarName}\\b(?!\\.|\\w)`, "g"), 
                `${chartRefName}`
            );
        }
    }

    // 3. Extract the G2 chart initialization logic and subsequent code
    if (chartVarMatch) { 
        let chartArgs = chartVarMatch[2];

        chartArgs = chartArgs.replace(
            /container\s*:\s*(['"`])?[a-zA-Z0-9_]+(['"`])?/,
            `container: ${chartRefName}`
        );
        chartArgs = chartArgs.replace(
            /container\s*:\s*document\.getElementById\([^)]+\)/,
            `container: ${chartRefName}`
        );

        g2CodeBlock = `${chartRefName} = new Chart(${chartArgs});\n`;

        const postInitializationCode = originalG2SourceCode.substring(initializationEndIndex);
        
        let adaptedPostInitializationCode = postInitializationCode;

        // Always attempt to replace literal 'chart' and 'chart.'
        adaptedPostInitializationCode = adaptedPostInitializationCode.replace(
            /\bchart\.(?!\w)/g,
            `${chartRefName}.`
        );
        adaptedPostInitializationCode = adaptedPostInitializationCode.replace(
            /\bchart\b(?!\.|\w)/g,
            `${chartRefName}`
        );
        
        // If originalChartVarName was identified and is different from 'chart', replace it too.
        if (originalChartVarName && originalChartVarName !== 'chart') {
            adaptedPostInitializationCode = adaptedPostInitializationCode.replace(
                new RegExp(`\\b${originalChartVarName}\\.(?!\\w)`, "g"), 
                `${chartRefName}.`
            );
            adaptedPostInitializationCode = adaptedPostInitializationCode.replace(
                new RegExp(`\\b${originalChartVarName}\\b(?!\\.|\\w)`, "g"), 
                `${chartRefName}`
            );
        }

        g2CodeBlock += adaptedPostInitializationCode;

        const renderCallPatternInAdapted = new RegExp(`\\b${chartRefName.replace('.', '\\.')}\\.render\\s*\\(\\s*\\)\\s*;`);
        if (!renderCallPatternInAdapted.test(adaptedPostInitializationCode)) {
            g2CodeBlock += `\n// TODO: Ensure '${chartRefName}.render()' is called appropriately.`;
            
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
        g2CodeBlock += `// Please review the original script and adapt the G2 logic, ensuring to use '${chartRefName}'.\n`;
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
        displaySnippet = displaySnippet.replace(/\bchart\.(?!\w)/g, `${chartRefName}.`);
        displaySnippet = displaySnippet.replace(/\bchart\b(?!\.|\w)/g, `${chartRefName}`);
        // If originalChartVarName was known and different, also try to adapt it in the snippet
        if (originalChartVarName && originalChartVarName !== 'chart') {
            displaySnippet = displaySnippet.replace(new RegExp(`\\b${originalChartVarName}\\.(?!\\w)`, "g"), `${chartRefName}.`);
            displaySnippet = displaySnippet.replace(new RegExp(`\\b${originalChartVarName}\\b(?!\\.|\\w)`, "g"), `${chartRefName}`);
        }
        g2CodeBlock += `// (Attempted to adapt chart references to '${chartRefName}' in the snippet below)\n`;
        
        g2CodeBlock += displaySnippet.split('\n').map(l => `// ${l}`).join('\n');
    }

    return {
        imports: Array.from(imports).join("\n"),
        g2Code: g2CodeBlock.trim(), 
        helpers: helperCode.trim() 
    };
}