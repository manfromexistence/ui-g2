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

// Original G2 example path: integration/G2/site/examples/general/area/demo/area-with-negative.ts



export default function G2ChartComponent_general_area_area_with_negative() {
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
        
        
        chart
          .data({
            value: data,
            transform: [
              {
                type: 'fold',
                fields: ['north', 'south'],
                key: 'type', // key字段
                value: 'value', // value字段
              },
            ],
          })
          .encode('x', (d) => d.year)
          .encode('y', 'value')
          .encode('color', 'type');
        
        g2ChartInstance.current.area().style('fillOpacity', 0.3);
        
        g2ChartInstance.current.line().style('strokeWidth', 2).tooltip(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/area/demo/area-with-negative.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/area/demo/area-with-negative.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/area/demo/area-with-negative.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>With Negative Area Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/area/demo/area-with-negative.ts
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
