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

// Original G2 example path: integration/G2/site/examples/animation/general/demo/zoom-in.ts



export default function G2ChartComponent_animation_general_zoom_in() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          insetLeft: 30,
        });
        
        
        chart
          .point()
          .data({
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/bubble.json',
          })
          .encode('x', 'GDP')
          .encode('y', 'LifeExpectancy')
          .encode('color', 'continent')
          .encode('size', 'Population')
          .encode('shape', 'point')
          .scale('size', { range: [4, 65] })
          .scale('y', { domain: [65, 90] })
          .style('fillOpacity', 0.3)
          .style('lineWidth', 1)
          .legend('size', false)
          .animate('enter', { type: 'zoomIn', duration: 1000 });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/animation/general/demo/zoom-in.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/animation/general/demo/zoom-in.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/animation/general/demo/zoom-in.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ZoomIn</CardTitle>
        <CardDescription>
          G2 Chart. Original example: animation/general/demo/zoom-in.ts
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
