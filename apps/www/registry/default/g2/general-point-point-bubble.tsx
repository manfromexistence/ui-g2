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

// Original G2 example path: integration/G2/site/examples/general/point/demo/point-bubble.ts



export default function G2ChartComponent_general_point_point_bubble() {
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
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/2b48887c-56fb-437e-a91c-6f48e80e5a91.csv',
            transform: [
              {
                type: 'filter',
                callback: (d) => d.Entity !== 'All natural disasters',
              },
            ],
          })
          .encode('x', 'Year')
          .encode('y', 'Entity')
          .encode('size', 'Deaths')
          .encode('color', 'Entity')
          .encode('shape', 'point')
          .scale('size', { rangeMax: 35 })
          .legend(false)
          .style({
            stroke: 'black',
            strokeOpacity: 0.1,
            opacity: 0.8,
            lineWidth: 1,
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/point/demo/point-bubble.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/point/demo/point-bubble.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/point/demo/point-bubble.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bubble Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/point/demo/point-bubble.ts
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
