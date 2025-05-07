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

// Original G2 example path: integration/G2/site/examples/annotation/range/demo/point-range.ts



export default function G2ChartComponent_annotation_range_point_range() {
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
          .data({
            type: 'fetch',
            value:
              'https://assets.antv.antgroup.com/g2/top-30-countries-by-quality-of-life.json',
          })
          .axis('x', false)
          .axis('y', false)
          .style('mainStroke', '#5B8FF9')
          .style('mainLineWidth', 2);
        
        g2ChartInstance.current
          .range()
          .data([
            { x: [0, 0.5], y: [0, 0.5] },
            { x: [0.5, 1], y: [0.5, 1] },
          ])
          .encode('x', 'x')
          .encode('y', 'y')
          .scale('x', { independent: true, domain: [0, 1] })
          .scale('y', { independent: true, domain: [0, 1] })
          .style('stroke', '#5B8FF9')
          .style('lineWidth', 1)
          .style('fillOpacity', 0.15)
          .animate(false)
          .tooltip(false);
        
        g2ChartInstance.current
          .point()
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('shape', 'point')
          .scale('x', { domain: [137.5, 212] })
          .scale('y', { domain: [0, 80] })
          .label({ text: 'name', fontSize: 10, dy: 6 });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/range/demo/point-range.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/range/demo/point-range.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/range/demo/point-range.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Point, Range Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/range/demo/point-range.ts
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
