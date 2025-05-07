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

// Original G2 example path: integration/G2/site/examples/general/point/demo/point-stacked.ts



export default function G2ChartComponent_general_point_point_stacked() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 360,
        });
        
        
        g2ChartInstance.current
          .point()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/88c601cd-c1ff-4c9b-90d5-740d0b710b7e.json',
          })
          .transform({ type: 'stackY', y1: 'y' })
          .encode('x', (d) => 2021 - d.birth)
          .encode('y', (d) => (d.gender === 'M' ? 1 : -1))
          .encode('color', 'gender')
          .encode('shape', 'point')
          .scale('x', { nice: true })
          .axis('y', {
            title: '← Women · Men →',
            labelFormatter: (d) => `${Math.abs(+d)}`,
          })
          .axis('x', { title: 'Age →' })
          .legend('color', { title: 'Gender' })
          .tooltip({ channel: 'x', name: 'age' });
        
        g2ChartInstance.current.lineY().data([0]).style('stroke', 'black');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/point/demo/point-stacked.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/point/demo/point-stacked.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/point/demo/point-stacked.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stacked Scatterplot</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/point/demo/point-stacked.ts
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
