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

// Original G2 example path: integration/G2/site/examples/storytelling/storytelling/demo/gantt.ts

// Helper code extracted from original (review and adapt if necessary):
const events = [
  { name: 'event planning', startTime: 1, endTime: 4 },
  { name: 'layout logistics', startTime: 3, endTime: 13 },
  { name: 'select vendors', startTime: 5, endTime: 8 },
  { name: 'hire venue', startTime: 9, endTime: 13 },
  { name: 'hire caterer', startTime: 10, endTime: 14 },
  { name: 'hire event decorators', startTime: 12, endTime: 17 },
  { name: 'rehearsal', startTime: 14, endTime: 16 },
  { name: 'event celebration', startTime: 17, endTime: 18 },
];

export default function G2ChartComponent_storytelling_storytelling_gantt() {
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
        
        
        g2ChartInstance.current.coordinate({ transform: [{ type: 'transpose' }] });
        
        chart
          .interval()
          .data(events)
          .encode('x', 'name')
          .encode('y', ['endTime', 'startTime'])
          .encode('color', 'name')
          .encode('enterDuration', (d) => d.endTime - d.startTime)
          .encode('enterDelay', 'startTime')
          .scale('enterDuration', {
            zero: true,
            range: [0, 3000],
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/storytelling/storytelling/demo/gantt.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/storytelling/storytelling/demo/gantt.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/storytelling/storytelling/demo/gantt.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gantt with Animation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: storytelling/storytelling/demo/gantt.ts
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
