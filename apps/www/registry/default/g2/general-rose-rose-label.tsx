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

// Original G2 example path: integration/G2/site/examples/general/rose/demo/rose-label.ts



export default function G2ChartComponent_general_rose_rose_label() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          width: 720,
          height: 720,
        });
        
        
        chartRef.current.coordinate({ type: 'polar', outerRadius: 0.85 });
        
        chart
          .interval()
          .transform({ type: 'groupX', y: 'sum' })
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
          })
          .encode('x', 'year')
          .encode('color', 'year')
          .encode('y', 'people')
          .scale('y', { type: 'sqrt' })
          .scale('x', { padding: 0 })
          .axis(false)
          .label({
            text: 'people',
            position: 'outside',
            formatter: '~s',
            transform: [{ type: 'overlapDodgeY' }],
          })
          .legend({ color: { length: 400, layout: { justifyContent: 'center' } } })
          .animate('enter', { type: 'waveIn' })
          .tooltip({ channel: 'y', valueFormatter: '~s' });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/rose/demo/rose-label.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/rose/demo/rose-label.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/rose/demo/rose-label.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rose Chart, Label</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/rose/demo/rose-label.ts
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
