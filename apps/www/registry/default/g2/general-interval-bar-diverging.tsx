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

// Original G2 example path: integration/G2/site/examples/general/interval/demo/bar-diverging.ts



export default function G2ChartComponent_general_interval_bar_diverging() {
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
        
        
        chart.coordinate({ transform: [{ type: 'transpose' }] });
        
        g2ChartInstance.current
          .interval()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
            transform: [
              {
                type: 'filter',
                callback: (d) => d.year === 2000,
              },
            ],
          })
          .encode('x', 'age')
          .encode('y', (d) => (d.sex === 1 ? -d.people : d.people))
          .encode('color', 'sex')
          .scale('color', { type: 'ordinal' })
          .scale('x', { range: [1, 0] })
          .axis('y', { labelFormatter: '~s' })
          .legend('color', { labelFormatter: (d) => (d === 1 ? 'Male' : 'Female') })
          .tooltip((d) => ({ value: d.people, name: d.sex === 1 ? 'Male' : 'Female' }));
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/interval/demo/bar-diverging.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/interval/demo/bar-diverging.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/interval/demo/bar-diverging.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Diverging Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/interval/demo/bar-diverging.ts
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
