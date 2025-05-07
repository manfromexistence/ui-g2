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

// Original G2 example path: integration/G2/site/examples/composition/repeat/demo/matrix-col.ts



export default function G2ChartComponent_composition_repeat_matrix_col() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 300,
          height: 720,
          paddingLeft: 60,
          paddingBottom: 60,
        });
        
        
        const repeatMatrix = g2ChartInstance.current
          .repeatMatrix()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/weather.json',
            transform: [
              {
                type: 'map',
                callback: ({ date, ...d }) => ({
                  ...d,
                  date: new Date(date).getMonth() + '',
                }),
              },
            ],
          })
          .encode('y', ['temp_max', 'precipitation', 'wind'])
          .encode('x', 'date');
        
        repeatMatrix
          .line()
          .transform({ type: 'groupX', y: 'mean' })
          .encode('color', 'location')
          .scale('y', { zero: true });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/composition/repeat/demo/matrix-col.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/composition/repeat/demo/matrix-col.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/composition/repeat/demo/matrix-col.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Repeat Matrix, Col</CardTitle>
        <CardDescription>
          G2 Chart. Original example: composition/repeat/demo/matrix-col.ts
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
