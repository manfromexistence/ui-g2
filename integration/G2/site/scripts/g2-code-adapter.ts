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
    const chartInitializationRegex = /(?:const|let)\s+([a-zA-Z_]\w*)\s*=\s*new\s+Chart\s*\(([\s\S]*?)\);([\s\S]*?)(\b\1\b\.render\s*\(\s*\)\s*;)/m;
    const chartMatchSimpleRender = originalG2SourceCode.match(chartInitializationRegex);

    if (chartMatchSimpleRender) {
        let chartVar = chartMatchSimpleRender[1];
        let chartArgs = chartMatchSimpleRender[2];
        let chartOperations = chartMatchSimpleRender[3];

        chartArgs = chartArgs.replace(
            /container\s*:\s*(['"`])?[a-zA-Z0-9_]+(['"`])?/,
            `container: ${chartRefName}`
        );
        chartArgs = chartArgs.replace(
            /container\s*:\s*document\.getElementById\([^)]+\)/,
            `container: ${chartRefName}`
        );

        g2CodeBlock = `g2ChartInstance.current = new Chart(${chartArgs});\n`;
        const operationsAdapted = chartOperations.replace(new RegExp(`\\b${chartVar}\\.`, "g"), "g2ChartInstance.current.");
        g2CodeBlock += operationsAdapted;
        g2CodeBlock += `g2ChartInstance.current.render();`;

    } else {
        const chartVarRegex = /(?:const|let)\s+([a-zA-Z_]\w*)\s*=\s*new\s+Chart\s*\(([\s\S]*?)\);/m;
        const chartVarMatch = originalG2SourceCode.match(chartVarRegex);
        if (chartVarMatch) {
            let chartVar = chartVarMatch[1];
            let chartArgs = chartVarMatch[2];
            chartArgs = chartArgs.replace(
                /container\s*:\s*(['"`])?[a-zA-Z0-9_]+(['"`])?/,
                `container: ${chartRefName}`
            );
            chartArgs = chartArgs.replace(
                /container\s*:\s*document\.getElementById\([^)]+\)/,
                `container: ${chartRefName}`
            );

            g2CodeBlock = `const ${chartVar} = new Chart(${chartArgs});\n`;
            g2CodeBlock += `// TODO: Manually adapt the rest of the G2 chart logic from the original script below.\n`;
            g2CodeBlock += `// Ensure you call ${chartVar}.render() and assign to g2ChartInstance.current if needed.\n`;
            g2CodeBlock += `// Original script content (partial):\n`;
            const snippetStart = originalG2SourceCode.indexOf(chartVarMatch[0]) + chartVarMatch[0].length;
            g2CodeBlock += originalG2SourceCode.substring(snippetStart, snippetStart + 500).split('\n').map(l => `// ${l}`).join('\n') + "\n...";
            g2CodeBlock += `\n// g2ChartInstance.current = ${chartVar}; // Example assignment`;
        } else {
            g2CodeBlock = `// TODO: Could not automatically extract G2 chart logic.\n// Please paste and adapt G2 code from original script here.`;
        }
    }

    return {
        imports: Array.from(imports).join("\n"),
        g2Code: g2CodeBlock,
        helpers: helperCode
    };
}