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

// Original G2 example path: integration/G2/site/examples/general/mini/demo/ring.ts

// Helper code extracted from original (review and adapt if necessary):
const progress = 0.7;

export default function G2ChartComponent_general_mini_ring() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          width: 100,
          height: 100,
        });
        
        
        chartRef.current.coordinate({ type: 'theta', innerRadius: 0.7 });
        
        chart
          .interval()
          .data([1, progress])
          .encode('y', (d) => d)
          .encode('color', (d, idx) => idx)
          .scale('y', { domain: [0, 1] })
          .scale('color', { range: ['#000000', '#a0ff03'] })
          .animate('enter', { type: 'waveIn' })
          .axis(false)
          .legend(false);
        
        chartRef.current.text().style({
          text: `${progress * 100}%`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        });
        
        chartRef.current.interaction('tooltip', false);
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/mini/demo/ring.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/mini/demo/ring.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/mini/demo/ring.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mini ring</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/mini/demo/ring.ts
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
