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

// Original G2 example path: integration/G2/site/examples/analysis/bin/demo/bin-color.ts



export default function G2ChartComponent_analysis_bin_bin_color() {
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
          .rect()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/movies.json',
          })
          .encode('x', 'IMDB Rating')
          .encode('y', 'Rotten Tomatoes Rating')
          .transform({ type: 'bin', color: 'count', thresholdsX: 30, thresholdsY: 20 })
          .scale('color', { palette: 'ylGnBu' })
          .tooltip({
            title: { channel: 'color' },
            items: [
              (d, i, data, column) => ({
                name: 'IMDB Rating',
                value: `${column.x.value[i]}, ${column.x1.value[i]}`,
              }),
              (d, i, data, column) => ({
                name: 'Rotten Tomatoes Rating',
                value: `${column.y.value[i]}, ${column.y1.value[i]}`,
              }),
            ],
            render: () => '1',
          });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/analysis/bin/demo/bin-color.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/analysis/bin/demo/bin-color.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/analysis/bin/demo/bin-color.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bin Color Channel</CardTitle>
        <CardDescription>
          G2 Chart. Original example: analysis/bin/demo/bin-color.ts
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
