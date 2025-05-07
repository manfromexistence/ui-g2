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

// Original G2 example path: integration/G2/site/examples/algorithm/sort/demo/insertion-sort.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [43, 2, 5, 24, 53, 78, 82, 63, 49, 6];



function* insertionSort(arr) {
  const len = arr.length;

export default function G2ChartComponent_algorithm_sort_insertion_sort() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        const keyframe = chart.timingKeyframe();
        
        for (const frame of insertionSort(data)) {
          keyframe
            .interval()
            .data(frame.map((datum, index) => ({ index, ...datum })))
            .encode('x', 'index')
            .encode('y', 'value')
            .encode('key', 'value')
            .encode('color', 'swap');
        }
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/algorithm/sort/demo/insertion-sort.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/algorithm/sort/demo/insertion-sort.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/algorithm/sort/demo/insertion-sort.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Insertion Sort</CardTitle>
        <CardDescription>
          G2 Chart. Original example: algorithm/sort/demo/insertion-sort.ts
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
