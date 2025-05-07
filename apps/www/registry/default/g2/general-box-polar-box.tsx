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

// Original G2 example path: integration/G2/site/examples/general/box/demo/polar-box.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { x: 'Oceania', y: [1, 9, 16, 22, 24] },
  { x: 'East Europe', y: [1, 5, 8, 12, 16] },
  { x: 'Australia', y: [1, 8, 12, 19, 26] },
  { x: 'South America', y: [2, 8, 12, 21, 28] },
  { x: 'North Africa', y: [1, 8, 14, 18, 24] },
  { x: 'North America', y: [3, 10, 17, 28, 30] },
  { x: 'West Europe', y: [1, 7, 10, 17, 22] },
  { x: 'West Africa', y: [1, 6, 8, 13, 16] },
];

export default function G2ChartComponent_general_box_polar_box() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        g2ChartInstance.current.coordinate({ type: 'polar', innerRadius: 0.2 });
        
        g2ChartInstance.current
          .box()
          .data(data)
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('color', 'x')
          .scale('x', { paddingInner: 0.6, paddingOuter: 0.3 })
          .scale('y', { zero: true })
          .style('stroke', 'black')
          .axis('y', { tickCount: 5 })
          .tooltip({ channel: 'y', name: 'min' })
          .tooltip({ channel: 'y1', name: 'q1' })
          .tooltip({ channel: 'y2', name: 'q2' })
          .tooltip({ channel: 'y3', name: 'q3' })
          .tooltip({ channel: 'y4', name: 'max' })
          .legend(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/box/demo/polar-box.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/box/demo/polar-box.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/box/demo/polar-box.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Polar Boxplot</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/box/demo/polar-box.ts
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
