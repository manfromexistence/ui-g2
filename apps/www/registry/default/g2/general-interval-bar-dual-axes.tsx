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

// Original G2 example path: integration/G2/site/examples/general/interval/demo/bar-dual-axes.ts

// Helper code extracted from original (review and adapt if necessary):
const labelFormatter = (d) => Math.abs(d) + (d < 0 ? 'BC' : d > 0 ? 'AC' : '');

const left = (d) => d.end > -1500 && d.start > -3000;

export default function G2ChartComponent_general_interval_bar_dual_axes() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 900,
          height: 1000,
        });
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current.coordinate({ transform: [{ type: 'transpose' }] });
        
        g2ChartInstance.current
          .interval()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/world-history.json',
          })
          .transform({ type: 'sortX', by: 'y' })
          .transform({ type: 'sortColor', by: 'y', reducer: 'min' })
          .axis('y', [
            {
              tickCount: 5,
              labelFormatter,
              grid: null,
              title: null,
            },
            {
              position: 'top',
              labelFormatter,
              title: null,
            },
          ])
          .axis('x', false)
          .encode('x', 'civilization')
          .encode('y', ['start', 'end'])
          .encode('color', 'region')
          .scale('color', { palette: 'set2' })
          .label({
            text: 'civilization',
            position: (d) => (left(d) ? 'left' : 'right'),
            textAlign: (d) => (left(d) ? 'end' : 'start'),
            dx: (d) => (left(d) ? -5 : 5),
            fontSize: 10,
          })
          .tooltip([
            { name: 'start', field: 'start', valueFormatter: labelFormatter },
            { name: 'end', field: 'end', valueFormatter: labelFormatter },
          ]);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/interval/demo/bar-dual-axes.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/interval/demo/bar-dual-axes.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/interval/demo/bar-dual-axes.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dual Axes Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/interval/demo/bar-dual-axes.ts
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
