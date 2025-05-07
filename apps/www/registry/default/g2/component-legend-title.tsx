// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/component/legend/demo/title.ts



export default function G2ChartComponent_component_legend_title() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({ container: chartRef.current, height: 300 });
        
        
        g2ChartInstance.current.options({
          type: 'legends',
          title: '图例标题',
          titleSpacing: 0,
          titleInset: 0,
          titlePosition: 't',
          titleFontSize: 16,
          titleFontFamily: 'sans-serif',
          titleFontWeight: 500,
          titleLineHeight: 20,
          titleTextAlign: 'center',
          titleTextBaseline: 'middle',
          titleFill: '#000',
          titleFillOpacity: 0.9,
          titleStroke: '#DAF5EC',
          titleStrokeOpacity: 0.9,
          titleLineWidth: 2,
          titleLineDash: [4, 8],
          titleOpacity: 1,
          titleShadowColor: '#d3d3d3',
          titleShadowBlur: 10,
          titleShadowOffsetX: 10,
          titleShadowOffsetY: 10,
          titleCursor: 'pointer',
          scale: {
            size: {
              type: 'linear',
              domain: [0, 10],
              range: [0, 100],
            },
          },
        });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/legend/demo/title.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/legend/demo/title.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/legend/demo/title.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Legend Title</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/legend/demo/title.ts
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
