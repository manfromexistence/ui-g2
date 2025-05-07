// @ts-nocheck
export function extractAndAdaptG2Code(originalG2SourceCode: string, chartRefName = "chartRef.current") {
    let g2CodeBlock = "";
    const imports = new Set();
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

    // 2. Attempt to extract helper functions and top-level const/let (heuristic)
    // Original regex: /^(?:export\s+)?(?:const|let|function)\s+([a-zA-Z0-9_]+)\s*=\s*[\s\S]*(?:;|}(?!\s*else|\s*catch|\s*finally))/gm;
    // Modified regex to be non-greedy, include class/var/async, and refine end conditions:
    const topLevelDeclarationRegex = /^(?:export\s+)?(?:async\s+)?(?:const|let|var|function|class)\s+([a-zA-Z_]\w*)\s*[\s\S]*?(?:;|}(?!(?:\s*else|\s*catch|\s*finally|\s*\.\s*\w+|\s*,)))[\s;]*(?=\s*\n|\s*$|^(?:export|async|const|let|var|function|class))/gm;
    let helperMatch;
    const potentialHelpers = [];
    const codeWithoutImports = originalG2SourceCode.replace(importRegex, '');

    while((helperMatch = topLevelDeclarationRegex.exec(codeWithoutImports)) !== null) {
        if (!helperMatch[0].includes("new Chart(")) {
            potentialHelpers.push(helperMatch[0]);
        }
    }
    if (potentialHelpers.length > 0) {
        helperCode = "// Helper code extracted from original (review and adapt if necessary):\n" + potentialHelpers.join("\n\n") + "\n";
    }

    // 3. Extract the G2 chart initialization logic
    // Updated regex to include 'var'
    const chartVarRegex = /(?:const|let|var)\s+([a-zA-Z_]\w*)\s*=\s*new\s+Chart\s*\(([\s\S]*?)\);/m;
    const chartVarMatch = originalG2SourceCode.match(chartVarRegex);

    if (chartVarMatch) {
        const originalChartVarName = chartVarMatch[1];
        let chartArgs = chartVarMatch[2];

        // Adapt container argument
        chartArgs = chartArgs.replace(
            /container\s*:\s*(['"`])?[a-zA-Z0-9_]+(['"`])?/,
            `container: ${chartRefName}`
        );
        chartArgs = chartArgs.replace(
            /container\s*:\s*document\.getElementById\([^)]+\)/,
            `container: ${chartRefName}`
        );

        g2CodeBlock = `g2ChartInstance.current = new Chart(${chartArgs});\n`;

        const initializationEndIndex = chartVarMatch.index + chartVarMatch[0].length;
        const postInitializationCode = originalG2SourceCode.substring(initializationEndIndex);
        
        // Adapt all subsequent code by replacing the original chart variable references
        let adaptedPostInitializationCode = postInitializationCode.replace(
            new RegExp(`\\b${originalChartVarName}\\.`, "g"), 
            "g2ChartInstance.current."
        );

        g2CodeBlock += adaptedPostInitializationCode;

        // Check if a render call was adapted. If not, add a TODO.
        const renderCallPatternInAdapted = /g2ChartInstance\.current\.render\s*\(\s*\)\s*;/;
        if (!renderCallPatternInAdapted.test(adaptedPostInitializationCode)) {
            g2CodeBlock += `\n// TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.`;
            
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
        }
    } else {
        // Fallback if no `new Chart(...)` was found by the regex
        g2CodeBlock = `// TODO: Could not automatically find 'new Chart(...)' initialization.\n`;
        g2CodeBlock += `// Please paste and adapt G2 code from original script here, ensuring 'container: ${chartRefName}' and using 'g2ChartInstance.current'.\n`;
        g2CodeBlock += `// Original script content (partial for reference):\n`;
        const snippetMaxLength = 1000;
        let snippet = originalG2SourceCode.substring(0, snippetMaxLength);
        if (originalG2SourceCode.length > snippetMaxLength) {
            snippet += "\n// ... (code truncated)";
        }
        g2CodeBlock += snippet.split('\n').map(l => `// ${l}`).join('\n');
    }

    return {
        imports: Array.from(imports).join("\n"),
        g2Code: g2CodeBlock.trim(), // Trim potential trailing newlines
        helpers: helperCode
    };
}