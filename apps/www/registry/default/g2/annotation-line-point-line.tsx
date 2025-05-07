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

// Original G2 example path: integration/G2/site/examples/annotation/line/demo/point-line.ts



export default function G2ChartComponent_annotation_line_point_line() {
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
          .point()
          .data([
            { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
            { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
            { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
            { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
            { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
            { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
            { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
            { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
            { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
            { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
            { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
            { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
            { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
            { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
            { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' },
          ])
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('size', 'z')
          .encode('shape', 'point')
          .scale('x', { nice: true })
          .scale('y', { nice: true, domainMax: 165, zero: true })
          .scale('size', { range: [10, 40] })
          .style('stroke', '#1890ff')
          .style('fillOpacity', 0.3)
          .style('fill', '#1890ff')
          .label({
            text: 'name',
            position: 'inside',
            fill: '#1890ff',
            stroke: '#fff',
          })
          .legend('size', false);
        
        g2ChartInstance.current
          .lineY()
          .data([50])
          .style('stroke', '#000')
          .style('strokeOpacity', 0.45)
          .style('lineDash', [3, 3])
          .label({
            text: 'Safe sugar intake 50g/day',
            position: 'right',
            textBaseline: 'bottom',
            fill: '#000',
            fillOpacity: 0.45,
            background: true,
            backgroundFill: '#000',
            backgroundOpacity: 0.15,
          });
        
        g2ChartInstance.current
          .lineX()
          .data([65])
          .style('stroke', '#000')
          .style('strokeOpacity', 0.45)
          .style('lineDash', [3, 3])
          .label({
            text: 'Safe fat intake 65g/day',
            position: 'top-left',
            textBaseline: 'bottom',
            fill: '#000',
            fillOpacity: 0.45,
            background: true,
            backgroundFill: '#000',
            backgroundOpacity: 0.15,
          });
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/line/demo/point-line.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/line/demo/point-line.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/line/demo/point-line.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Scatter, Line Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/line/demo/point-line.ts
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
