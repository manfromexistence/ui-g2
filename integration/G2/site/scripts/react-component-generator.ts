// @ts-nocheck
import path from 'path';

export function getReactComponentTemplate(originalG2FilePath: string, cardTitle: string, chartIdBase: string, g2Logic: any, baseWorkspaceDir: string) {
    const relativeOriginalPath = path.relative(baseWorkspaceDir, originalG2FilePath);

    let finalImports = `import React, { useEffect, useRef } from "react";\n`;
    if (g2Logic.imports) {
        finalImports += `${g2Logic.imports}\n`;
    }
    // Removed conditional import for Chart from "@antv/g2"
    // if (!finalImports.includes("from \"@antv/g2\"") && g2Logic.g2Code.includes("new Chart(")) {
    //     finalImports += `import { Chart } from "@antv/g2";\n`
    // }

    return `// @ts-nocheck
"use client";

${finalImports}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: ${relativeOriginalPath}

${g2Logic.helpers}

export default function G2ChartComponent_${chartIdBase.replace(/-/g, '_')}() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
${g2Logic.g2Code.split('\n').map(line => '        ' + line).join('\n')}
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from ${relativeOriginalPath}:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: ${relativeOriginalPath}</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from ${relativeOriginalPath}:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>${cardTitle}</CardTitle>
        <CardDescription>
          G2 Chart. Original example: ${relativeOriginalPath.replace(/^integration\/G2\/site\/examples\//, '')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} style={{ width: '100%', minHeight: '400px' }}>
          {/* G2 Chart will be rendered here by the useEffect hook */}
        </div>
      </CardContent>
    </Card>
  );
}
`;
}
