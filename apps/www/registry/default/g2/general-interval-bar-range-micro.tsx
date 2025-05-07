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

// Original G2 example path: integration/G2/site/examples/general/interval/demo/bar-range-micro.ts

// Helper code extracted from original (review and adapt if necessary):
const floatTimestamp = (s) => +new Date(s) + +`0.${s.slice(s.length - 3)}`;



const format = (n) => {
  const x = Math.floor(n);


export default function G2ChartComponent_general_interval_bar_range_micro() {
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
          .interval()
          .data([
            {
              task: 'task0',
              startTime: '2023-06-28 03:30:33.900123', // micro seconds
              endTime: '2023-06-28 03:30:33.900678', // micro seconds
              status: '0',
            },
            {
              task: 'task0',
              startTime: '2023-06-28 03:30:33.901123',
              endTime: '2023-06-28 03:30:33.902678',
              status: '1',
            },
          ])
          .encode('x', 'task')
          // Add float part to distinguish y and y1
          .encode('y', (d) => floatTimestamp(d.startTime))
          .encode('y1', (d) => floatTimestamp(d.endTime))
          .encode('color', 'status')
          .scale('y', {
            type: 'time',
            domain: [
              new Date('2023-06-28 03:30:33.900'),
              new Date('2023-06-28 03:30:33.903'),
            ],
          })
          .coordinate({ transform: [{ type: 'transpose' }] })
          .tooltip({ channel: 'y', valueFormatter: format })
          .tooltip({ channel: 'y1', valueFormatter: format });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/interval/demo/bar-range-micro.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/interval/demo/bar-range-micro.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/interval/demo/bar-range-micro.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Micro Range Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/interval/demo/bar-range-micro.ts
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
