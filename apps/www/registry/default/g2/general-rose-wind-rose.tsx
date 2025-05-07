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

// Original G2 example path: integration/G2/site/examples/general/rose/demo/wind-rose.ts



export default function G2ChartComponent_general_rose_wind_rose() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          height: 720,
          padding: 50,
        });
        
        
        g2ChartInstance.current.coordinate({ type: 'polar' });
        
        chart
          .interval()
          .data(data)
          .encode('x', 'direction')
          .encode('y', 'value')
          .encode('color', 'level')
          .encode('size', 18)
          .transform([{ type: 'stackY' }])
          .tooltip({
            title: (d) => d.direction,
            items: [
              (d, i, data, column) => ({
                name: d.level,
                value: d.value,
                channel: 'y',
              }),
            ],
          })
          .interaction('tooltip', {
            shared: true,
          })
          .scale('color', { range: colors })
          .axis('x', {
            line: true,
            grid: true,
            gridLineDash: [0, 0],
            gridLineWidth: 1,
          })
          .axis('y', {
            title: false,
            line: true,
            gridLineWidth: 1,
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/rose/demo/wind-rose.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/rose/demo/wind-rose.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/rose/demo/wind-rose.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Wind Rose</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/rose/demo/wind-rose.ts
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
