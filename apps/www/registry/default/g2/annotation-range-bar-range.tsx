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

// Original G2 example path: integration/G2/site/examples/annotation/range/demo/bar-range.ts



export default function G2ChartComponent_annotation_range_bar_range() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          height: 500,
        });
        
        
        chart
          .data([
            { y: [0, 25], region: '1' },
            { y: [25, 50], region: '2' },
          ])
          .rangeY()
          .encode('y', 'y')
          .style('fill', (d) => (d.region === '1' ? '#d8d0c0' : '#a3dda1'))
          .style('fillOpacity', 0.4)
          .animate('enter', { type: 'fadeIn' });
        
        chart
          .interval()
          .data(data)
          .encode('x', '职业')
          .encode('y', '平均年收入')
          .encode('color', 'city')
          .transform({ type: 'dodgeX' })
          .axis('y', { title: '平均年收入', labelFormatter: (d) => d + '万' })
          .tooltip({
            items: [
              (d) => ({
                name: '平均年收入',
                value: d.平均年收入 + '万',
                channel: 'y',
              }),
            ],
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/range/demo/bar-range.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/range/demo/bar-range.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/range/demo/bar-range.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>bar, Range Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/range/demo/bar-range.ts
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
