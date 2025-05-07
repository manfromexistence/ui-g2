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

// Original G2 example path: integration/G2/site/examples/analysis/group/demo/bar-stacked-normalized-1d.ts



export default function G2ChartComponent_analysis_group_bar_stacked_normalized_1d() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 120,
        });
        
        
        chart.coordinate({ transform: [{ type: 'transpose' }] });
        
        g2ChartInstance.current
          .interval()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/penguins.json',
          })
          .transform({ type: 'groupColor', y: 'count' })
          .transform({ type: 'stackY' })
          .transform({ type: 'normalizeY' })
          .axis('y', { labelFormatter: '.0%' })
          .encode('color', 'sex')
          .label({ text: 'sex', position: 'inside' })
          .tooltip({ channel: 'y', valueFormatter: '.0%' });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/analysis/group/demo/bar-stacked-normalized-1d.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/analysis/group/demo/bar-stacked-normalized-1d.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/analysis/group/demo/bar-stacked-normalized-1d.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Aggregated Stacked Bar Chart, 1D</CardTitle>
        <CardDescription>
          G2 Chart. Original example: analysis/group/demo/bar-stacked-normalized-1d.ts
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
