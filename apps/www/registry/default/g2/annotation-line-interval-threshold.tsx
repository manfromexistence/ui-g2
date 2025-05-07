// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart , register } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/annotation/line/demo/interval-threshold.ts



export default function G2ChartComponent_annotation_line_interval_threshold() {
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
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current
          .data([
            { Day: 1, Value: 54.8 },
            { Day: 2, Value: 112.1 },
            { Day: 3, Value: 63.6 },
            { Day: 4, Value: 37.6 },
            { Day: 5, Value: 79.7 },
            { Day: 6, Value: 137.9 },
            { Day: 7, Value: 120.1 },
            { Day: 8, Value: 103.3 },
            { Day: 9, Value: 394.8 },
            { Day: 10, Value: 199.5 },
            { Day: 11, Value: 72.3 },
            { Day: 12, Value: 51.1 },
            { Day: 13, Value: 112.0 },
            { Day: 14, Value: 174.5 },
            { Day: 15, Value: 130.5 },
          ])
          .axis('y', { title: false });
        
        g2ChartInstance.current.interval().encode('x', 'Day').encode('y', 'Value');
        
        g2ChartInstance.current
          .range()
          .data({
            transform: [
              {
                type: 'custom',
                callback: (data) => overThreshold(data, 300),
              },
            ],
          })
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('color', '#F4664A');
        
        g2ChartInstance.current
          .lineY()
          .data([300])
          .style('stroke', '#F4664A')
          .style('lineDash', [3, 3])
          .style('arrow', true)
          .label({
            text: 'hazardous',
            position: 'right',
            textBaseline: 'bottom',
            fill: '#F4664A',
            background: true,
            backgroundFill: '#F4664A',
            backgroundOpacity: 0.25,
          });
        
        g2ChartInstance.current.render();
        
        // Process data.
        function overThreshold(data, threshold) {
          return data
            .filter((d) => d['Value'] >= threshold)
            .map(({ Day: x, Value: y }) => ({ x: [x, x], y: [threshold, y] }));
        }
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/line/demo/interval-threshold.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/line/demo/interval-threshold.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/line/demo/interval-threshold.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interval, Highlight Values beyond a Threshold</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/line/demo/interval-threshold.ts
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
