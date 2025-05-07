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

// Original G2 example path: integration/G2/site/examples/general/cell/demo/cell-threshold.ts



export default function G2ChartComponent_general_cell_cell_threshold() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          width: 900,
          height: 340,
        });
        
        
        chartRef.current
          .cell()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/89c20fe8-0c6f-46c8-b36b-4cb653dba8ed.json',
            transform: [{ type: 'map', callback: (d) => ({ salary: d }) }],
          })
          .scale('color', {
            type: 'threshold',
            domain: [10000, 100000],
            range: ['#eee', 'pink', 'red'],
          })
          .encode('y', (_, i) => (i % 5) + 1)
          .encode('x', (_, i) => ((i / 5) | 0) + 1)
          .encode('color', 'salary')
          .style('stroke', '#000')
          .style('inset', 2)
          .animate('enter', { type: 'fadeIn' });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/cell/demo/cell-threshold.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/cell/demo/cell-threshold.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/cell/demo/cell-threshold.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Threshold Heatmap</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/cell/demo/cell-threshold.ts
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
