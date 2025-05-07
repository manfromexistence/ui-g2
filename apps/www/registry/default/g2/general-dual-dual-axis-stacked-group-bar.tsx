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

// Original G2 example path: integration/G2/site/examples/general/dual/demo/dual-axis-stacked-group-bar.ts



export default function G2ChartComponent_general_dual_dual_axis_stacked_group_bar() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        const data = [
          { time: '10:10', call: 4, waiting: 2, people: 2, mock: 3 },
          { time: '10:15', call: 2, waiting: 6, people: 3, mock: 4 },
          { time: '10:20', call: 13, waiting: 2, people: 5, mock: 1 },
          { time: '10:25', call: 9, waiting: 9, people: 1, mock: 2 },
          { time: '10:30', call: 5, waiting: 2, people: 3, mock: 5 },
          { time: '10:35', call: 8, waiting: 2, people: 1, mock: 3 },
          { time: '10:40', call: 13, waiting: 1, people: 2, mock: 2 },
        ];
        
        chart.data(data);
        
        chartRef.current
          .interval()
          .data({
            transform: [{ type: 'fold', fields: ['call', 'waiting'] }],
          })
          .encode('x', 'time')
          .encode('y', 'value')
          .encode('color', 'key')
          .encode('series', () => 'a')
          .transform({ type: 'stackY' })
          .scale('y', { nice: true })
          .axis('y', { title: null });
        
        chartRef.current
          .interval()
          .encode('x', 'time')
          .encode('y', 'people')
          .encode('color', () => 'people')
          .encode('series', () => 'b');
        
        chartRef.current
          .interval()
          .encode('x', 'time')
          .encode('y', 'mock')
          .encode('color', () => 'mock')
          .encode('series', () => 'c')
          .scale('y', { independent: true })
          .axis('y', { position: 'right' });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/dual/demo/dual-axis-stacked-group-bar.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/dual/demo/dual-axis-stacked-group-bar.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/dual/demo/dual-axis-stacked-group-bar.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dual Axis Stacked Group Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/dual/demo/dual-axis-stacked-group-bar.ts
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
