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

// Original G2 example path: integration/G2/site/examples/general/heatmap/demo/heatmap.ts



export default function G2ChartComponent_general_heatmap_heatmap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          padding: 0,
        });
        
        
        g2ChartInstance.current.axis(false);
        
        chart
          .image()
          .style(
            'src',
            'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
          )
          .style('x', '50%')
          .style('y', '50%')
          .style('width', '100%')
          .style('height', '100%')
          .tooltip(false);
        
        chart
          .heatmap()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/heatmap.json',
          })
          .encode('x', 'g')
          .encode('y', 'l')
          .encode('color', 'tmp')
          .style('opacity', 0)
          .tooltip(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/heatmap/demo/heatmap.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/heatmap/demo/heatmap.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/heatmap/demo/heatmap.ts:", e);
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
          G2 Chart. Original example: general/heatmap/demo/heatmap.ts
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
