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

// Original G2 example path: integration/G2/site/examples/general/mini/demo/line.ts



export default function G2ChartComponent_general_mini_line() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 480,
          height: 80,
        });
        
        
        g2ChartInstance.current.data(data);
        
        chart
          .line()
          .encode('x', (_, idx) => idx)
          .encode('y', (d) => d)
          .encode('shape', 'smooth')
          .animate('enter', { type: 'fadeIn' })
          .label({
            selector: 'last',
            text: (d) => d,
            textAlign: 'right',
            textBaseline: 'bottom',
            dx: -10,
            dy: -10,
            connector: true,
            fontSize: 10,
          })
          .axis(false);
        
        g2ChartInstance.current.interaction('tooltip', {
          render: (e, { title, items }) => items[0].value,
        });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/mini/demo/line.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/mini/demo/line.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/mini/demo/line.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mini line</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/mini/demo/line.ts
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
