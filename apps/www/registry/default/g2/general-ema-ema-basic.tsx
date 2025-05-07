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

// Original G2 example path: integration/G2/site/examples/general/ema/demo/ema-basic.ts



export default function G2ChartComponent_general_ema_ema_basic() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          height: 300,
        });
        
        
        chartRef.current.options({
          type: 'view',
          children: [
            {
              type: 'line',
              data: {
                type: 'inline',
                value: [
                  { x: 0, y: 30 },
                  { x: 1, y: 80 },
                  { x: 2, y: 45 },
                  { x: 3, y: 90 },
                  { x: 4, y: 20 },
                  { x: 5, y: 60 },
                  { x: 6, y: 30 },
                  { x: 7, y: 85 },
                  { x: 8, y: 40 },
                  { x: 9, y: 70 },
                ],
                transform: [
                  {
                    type: 'ema',
                    field: 'y',
                    alpha: 0.6,
                    as: 'emaY',
                  },
                ],
              },
              encode: {
                x: 'x',
                y: 'emaY',
              },
              style: {
                stroke: '#f90',
                lineWidth: 2,
              },
            },
            {
              type: 'line',
              data: {
                type: 'inline',
                value: [
                  { x: 0, y: 30 },
                  { x: 1, y: 80 },
                  { x: 2, y: 45 },
                  { x: 3, y: 90 },
                  { x: 4, y: 20 },
                  { x: 5, y: 60 },
                  { x: 6, y: 30 },
                  { x: 7, y: 85 },
                  { x: 8, y: 40 },
                  { x: 9, y: 70 },
                ],
              },
              encode: {
                x: 'x',
                y: 'y',
              },
              style: {
                stroke: '#ccc',
                lineDash: [4, 2],
              },
            },
          ],
        });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/ema/demo/ema-basic.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/ema/demo/ema-basic.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/ema/demo/ema-basic.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ema Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/ema/demo/ema-basic.ts
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
