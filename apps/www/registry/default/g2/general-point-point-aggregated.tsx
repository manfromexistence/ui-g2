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

// Original G2 example path: integration/G2/site/examples/general/point/demo/point-aggregated.ts



export default function G2ChartComponent_general_point_point_aggregated() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 360,
          inset: 10,
        });
        
        
        chart.style('mainStroke', 'black');
        
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
          .encode('color', 'count')
          .encode('shape', 'point');
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/point/demo/point-aggregated.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/point/demo/point-aggregated.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/point/demo/point-aggregated.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Aggregated Bubble Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/point/demo/point-aggregated.ts
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
