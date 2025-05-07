// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart , register } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/component/legend/demo/nav-style.ts



export default function G2ChartComponent_component_legend_nav_style() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({ container: chartRef.current, height: 350 });
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current.options({
          type: 'interval',
          data: [
            { genre: 'Sports', sold: 50 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
          ],
          encode: { x: 'genre', y: 'sold', color: 'genre' },
          legend: {
            color: {
              itemWidth: 160,
              navEffect: 'cubic-bezier',
              navDuration: 400,
              navOrientation: 'vertical',
              navDefaultPage: 2,
              navLoop: true,
        
              //配置navPageNum的绘图属性
              navPageNumFontSize: 16,
              navPageNumFontFamily: 'sans-serif',
              navPageNumFontWeight: 500,
              navPageNumLineHeight: 20,
              navPageNumTextAlign: 'center',
              navPageNumTextBaseline: 'middle',
              navPageNumFill: '#2989FF',
              navPageNumFillOpacity: 0.9,
              navPageNumStroke: '#DAF5EC',
              navPageNumStrokeOpacity: 0.9,
              navPageNumLineWidth: 2,
              navPageNumLineDash: [4, 8],
              navPageNumOpacity: 1,
              navPageNumShadowColor: '#d3d3d3',
              navPageNumShadowBlur: 10,
              navPageNumShadowOffsetX: 10,
              navPageNumShadowOffsetY: 10,
              navPageNumCursor: 'pointer',
        
              // 配置navButton的绘图属性
              navButtonFill: '#2989FF',
              navButtonFillOpacity: 0.7,
              navButtonStroke: '#DAF5EC',
              navButtonStrokeOpacity: 0.9,
              navButtonLineWidth: 2,
              navButtonLineDash: [4, 8],
              navButtonOpacity: 0.9,
              navButtonShadowColor: '#d3d3d3',
              navButtonShadowBlur: 10,
              navButtonShadowOffsetX: 10,
              navButtonShadowOffsetY: 10,
              navButtonCursor: 'pointer',
        
              navFormatter: (current, total) => `第${current}页/共${total}页`,
            },
          },
        });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/legend/demo/nav-style.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/legend/demo/nav-style.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/legend/demo/nav-style.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Legend Nav Style</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/legend/demo/nav-style.ts
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
