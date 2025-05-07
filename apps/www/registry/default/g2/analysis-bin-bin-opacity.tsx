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

// Original G2 example path: integration/G2/site/examples/analysis/bin/demo/bin-opacity.ts



export default function G2ChartComponent_analysis_bin_bin_opacity() {
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
          .rect()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/athletes.json',
          })
          .encode('x', 'weight')
          .encode('y', 'height')
          .encode('color', 'sex')
          .transform({ type: 'bin', opacity: 'count' })
          .legend('opacity', false)
          .style('inset', 0.5)
          .tooltip({
            title: { channel: 'opacity' },
            items: [
              (d, i, data, column) => ({
                name: 'weight',
                value: `${column.x.value[i]}, ${column.x1.value[i]}`,
              }),
              (d, i, data, column) => ({
                name: 'height',
                value: `${column.y.value[i]}, ${column.y1.value[i]}`,
              }),
            ],
          });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/analysis/bin/demo/bin-opacity.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/analysis/bin/demo/bin-opacity.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/analysis/bin/demo/bin-opacity.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bin Opacity Channel</CardTitle>
        <CardDescription>
          G2 Chart. Original example: analysis/bin/demo/bin-opacity.ts
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
