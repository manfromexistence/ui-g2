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

// Original G2 example path: integration/G2/site/examples/component/legend/demo/custom.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];



const colorField = 'genre';


function renderCustomLegend(chart) {
  // Get color scale.
  const scale = chart.getScaleByChannel('color');


export default function G2ChartComponent_component_legend_custom() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        const chart = new Chart({
          container: chartRef.current,
        });
        // TODO: Manually adapt the rest of the G2 chart logic from the original script below.
        // Ensure you call chart.render() and assign to g2ChartInstance.current if needed.
        // Original script content (partial):
        // 
        // 
        // const data = [
        //   { genre: 'Sports', sold: 275 },
        //   { genre: 'Strategy', sold: 115 },
        //   { genre: 'Action', sold: 120 },
        //   { genre: 'Shooter', sold: 350 },
        //   { genre: 'Other', sold: 150 },
        // ];
        // 
        // const colorField = 'genre';
        // 
        // chart
        //   .interval()
        //   .data(data)
        //   .encode('x', 'genre')
        //   .encode('y', 'sold')
        //   .encode('color', colorField)
        //   .legend(false); // Hide built-in legends.
        // 
        // chart.render().then(renderCustomLegend);
        // 
        // function renderCustomLegend(chart) {
        //   // Get color scale.
        //   const scale = char
        ...
        // g2ChartInstance.current = chart; // Example assignment
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/legend/demo/custom.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/legend/demo/custom.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/legend/demo/custom.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Custom Legend</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/legend/demo/custom.ts
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
