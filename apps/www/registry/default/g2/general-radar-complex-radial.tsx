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

// Original G2 example path: integration/G2/site/examples/general/radar/demo/complex-radial.ts



export default function G2ChartComponent_general_radar_complex_radial() {
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
        
        const keyframe = g2ChartInstance.current.timingKeyframe({
          direction: 'alternate',
          iterationCount: 4,
        });
        
        keyframe
          .line()
          .data(data)
          .coordinate({ type: 'polar' })
          .axis('x', {
            grid: null,
            line: true,
            lineLineWidth: 1,
          })
          .axis('y', false)
          .scale('x', { tickCount: 12 })
          .interaction('tooltip', {
            crosshairs: false,
          })
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('color', '#ff8800')
          .style('lineWidth', 2);
        
        keyframe
          .line()
          .data(data)
          .axis('x', {
            grid: null,
            line: true,
            lineLineWidth: 1,
          })
          .axis('y', false)
          .scale('x', { tickCount: 12 })
          .interaction('tooltip', {
            crosshairs: false,
          })
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('color', '#ff8800')
          .style('lineWidth', 2);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/radar/demo/complex-radial.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radar/demo/complex-radial.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/radar/demo/complex-radial.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Radar</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radar/demo/complex-radial.ts
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
