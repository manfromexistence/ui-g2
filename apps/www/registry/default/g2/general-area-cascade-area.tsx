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

// Original G2 example path: integration/G2/site/examples/general/area/demo/cascade-area.ts



export default function G2ChartComponent_general_area_cascade_area() {
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
        
        
        g2ChartInstance.current.data({
          type: 'fetch',
          value:
            'https://gw.alipayobjects.com/os/bmw-prod/f38a8ad0-6e1f-4bb3-894c-7db50781fdec.json',
        });
        
        g2ChartInstance.current
          .area()
          .transform({ type: 'stackY', orderBy: 'maxIndex', reverse: true })
          .encode('x', (d) => new Date(d.year))
          .encode('y', 'revenue')
          .encode('series', 'format')
          .encode('color', 'group')
          .encode('shape', 'smooth')
          .axis('y', { labelFormatter: '~s' })
          .tooltip({ channel: 'y', valueFormatter: '.2f' });
        
        g2ChartInstance.current
          .line()
          .transform({ type: 'stackY', orderBy: 'maxIndex', reverse: true, y: 'y1' })
          .encode('x', (d) => new Date(d.year))
          .encode('y', 'revenue')
          .encode('series', 'format')
          .encode('shape', 'smooth')
          .encode('color', 'group') // For legendFilter.
          .style('stroke', 'white')
          .tooltip(false);
        
        g2ChartInstance.current.interaction('tooltip', { filter: (d) => parseInt(d.value) > 0 });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/area/demo/cascade-area.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/area/demo/cascade-area.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/area/demo/cascade-area.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stacked Area</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/area/demo/cascade-area.ts
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
