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

// Original G2 example path: integration/G2/site/examples/layout/layout/demo/chart-layout.ts



export default function G2ChartComponent_layout_layout_chart_layout() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({ container: chartRef.current });
        
        
        chart.options({
          type: 'point',
          height: 600,
          width: 700,
          margin: 100,
          padding: 60,
          paddingLeft: 100, // 单独设置paddingLeft的优先级比padding高
          insetLeft: 30,
          insetRight: 30,
        
          data: {
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/commits.json',
          },
          encode: {
            x: (d) => new Date(d.time).getUTCHours(),
            y: (d) => new Date(d.time).getUTCDay(),
            size: 'count',
            shape: 'point',
          },
          transform: [{ type: 'group', size: 'sum' }, { type: 'sortY' }],
          scale: { y: { type: 'point' } },
          style: { shape: 'point', fill: '#76b7b2' },
          axis: {
            x: { title: 'time (hours)', tickCount: 24 },
            y: { title: 'time (day)', grid: true },
          },
          legend: false,
          viewStyle: {
            viewFill: '#DCEEFE',
            plotFill: '#A2D4F6',
            mainFill: '#FFC6A1',
            contentFill: '#FF8E72',
          },
        });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/layout/layout/demo/chart-layout.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/layout/layout/demo/chart-layout.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/layout/layout/demo/chart-layout.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>chart layout</CardTitle>
        <CardDescription>
          G2 Chart. Original example: layout/layout/demo/chart-layout.ts
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
