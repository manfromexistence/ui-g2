// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart , register } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/general/line/demo/line-style.ts



export default function G2ChartComponent_general_line_line_style() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({ container: chartRef.current, height: 350 });
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current.options({
          type: 'line',
          data: {
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/doughnut-purchases.json',
            transform: [
              // Mock missing data.
              {
                type: 'map',
                callback: (d) => ({
                  ...d,
                  count: ['2004'].includes(d.year) ? NaN : d.count,
                }),
              },
            ],
          },
          style: {
            gradient: 'x',
            gradientColor: 'start',
            lineJoin: 'round',
            connect: true,
            connectStroke: '#aaa',
            connectLineWidth: 1,
            connectLineDash: [2, 4],
            lineWidth: 3,
            opacity: 0.9,
            shadowColor: '#d3d3d3',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
          },
          encode: { x: 'year', y: 'count', color: 'year', shape: 'smooth' },
          scale: { y: { zero: true, nice: true } },
          axis: { y: { labelFormatter: '~s' } },
          labels: [
            {
              text: 'count',
            },
          ],
        });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/line/demo/line-style.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/line/demo/line-style.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/line/demo/line-style.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line Mark Style</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/line/demo/line-style.ts
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
