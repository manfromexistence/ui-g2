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

// Original G2 example path: integration/G2/site/examples/general/venn/demo/venn-hollow.ts



export default function G2ChartComponent_general_venn_venn_hollow() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        chart
          .path()
          .data({
            type: 'inline',
            value: [
              { sets: ['A'], size: 15, label: 'A' },
              { sets: ['B'], size: 12, label: 'B' },
              { sets: ['C'], size: 10, label: 'C' },
              { sets: ['A', 'B'], size: 2, label: 'A&B' },
              { sets: ['A', 'C'], size: 2, label: 'A&C' },
              { sets: ['B', 'C'], size: 1, label: 'B&C' },
              { sets: ['A', 'B', 'C'], size: 1 },
            ],
            transform: [
              {
                type: 'venn',
              },
            ],
          })
          .encode('d', 'path')
          .encode('color', 'key')
          .encode('shape', 'hollow')
          .label({
            position: 'inside',
            text: (d) => d.label || '',
            fill: '#000',
          })
          .style('opacity', 0.6)
          .style('lineWidth', 8)
          .tooltip(false);
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/venn/demo/venn-hollow.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/venn/demo/venn-hollow.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/venn/demo/venn-hollow.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hollow Venn</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/venn/demo/venn-hollow.ts
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
