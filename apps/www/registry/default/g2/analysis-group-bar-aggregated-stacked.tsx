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

// Original G2 example path: integration/G2/site/examples/analysis/group/demo/bar-aggregated-stacked.ts



export default function G2ChartComponent_analysis_group_bar_aggregated_stacked() {
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
        
        
        chartRef.current
          .interval()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/3ed6f372-5362-4861-a33b-a16a9efbc922.csv',
          })
          .transform({ type: 'groupX', y: 'count' })
          .transform({ type: 'stackY', reverse: true, orderBy: 'series' })
          .encode('x', (d) => new Date(d.date).getMonth())
          .encode('color', 'weather')
          .scale('color', {
            domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
            range: ['#e7ba52', '#c7c7c7', '#aec7e8', '#1f77b4', '#9467bd'],
          });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/analysis/group/demo/bar-aggregated-stacked.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/analysis/group/demo/bar-aggregated-stacked.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/analysis/group/demo/bar-aggregated-stacked.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Aggregated Stacked Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: analysis/group/demo/bar-aggregated-stacked.ts
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
