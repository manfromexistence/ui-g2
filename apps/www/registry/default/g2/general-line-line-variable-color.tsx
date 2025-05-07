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

// Original G2 example path: integration/G2/site/examples/general/line/demo/line-variable-color.ts



export default function G2ChartComponent_general_line_line_variable_color() {
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
        
        
        g2ChartInstance.current
          .line()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/temperatures1.json',
          })
          .scale('y', { nice: true })
          .scale('color', {
            domain: ['CLR', 'FEW', 'SCT', 'BKN', 'OVC', 'VV '],
            range: [
              'deepskyblue',
              'lightskyblue',
              'lightblue',
              '#aaaaaa',
              '#666666',
              '#666666',
            ],
          })
          .encode('x', (d) => new Date(d.date))
          .encode('y', 'value')
          .encode('shape', 'hvh')
          .encode('color', 'condition')
          .encode('series', () => 'a')
          .style('gradient', 'x')
          .style('lineWidth', 2)
          .axis('x', { title: 'date' });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/line/demo/line-variable-color.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/line/demo/line-variable-color.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/line/demo/line-variable-color.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Variable Color Line Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/line/demo/line-variable-color.ts
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
