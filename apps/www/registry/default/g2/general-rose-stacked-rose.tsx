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

// Original G2 example path: integration/G2/site/examples/general/rose/demo/stacked-rose.ts



export default function G2ChartComponent_general_rose_stacked_rose() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 800,
          height: 800,
        });
        
        
        const colors = [
          '#98abc5',
          '#8a89a6',
          '#7b6888',
          '#6b486b',
          '#a05d56',
          '#d0743c',
          '#ff8c00',
        ];
        
        g2ChartInstance.current.coordinate({ type: 'polar', innerRadius: 0.4 });
        
        chart
          .interval()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/d582a447-2057-4a74-97ed-1d73a5459ea4.csv',
            transform: [
              {
                type: 'fold',
                fields: [
                  'Under 5 Years',
                  '5 to 13 Years',
                  '14 to 17 Years',
                  '18 to 24 Years',
                  '25 to 44 Years',
                  '45 to 64 Years',
                  '65 Years and Over',
                ],
                key: 'Age',
                value: 'Population',
              },
            ],
          })
          .transform({ type: 'stackY' })
          .encode('x', 'State')
          .encode('y', 'Population')
          .encode('color', 'Age')
          .scale('color', { range: colors })
          .legend('color', { position: 'center', display: 'grid', gridCol: 1 })
          .scale('y', { type: 'sqrt' })
          .axis('y', {
            labelFormatter: '~s',
            tickFilter: (_, i) => i !== 0,
            direction: 'center',
          })
          .axis('x', { position: 'inner' })
          .animate('enter', { type: 'waveIn' });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/rose/demo/stacked-rose.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/rose/demo/stacked-rose.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/rose/demo/stacked-rose.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Stacked Rose Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/rose/demo/stacked-rose.ts
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
