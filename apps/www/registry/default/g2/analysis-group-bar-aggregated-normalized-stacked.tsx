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

// Original G2 example path: integration/G2/site/examples/analysis/group/demo/bar-aggregated-normalized-stacked.ts



export default function G2ChartComponent_analysis_group_bar_aggregated_normalized_stacked() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current.coordinate({ transform: [{ type: 'transpose' }] });
        
        g2ChartInstance.current
          .interval()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
            transform: [
              {
                type: 'filter',
                callback: (d) => d.year === 2000,
              },
            ],
          })
          .transform({ type: 'groupX', y: 'sum' })
          .transform({ type: 'stackY' })
          .transform({ type: 'normalizeY' })
          .encode('x', 'age')
          .encode('y', 'people')
          .encode('color', 'sex')
          .scale('color', { type: 'ordinal', range: ['#ca8861', '#675193'] })
          .axis('y', { labelFormatter: '.0%' })
          .label({ text: 'people', position: 'inside', fill: 'white' })
          .tooltip({ channel: 'y', valueFormatter: '.0%' });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/analysis/group/demo/bar-aggregated-normalized-stacked.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/analysis/group/demo/bar-aggregated-normalized-stacked.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/analysis/group/demo/bar-aggregated-normalized-stacked.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Aggregated Normalized Stacked Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: analysis/group/demo/bar-aggregated-normalized-stacked.ts
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
