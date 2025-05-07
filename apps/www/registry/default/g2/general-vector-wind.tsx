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

// Original G2 example path: integration/G2/site/examples/general/vector/demo/wind.ts



export default function G2ChartComponent_general_vector_wind() {
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
        
        
        chart
          .vector()
          .data({
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/antfincdn/F5VcgnqRku/wind.json',
          })
          .encode('x', 'longitude')
          .encode('y', 'latitude')
          .encode('rotate', ({ u, v }) => (Math.atan2(v, u) * 180) / Math.PI)
          .encode('size', ({ u, v }) => Math.hypot(v, u))
          .encode('color', ({ u, v }) => Math.hypot(v, u))
          .scale('size', { range: [6, 20] })
          .scale('color', { palette: 'viridis' })
          .axis('x', { grid: false })
          .axis('y', { grid: false })
          .legend(false)
          .tooltip({ title: { channel: 'color', valueFormatter: '.1f' } });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/vector/demo/wind.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/vector/demo/wind.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/vector/demo/wind.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Wind Vector</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/vector/demo/wind.ts
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
