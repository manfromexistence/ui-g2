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

// Original G2 example path: integration/G2/site/examples/general/link/demo/link.ts



export default function G2ChartComponent_general_link_link() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        chartRef.current
          .link()
          .data({
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/antfincdn/SM13%24lHuYH/metros.json',
          })
          .encode('x', ['POP_1980', 'POP_2015'])
          .encode('y', ['R90_10_1980', 'R90_10_2015'])
          .encode('color', (d) => d.R90_10_2015 - d.R90_10_1980)
          .scale('x', { type: 'log' })
          .style('arrow', true)
          .style('arrowSize', 6)
          .axis('x', {
            labelFormatter: '~s',
            labelTransform: 'rotate(90)',
          })
          .legend(false)
          .tooltip({ title: { channel: 'color', valueFormatter: '.1f' } });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/link/demo/link.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/link/demo/link.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/link/demo/link.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Link Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/link/demo/link.ts
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
