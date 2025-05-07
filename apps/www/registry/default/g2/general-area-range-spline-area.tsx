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

// Original G2 example path: integration/G2/site/examples/general/area/demo/range-spline-area.ts



export default function G2ChartComponent_general_area_range_spline_area() {
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
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/range-spline-area.json',
            transform: [
              {
                type: 'map',
                callback: ([x, low, high, v2, v3]) => ({ x, low, high, v2, v3 }),
              },
            ],
          })
          .axis('y', { title: false })
          .scale('x', { type: 'linear', tickCount: 10 });
        
        g2ChartInstance.current
          .area()
          .encode('x', 'x')
          .encode('y', ['low', 'high'])
          .encode('shape', 'smooth')
          .style('fillOpacity', 0.65)
          .style('fill', '#64b5f6')
          .style('lineWidth', 1);
        
        g2ChartInstance.current
          .point()
          .encode('x', 'x')
          .encode('y', 'v2')
          .encode('size', 2)
          .encode('shape', 'point')
          .tooltip('v2');
        
        g2ChartInstance.current
          .line()
          .encode('x', 'x')
          .encode('y', 'v3')
          .encode('color', '#FF6B3B')
          .encode('shape', 'smooth');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/area/demo/range-spline-area.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/area/demo/range-spline-area.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/area/demo/range-spline-area.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Range Spline Area Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/area/demo/range-spline-area.ts
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
