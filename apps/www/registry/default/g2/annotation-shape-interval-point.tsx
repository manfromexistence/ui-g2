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

// Original G2 example path: integration/G2/site/examples/annotation/shape/demo/interval-point.ts



export default function G2ChartComponent_annotation_shape_interval_point() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          paddingRight: 30,
        });
        
        
        chart.coordinate({ transform: [{ type: 'transpose' }] });
        
        chart.data([
          { x: 'Jan', tick: 9.3, value: 11.5 },
          { x: 'Feb', tick: 10.5, value: 12 },
          { x: 'Mar', tick: 11.2, value: 11.7 },
          { x: 'Apr', tick: 11.2, value: 12.4 },
          { x: 'May', tick: 12.7, value: 13.5 },
          { x: 'Jun', tick: 13.1, value: 11.9 },
          { x: 'Jul', tick: 12.2, value: 14.6 },
          { x: 'Aug', tick: 12.2, value: 17.2 },
          { x: 'Sep', tick: 10.1, value: 16.9 },
          { x: 'Oct', tick: 14.5, value: 15.4 },
          { x: 'Nov', tick: 14.5, value: 16.9 },
          { x: 'Dec', tick: 15.5, value: 17.2 },
        ]);
        
        g2ChartInstance.current
          .interval()
          .encode('x', 'x')
          .encode('y', 'value')
          .encode('size', 20)
          .axis('x', { title: false })
          .style('fillOpacity', 0.65)
          .style('lineWidth', 1)
          .label({
            text: 'value',
            position: 'right',
            formatter: (v) => `${v}min`,
            dx: 4,
            textAlign: 'start',
          });
        
        g2ChartInstance.current
          .point()
          .encode('x', 'x')
          .encode('y', 'tick')
          .encode('shape', 'line')
          .encode('size', 15)
          .style('stroke', 'red')
          .tooltip(false);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/shape/demo/interval-point.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/shape/demo/interval-point.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/shape/demo/interval-point.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interval, Point Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/shape/demo/interval-point.ts
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
