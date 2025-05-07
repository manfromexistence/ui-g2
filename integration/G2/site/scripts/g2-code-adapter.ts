// @ts-nocheck
export function extractAndAdaptG2Code(
    originalG2SourceCode: string, 
    g2InstanceVarName = "g2ChartInstance.current", 
    domContainerVarName = "chartRef.current"
) {
    let g2CodeBlock = "";
    const originalImports = new Set<string>();
    let helperCode = "";

    // 1. Extract imports from @antv packages
    const importRegex = /import\s+{[^}]*}?\s*from\s+['"](@antv\/[a-zA-Z0-9_-]+[^'"]*)['"];?/g;
    let importMatch;
    while ((importMatch = importRegex.exec(originalG2SourceCode)) !== null) {
        originalImports.add(importMatch[0]);
    }

    // Consolidate 'register' imports, prioritizing @antv/g2
    const finalImports = new Set<string>();
    let g2CoreRegisterImported = false;

    originalImports.forEach(imp => {
        if (imp.includes("@antv/g2") && imp.includes("register")) {
            g2CoreRegisterImported = true;
        }
    });

    if (originalG2SourceCode.includes("new Chart(") && !g2CoreRegisterImported) {
        let g2ImportLine = Array.from(originalImports).find(line => line.includes("@antv/g2") && !line.includes("register"));
        if (g2ImportLine) {
            originalImports.delete(g2ImportLine);
            if (g2ImportLine.includes("{") && g2ImportLine.includes("}")) {
                 g2ImportLine = g2ImportLine.replace('}', ', register }');
            } else { 
                 g2ImportLine += `\nimport { register } from "@antv/g2";`; 
            }
            originalImports.add(g2ImportLine);
            g2CoreRegisterImported = true;
        } else if (!Array.from(originalImports).some(line => line.includes("@antv/g2"))) {
            originalImports.add('import { Chart, register } from "@antv/g2";');
            g2CoreRegisterImported = true;
        }
    }
    
    originalImports.forEach(imp => {
        if (g2CoreRegisterImported && imp.includes("register") && !imp.includes("@antv/g2") && imp.startsWith("import") && imp.includes("@antv")) {
            let modifiedImp = imp.replace(/{\s*register\s*,?\s*/, '{ ').replace(/,\s*register\s*}/, ' }').replace(/{\s*register\s*}/, '{ }');
            if (modifiedImp.includes("{ } from")) { // Only register was imported
                // Skip adding this line
            } else if (modifiedImp.trim() === "import { } from" || modifiedImp.trim() === "import {} from") {
                // Skip if it becomes an empty import
            } else if (modifiedImp !== imp && modifiedImp.includes("{") && !modifiedImp.match(/{[^}]*\w/)) {
                // If it became `import { } from '...'` but originally had other imports, this logic is flawed.
                // For now, if it results in an empty curly brace but wasn't just `import {register}`, keep original.
                // This case is complex; the goal is to remove *only* register if other named imports exist.
                // A simple check: if `modifiedImp` still has other named imports, add it.
                // If `modifiedImp` is `import { , foo }` or `import { foo, }`, it needs cleanup.
                // Let's refine:
                modifiedImp = modifiedImp.replace(/{\s*,/, '{').replace(/,\s*}/, '}'); // Clean up dangling commas
                if (modifiedImp.includes("{ }")) { // If it truly became empty
                    // don't add
                } else {
                    finalImports.add(modifiedImp);
                }
            } else {
                 finalImports.add(modifiedImp);
            }
        } else {
            finalImports.add(imp);
        }
    });
     // Ensure Chart from @antv/g2 is imported if new Chart() is used and not already handled
    if (originalG2SourceCode.includes("new Chart(") && !Array.from(finalImports).some(imp => imp.includes("Chart") && imp.includes("@antv/g2"))) {
        let g2ImportLine = Array.from(finalImports).find(line => line.includes("@antv/g2"));
        if (g2ImportLine && g2ImportLine.includes("register") && !g2ImportLine.includes("Chart")) {
            finalImports.delete(g2ImportLine);
            finalImports.add(g2ImportLine.replace('{', '{ Chart, '));
        } else if (!g2ImportLine) {
            finalImports.add('import { Chart, register } from "@antv/g2";');
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
        helperCode = potentialHelpers.join("\n\n") + "\n";
        
        // More conservative replacement for helperCode to protect function signatures.
        // Only replace `.` access. Standalone variables (potential parameters) are not replaced.
        if (originalChartVarName && originalChartVarName !== g2InstanceVarName) {
            helperCode = helperCode.replace(new RegExp(`\\b${originalChartVarName}\\.`, "g"), `${g2InstanceVarName}.`);
        }
        if ('chart' !== originalChartVarName && 'chart' !== g2InstanceVarName) {
            helperCode = helperCode.replace(/\bchart\.(?!\s*current)/g, `${g2InstanceVarName}.`);
        }
        helperCode = "// Helper code extracted from original (review and adapt if necessary):\n" + helperCode;
    }

    // Removed static palette registration from helperCode.

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
        
        let finalAdaptedCode = chartInitializationCode; 

        let tempPostInitOps = adaptedPostInitializationCode;
        
        const themeOverrideCode = `${g2InstanceVarName}.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });`;
        
        let themeCallFoundInPostInit = false;
        const themeCallRegexForPostInit = new RegExp(`\\b${g2InstanceVarName.replace('.', '\\.')}\\.theme\\s*\\([^)]*\\)`);
        if (themeCallRegexForPostInit.test(tempPostInitOps)) {
            themeCallFoundInPostInit = true;
            // If a theme call exists, we assume it's handled or shadcnPalette is added correctly.
            // For simplicity, we will ensure our theme is applied. We can prepend it if complex logic arises.
            // Or, more robustly, find the first top-level statement and insert before/after.
            // For now, let's ensure it's present. If the original already sets defaultCategory10, this might override.
            // This part might need more sophisticated logic if originals have complex theme setups.
             tempPostInitOps = themeOverrideCode + "\n" + tempPostInitOps; // Prepend to be safe
        } else {
            tempPostInitOps = themeOverrideCode + "\n" + tempPostInitOps;
        }
        
        finalAdaptedCode += tempPostInitOps;
        g2CodeBlock = finalAdaptedCode;

        const renderCallPatternInAdapted = new RegExp(`\\b${g2InstanceVarName.replace('.', '\\.')}\\.render\\s*\\(\\s*\\)\\s*;?`);
        if (!renderCallPatternInAdapted.test(g2CodeBlock)) { // Test the whole g2CodeBlock
            // If render is not found, append it. This is crucial for async data loading.
            // Ensure it's appended as a new statement.
            if (!g2CodeBlock.trim().endsWith(';') && !g2CodeBlock.trim().endsWith('}')) {
                 g2CodeBlock += ';';
            }
            g2CodeBlock += `\n${g2InstanceVarName}.render();`;
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
            displaySnippet = displaySnippet.replace(new RegExp(`\\b${originalChartVarName}\\b(?!\.)`, "g"), `${g2InstanceVarName}`);
        }
        // Always try to adapt literal 'chart' in snippet as it's a common case / fallback
        displaySnippet = displaySnippet.replace(/\bchart\./g, `${g2InstanceVarName}.`);
        displaySnippet = displaySnippet.replace(/\bchart\b(?!\.)/g, `${g2InstanceVarName}`);
        
        g2CodeBlock += `// (Attempted to adapt chart references to '${g2InstanceVarName}' in the snippet below)\n`;
        
        g2CodeBlock += displaySnippet.split('\n').map(l => `// ${l}`).join('\n');
    }

    return {
        imports: Array.from(finalImports).join("\n"),
        g2Code: g2CodeBlock.trim(), 
        helpers: helperCode.trim() 
    };
}