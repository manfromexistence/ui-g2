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

// Original G2 example path: integration/G2/site/examples/general/cell/demo/cell-heatmap.ts



export default function G2ChartComponent_general_cell_cell_heatmap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 1300,
          height: 900,
        });
        
        
        g2ChartInstance.current
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/vaccines.json',
          })
          .axis('y', { labelAutoRotate: false })
          .axis('x', {
            tickFilter: (d) => d % 10 === 0,
            position: 'top',
          })
          .scale('color', {
            palette: 'puRd',
            relations: [
              [(d) => d === null, '#eee'],
              [0, '#fff'],
            ],
          });
        
        g2ChartInstance.current
          .cell()
          .encode('x', 'year')
          .encode('y', 'name')
          .encode('color', 'value')
          .style('inset', 0.5)
          .tooltip({ title: { channel: 'color', valueFormatter: '.2f' } });
        
        g2ChartInstance.current
          .lineX()
          .data([1963])
          .style('stroke', 'black')
          .label({
            text: '1963',
            position: 'bottom',
            textBaseline: 'top',
            fontSize: 10,
          })
          .label({
            text: 'Measles vaccine introduced',
            position: 'bottom',
            textBaseline: 'top',
            fontSize: 10,
            fontWeight: 'bold',
            dy: 10,
          })
          .tooltip(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/cell/demo/cell-heatmap.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/cell/demo/cell-heatmap.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/cell/demo/cell-heatmap.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Heatmap</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/cell/demo/cell-heatmap.ts
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
