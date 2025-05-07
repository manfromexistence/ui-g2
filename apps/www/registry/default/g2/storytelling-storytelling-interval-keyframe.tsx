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

// Original G2 example path: integration/G2/site/examples/storytelling/storytelling/demo/interval-keyframe.ts

// Helper code extracted from original (review and adapt if necessary):
const sex = [
  { city: 'A', sex: '男', value: 52 },
  { city: 'A', sex: '女', value: 48 },
  { city: 'B', sex: '男', value: 130 },
  { city: 'B', sex: '女', value: 70 },
];

export default function G2ChartComponent_storytelling_storytelling_interval_keyframe() {
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
        
        
        const keyframe = chart.timingKeyframe();
        
        keyframe
          .interval()
          .data(sex)
          .transform({ type: 'groupX', y: 'sum' })
          .encode('x', 'city')
          .encode('y', 'value')
          .encode('key', 'city');
        
        keyframe
          .interval()
          .data(sex)
          .transform({ type: 'dodgeX' })
          .encode('x', 'city')
          .encode('y', 'value')
          .encode('color', 'sex')
          .encode('groupKey', 'city');
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/storytelling/storytelling/demo/interval-keyframe.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/storytelling/storytelling/demo/interval-keyframe.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/storytelling/storytelling/demo/interval-keyframe.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interval Keyframe</CardTitle>
        <CardDescription>
          G2 Chart. Original example: storytelling/storytelling/demo/interval-keyframe.ts
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
