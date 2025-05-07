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

// Original G2 example path: integration/G2/site/examples/annotation/line/demo/anomaly-area-line.ts



export default function G2ChartComponent_annotation_line_anomaly_area_line() {
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
        
        
        g2ChartInstance.current.data(Data);
        
        chart
          .area()
          .encode('x', (d) => new Date(d[0]))
          .encode('y', [(d) => d[1], (d) => d[2]])
          .encode('shape', 'smooth')
          .style('fillOpacity', 0.1)
          .style('fill', 'orange');
        
        chart
          .line()
          .encode('x', (d) => new Date(d[0]))
          .encode('y', (d) => d[3])
          .encode('color', '#FF6B3B')
          .encode('shape', 'smooth');
        
        chart
          .line()
          .encode('x', (d) => new Date(d[0]))
          .encode('y', (d) => d[4])
          .encode('color', '#5B8FF9')
          .style('lineWidth', 2);
        
        chart
          .point()
          .data([
            ['01-08', 0.417885699969663],
            ['01-23', 0.706678090635692],
            ['01-31', 3.703],
            ['03-12', 6.0515889109663],
          ])
          .encode('x', (d) => new Date(d[0]))
          .encode('y', (d) => d[1])
          .encode('color', '#FF6B3B')
          .encode('shape', 'point')
          .encode('size', 3)
          .style('lineWidth', 1)
          .style('stroke', '#FFF');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/line/demo/anomaly-area-line.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/line/demo/anomaly-area-line.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/line/demo/anomaly-area-line.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Anomaly Trend Line, Area Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/line/demo/anomaly-area-line.ts
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
