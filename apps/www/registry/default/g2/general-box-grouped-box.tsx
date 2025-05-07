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

// Original G2 example path: integration/G2/site/examples/general/box/demo/grouped-box.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  {
    Species: 'I. setosa',
    type: 'SepalLength',
    value: 5.1,
    bin: [4.3, 4.8, 5, 5.2, 5.8],
  },
  {
    Species: 'I. setosa',
    type: 'SepalWidth',
    value: 3.5,
    bin: [2.3, 3.2, 3.4, 3.7, 4.4],
  },
  {
    Species: 'I. setosa',
    type: 'PetalLength',
    value: 1.4,
    bin: [1, 1.4, 1.5, 1.6, 1.9],
  },
  {
    Species: 'I. setosa',
    type: 'PetalWidth',
    value: 0.2,
    bin: [0.1, 0.2, 0.2, 0.3, 0.6],
  },
  {
    Species: 'I. versicolor',
    type: 'SepalLength',
    value: 7,
    bin: [4.9, 5.6, 5.9, 6.3, 7],
  },
  {
    Species: 'I. versicolor',
    type: 'SepalWidth',
    value: 3.2,
    bin: [2, 2.5, 2.8, 3, 3.4],
  },
  {
    Species: 'I. versicolor',
    type: 'PetalLength',
    value: 4.7,
    bin: [3, 4, 4.35, 4.6, 5.1],
  },
  {
    Species: 'I. versicolor',
    type: 'PetalWidth',
    value: 1.4,
    bin: [1, 1.2, 1.3, 1.5, 1.8],
  },
  {
    Species: 'I. virginica',
    type: 'SepalLength',
    value: 6.3,
    bin: [4.9, 6.2, 6.5, 6.9, 7.9],
  },
  {
    Species: 'I. virginica',
    type: 'SepalWidth',
    value: 3.3,
    bin: [2.2, 2.8, 3, 3.2, 3.8],
  },
  {
    Species: 'I. virginica',
    type: 'PetalLength',
    value: 6,
    bin: [4.5, 5.1, 5.55, 5.9, 6.9],
  },
  {
    Species: 'I. virginica',
    type: 'PetalWidth',
    value: 2.5,
    bin: [1.4, 1.8, 2, 2.3, 2.5],
  },
];

export default function G2ChartComponent_general_box_grouped_box() {
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
        
        
        g2ChartInstance.current
          .box()
          .data(data)
          .encode('x', 'type')
          .encode('y', 'bin')
          .encode('series', 'Species')
          .encode('color', 'Species')
          .scale('x', { paddingInner: 0.2, paddingOuter: 0.1 })
          .scale('y', { zero: true })
          .scale('series', { paddingInner: 0.3, paddingOuter: 0.1 })
          .style('stroke', 'black')
          .tooltip([
            { name: 'min', channel: 'y' },
            { name: 'q1', channel: 'y1' },
            { name: 'q2', channel: 'y2' },
            { name: 'q3', channel: 'y3' },
            { name: 'max', channel: 'y4' },
          ]);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/box/demo/grouped-box.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/box/demo/grouped-box.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/box/demo/grouped-box.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Grouped Boxplot</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/box/demo/grouped-box.ts
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
