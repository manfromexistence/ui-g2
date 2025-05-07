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

// Original G2 example path: integration/G2/site/examples/general/line/demo/line-slope.ts



export default function G2ChartComponent_general_line_line_slope() {
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
          .line()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/f0bbdcaa-9dbf-4d44-95c1-ac2e26765023.csv',
          })
          .encode('x', 'year')
          .encode('y', 'receipts')
          .encode('series', 'country')
          .encode('color', '#000')
          .scale('x', { type: 'point', padding: 0.25 })
          .label({
            text: (d) => `${d.country} ${d.receipts}`,
            selector: 'first',
            transform: [{ type: 'overlapDodgeY' }],
            fontSize: 10,
            dx: -3,
            textAlign: 'end',
          })
          .label({
            text: (d) => `${d.receipts} ${d.country}`,
            selector: 'last',
            transform: [{ type: 'overlapDodgeY' }],
            fontSize: 10,
            dx: 3,
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/line/demo/line-slope.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/line/demo/line-slope.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/line/demo/line-slope.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Slope Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/line/demo/line-slope.ts
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
