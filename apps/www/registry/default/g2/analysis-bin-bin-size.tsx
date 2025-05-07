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

// Original G2 example path: integration/G2/site/examples/analysis/bin/demo/bin-size.ts



export default function G2ChartComponent_analysis_bin_bin_size() {
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
          .point()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/movies.json',
          })
          .encode('x', 'IMDB Rating')
          .encode('y', 'Rotten Tomatoes Rating')
          .encode('shape', 'point')
          .transform({ type: 'bin', size: 'count', thresholdsX: 10, thresholdsY: 10 })
          .tooltip({
            title: { channel: 'size' },
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
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/analysis/bin/demo/bin-size.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/analysis/bin/demo/bin-size.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/analysis/bin/demo/bin-size.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bin Size Channel</CardTitle>
        <CardDescription>
          G2 Chart. Original example: analysis/bin/demo/bin-size.ts
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
