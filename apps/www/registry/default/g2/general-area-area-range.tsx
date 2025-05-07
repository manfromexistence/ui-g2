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

// Original G2 example path: integration/G2/site/examples/general/area/demo/area-range.ts



export default function G2ChartComponent_general_area_area_range() {
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
          .data({
            value: data,
            transform: [
              {
                type: 'map',
                callback: (d) => ({
                  time: d.time,
                  low: d.temperature[0],
                  high: d.temperature[1],
                }),
              },
            ],
          })
          .axis('y', { title: false });
        
        chart
          .area()
          .encode('x', (d) => new Date(d.time).toLocaleDateString())
          .encode('y', ['low', 'high'])
          .encode('shape', 'area')
          .style('fillOpacity', 0.3)
          .style('fill', '#64b5f6')
          .tooltip({
            items: [(d) => ({ name: '温度区间', value: `${d.low}-${d.high}` })],
          });
        
        chart
          .line()
          .data(averages)
          .encode('x', (d) => new Date(d.time).toLocaleDateString())
          .encode('y', 'temperature')
          .encode('shape', 'line')
          .style('lineWidth', 2)
          .tooltip({
            title: false,
            items: [
              (d) => ({
                name: '平均温度',
                value: d.temperature,
              }),
            ],
          });
        chart
          .point()
          .data(averages)
          .encode('x', (d) => new Date(d.time).toLocaleDateString())
          .encode('y', 'temperature')
          .encode('shape', 'point')
          .encode('size', 4)
          .tooltip(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/area/demo/area-range.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/area/demo/area-range.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/area/demo/area-range.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Range Area Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/area/demo/area-range.ts
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
