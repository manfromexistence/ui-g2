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

// Original G2 example path: integration/G2/site/examples/animation/group/demo/interval-polar.ts



export default function G2ChartComponent_animation_group_interval_polar() {
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
        
        
        chart.coordinate({ type: 'polar' });
        
        g2ChartInstance.current
          .interval()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/deaths.json',
          })
          .transform({ type: 'stackY' })
          .transform({ type: 'stackEnter', groupBy: ['color', 'x'], duration: 2000 })
          .encode('x', 'Month')
          .encode('y', 'Death')
          .encode('color', 'Type')
          .scale('y', {
            type: 'sqrt',
          })
          .animate('enter', { type: 'waveIn' })
          .axis('y', false);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/animation/group/demo/interval-polar.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/animation/group/demo/interval-polar.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/animation/group/demo/interval-polar.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Animation in Polar</CardTitle>
        <CardDescription>
          G2 Chart. Original example: animation/group/demo/interval-polar.ts
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
