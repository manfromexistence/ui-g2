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

// Original G2 example path: integration/G2/site/examples/general/box/demo/grouped-box.ts



export default function G2ChartComponent_general_box_grouped_box() {
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
        
        
        chart
          .box()
          .data(data)
          .encode('x', 'type')
          .encode('y', 'bin')
          .encode('series', 'Species')
          .encode('color', 'Species')
          .scale('x', { paddingInner: 0.2, paddingOuter: 0.1 })
          .scale('y', { zero: true })
          .scale('series', { paddingInner: 0.3, paddingOuter: 0.1 })
          .style('stroke', 'black')
          .tooltip([
            { name: 'min', channel: 'y' },
            { name: 'q1', channel: 'y1' },
            { name: 'q2', channel: 'y2' },
            { name: 'q3', channel: 'y3' },
            { name: 'max', channel: 'y4' },
          ]);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/box/demo/grouped-box.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/box/demo/grouped-box.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/box/demo/grouped-box.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Grouped Boxplot</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/box/demo/grouped-box.ts
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
