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

// Original G2 example path: integration/G2/site/examples/style/theme/demo/layout-area.ts



export default function G2ChartComponent_style_theme_layout_area() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 240,
          marginLeft: 40,
          marginTop: 30,
          marginRight: 20,
          marginBottom: 10,
          inset: 10,
        });
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current.style({
          viewFill: '#4e79a7',
          plotFill: '#f28e2c',
          mainFill: '#e15759',
          contentFill: '#76b7b2',
        });
        
        g2ChartInstance.current
          .point()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/commits.json',
          })
          .transform({ type: 'group', size: 'sum' })
          .transform({ type: 'sortY' })
          .axis('x', { title: 'time (hours)', tickCount: 24 })
          .axis('y', { title: 'time (day)', grid: true })
          .scale('y', { type: 'point' })
          .encode('x', (d) => new Date(d.time).getUTCHours())
          .encode('y', (d) => new Date(d.time).getUTCDay())
          .encode('size', 'count')
          .encode('shape', 'point')
          .legend('size', false)
          .style('shape', 'point')
          .style('fill', '#59a14f');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/theme/demo/layout-area.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/theme/demo/layout-area.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/theme/demo/layout-area.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Layout Area</CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/theme/demo/layout-area.ts
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
