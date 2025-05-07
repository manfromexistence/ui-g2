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

// Original G2 example path: integration/G2/site/examples/animation/group/demo/interval.ts

// Helper code extracted from original (review and adapt if necessary):
const fruits = [
  { type: 'Apple', year: '2001', value: 260 },
  { type: 'Orange', year: '2001', value: 100 },
  { type: 'Banana', year: '2001', value: 90 },
  { type: 'Apple', year: '2002', value: 210 },
  { type: 'Orange', year: '2002', value: 150 },
  { type: 'Banana', year: '2002', value: 30 },
];

export default function G2ChartComponent_animation_group_interval() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        g2ChartInstance.current
          .interval()
          .data(fruits)
          .transform({ type: 'stackEnter', groupBy: 'color' })
          .transform({ type: 'dodgeX' })
          .encode('x', 'year')
          .encode('y', 'value')
          .encode('color', 'type')
          .encode('color', 'type')
          .animate('enter', { duration: 500 });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/animation/group/demo/interval.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/animation/group/demo/interval.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/animation/group/demo/interval.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Column with Animation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: animation/group/demo/interval.ts
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
