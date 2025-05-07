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

// Original G2 example path: integration/G2/site/examples/general/mini/demo/progress.ts

// Helper code extracted from original (review and adapt if necessary):
const progress = 0.7;

export default function G2ChartComponent_general_mini_progress() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 480,
          height: 60,
        });
        
        
        chart.coordinate({
          transform: [{ type: 'transpose' }],
        });
        
        g2ChartInstance.current
          .interval()
          .data([1, progress])
          .encode('y', (d) => d)
          .encode('color', (d, idx) => idx)
          .scale('y', { domain: [0, 1] })
          .scale('color', { range: ['#000000', '#a0ff03'] })
          .legend(false)
          .axis(false);
        
        chart.text().style({
          text: `${progress * 100}%`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        });
        
        chart.interaction('tooltip', false);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/mini/demo/progress.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/mini/demo/progress.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/mini/demo/progress.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mini progress</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/mini/demo/progress.ts
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
