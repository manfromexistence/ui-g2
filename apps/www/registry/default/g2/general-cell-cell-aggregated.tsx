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

// Original G2 example path: integration/G2/site/examples/general/cell/demo/cell-aggregated.ts



export default function G2ChartComponent_general_cell_cell_aggregated() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 300,
        });
        
        
        chart
          .cell()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
          })
          .transform({ type: 'group', color: 'max' })
          .encode('x', (d) => new Date(d.date).getUTCDate())
          .encode('y', (d) => new Date(d.date).getUTCMonth())
          .encode('color', 'temp_max')
          .style('inset', 0.5)
          .scale('color', { palette: 'gnBu' })
          .animate('enter', { type: 'fadeIn' });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/cell/demo/cell-aggregated.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/cell/demo/cell-aggregated.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/cell/demo/cell-aggregated.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Aggregated Heatmap</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/cell/demo/cell-aggregated.ts
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
