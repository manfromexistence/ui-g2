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

// Original G2 example path: integration/G2/site/examples/style/graphic/demo/area.ts



export default function G2ChartComponent_style_graphic_area() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          height: 350,
        });
        
        
        chart.options({
          type: 'view',
          autoFit: true,
          data: {
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/stocks.json',
            transform: [{ type: 'filter', callback: (d) => d.symbol === 'GOOG' }],
          },
          children: [
            {
              type: 'area',
              encode: { x: (d) => new Date(d.date), y: 'price' },
              style: { fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' },
              // style: { fill: "linear-gradient(270deg, #ffffff 0%, #7ec2f3 50%, #1890ff 100%)" },
            },
          ],
        });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/graphic/demo/area.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/graphic/demo/area.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/graphic/demo/area.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configure Linear-gradient Area  </CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/graphic/demo/area.ts
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
