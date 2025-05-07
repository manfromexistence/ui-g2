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

// Original G2 example path: integration/G2/site/examples/animation/group/demo/line.ts



export default function G2ChartComponent_animation_group_line() {
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
        
        
        chart.data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/doughnut-purchases.json',
        });
        
        g2ChartInstance.current
          .line()
          .encode('x', 'year')
          .encode('y', 'count')
          .encode('color', 'year')
          .encode('shape', 'smooth')
          .scale('y', { zero: true, nice: true })
          .style('gradient', 'x')
          .style('gradientColor', 'start')
          .animate('enter', { type: 'pathIn', duration: 3000 })
          .axis('y', { labelFormatter: '~s' });
        
        g2ChartInstance.current
          .point()
          .transform({ type: 'stackEnter' })
          .encode('x', 'year')
          .encode('y', 'count')
          .encode('color', 'year')
          .encode('shape', 'point')
          .animate('enter', { duration: 300 });
        
        g2ChartInstance.current
          .text()
          .transform({ type: 'stackEnter' })
          .encode('x', 'year')
          .encode('y', 'count')
          .encode('text', 'year')
          .animate('enter', { duration: 300 })
          .style('lineWidth', 5)
          .style('stroke', '#fff')
          .style('textAlign', 'center')
          .style('dy', -8);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/animation/group/demo/line.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/animation/group/demo/line.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/animation/group/demo/line.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line with Animation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: animation/group/demo/line.ts
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
