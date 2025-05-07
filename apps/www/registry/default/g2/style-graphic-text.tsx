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

// Original G2 example path: integration/G2/site/examples/style/graphic/demo/text.ts



export default function G2ChartComponent_style_graphic_text() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 350,
        });
        
        
        g2ChartInstance.current.options({
          type: 'liquid',
          autoFit: true,
          data: 0.581,
          style: {
            waveLength: 50,
            contentText: 'center text',
            outlineBorder: 4,
            outlineDistance: 8,
            // 绘图属性
            contentFontSize: 30,
            contentFontFamily: 'sans-serif',
            contentFontWeight: 500,
            contentLineHeight: 20,
            contentTextAlign: 'center',
            contentTextBaseline: 'middle',
            contentFill: '#fff',
            contentFillOpacity: 0.9,
            contentStroke: 'yellow',
            contentStrokeOpacity: 0.9,
            contentLineWidth: 2,
            contentLineDash: [4, 8],
            contentOpacity: 1,
            contentShadowColor: '#d3d3d3',
            contentShadowBlur: 10,
            contentShadowOffsetX: 10,
            contentShadowOffsetY: 10,
            contentCursor: 'pointer',
          },
        });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/graphic/demo/text.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/graphic/demo/text.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/graphic/demo/text.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configure Text Styles  </CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/graphic/demo/text.ts
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
