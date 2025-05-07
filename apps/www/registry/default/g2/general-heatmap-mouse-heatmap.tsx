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

// Original G2 example path: integration/G2/site/examples/general/heatmap/demo/mouse-heatmap.ts

// Helper code extracted from original (review and adapt if necessary):
const data = {};

export default function G2ChartComponent_general_heatmap_mouse_heatmap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          width: 640,
          height: 480,
          padding: 0,
        });
        
        
        chart.style({
          viewFill: '#4e79a7',
        });
        
        chart.data([]);
        chart.axis(false);
        
        chartRef.current
          .heatmap()
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('color', 'v')
          .scale('x', { domain: [0, 640] })
          .scale('y', { domain: [0, 480], range: [0, 1] })
          .style('opacity', 0)
          .tooltip(false)
          .animate(false);
        
        chart.render();
        
        chart.on(
          'plot:pointermove',
          throttle((e) => {
            const { x, y } = e;
        
            const kx = Math.floor(x - (x % 8));
            const ky = Math.floor(y - (y % 8));
        
            if (!data[kx]) data[kx] = {};
            if (!data[kx][ky]) data[kx][ky] = 0;
        
            data[kx][ky] += 1;
        
            const d = transform(data);
        
            chart.changeData(d);
          }),
        );
        
        function transform(dataMap) {
          const arr = [];
          Object.keys(dataMap).forEach((x) => {
            Object.keys(dataMap[x]).forEach((y) => {
              arr.push({ x, y, v: dataMap[x][y] });
            });
          });
          return arr;
        }
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/heatmap/demo/mouse-heatmap.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/heatmap/demo/mouse-heatmap.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/heatmap/demo/mouse-heatmap.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mouse Heatmap</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/heatmap/demo/mouse-heatmap.ts
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
