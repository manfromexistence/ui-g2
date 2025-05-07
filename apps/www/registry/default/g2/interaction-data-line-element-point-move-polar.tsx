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

// Original G2 example path: integration/G2/site/examples/interaction/data/demo/line-element-point-move-polar.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { item: 'Design', type: 'a', score: 70 },
  { item: 'Design', type: 'b', score: 30 },
  { item: 'Development', type: 'a', score: 60 },
  { item: 'Development', type: 'b', score: 70 },
  { item: 'Marketing', type: 'a', score: 50 },
  { item: 'Marketing', type: 'b', score: 60 },
  { item: 'Users', type: 'a', score: 40 },
  { item: 'Users', type: 'b', score: 50 },
  { item: 'Test', type: 'a', score: 60 },
  { item: 'Test', type: 'b', score: 70 },
  { item: 'Language', type: 'a', score: 70 },
  { item: 'Language', type: 'b', score: 50 },
  { item: 'Technology', type: 'a', score: 50 },
  { item: 'Technology', type: 'b', score: 40 },
  { item: 'Support', type: 'a', score: 30 },
  { item: 'Support', type: 'b', score: 40 },
  { item: 'Sales', type: 'a', score: 60 },
  { item: 'Sales', type: 'b', score: 40 },
  { item: 'UX', type: 'a', score: 50 },
  { item: 'UX', type: 'b', score: 60 },
];

export default function G2ChartComponent_interaction_data_line_element_point_move_polar() {
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
        
        
        g2ChartInstance.current.coordinate({ type: 'polar' });
        
        chart
          .data(data)
          .scale('x', { padding: 0.5, align: 0 })
          .scale('y', { tickCount: 5, domainMax: 80 })
          .interaction({
            legendFilter: false,
            elementPointMove: true,
          })
          .axis('x', {
            grid: true,
            gridStrokeWidth: 1,
            tick: false,
            gridLineDash: [0, 0],
          })
          .axis('y', {
            zIndex: 1,
            title: false,
            gridConnect: 'line',
            gridStrokeWidth: 1,
            gridLineDash: [0, 0],
          });
        
        chart
          .area()
          .encode('x', 'item')
          .encode('y', 'score')
          .encode('color', 'type')
          .encode('key', 'type')
          .style('fillOpacity', 0.5);
        
        chart
          .line()
          .encode('x', 'item')
          .encode('y', 'score')
          .encode('color', 'type')
          .encode('key', 'type')
          .style('lineWidth', 2);
        
        g2ChartInstance.current.interaction('tooltip', { crosshairsLineDash: [4, 4] });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/interaction/data/demo/line-element-point-move-polar.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/interaction/data/demo/line-element-point-move-polar.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/interaction/data/demo/line-element-point-move-polar.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Radar Numerical Interaction</CardTitle>
        <CardDescription>
          G2 Chart. Original example: interaction/data/demo/line-element-point-move-polar.ts
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
