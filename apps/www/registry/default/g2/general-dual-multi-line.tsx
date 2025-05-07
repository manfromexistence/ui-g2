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

// Original G2 example path: integration/G2/site/examples/general/dual/demo/multi-line.ts



export default function G2ChartComponent_general_dual_multi_line() {
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
        
        
        g2ChartInstance.current.data(data);
        
        chart
          .line()
          .encode('x', 'Month')
          .encode('y', 'Temperature')
          .encode('color', '#EE6666')
          .encode('shape', 'smooth')
          .scale('y', { independent: true, domainMax: 30 })
          .axis('y', {
            title: 'Temperature (°C)',
            grid: null,
            titleFill: '#EE6666',
          });
        
        chart
          .interval()
          .encode('x', 'Month')
          .encode('y', 'Evaporation')
          .encode('color', '#5470C6')
          .scale('y', { independent: true, domainMax: 200 })
          .style('fillOpacity', 0.8)
          .axis('y', {
            position: 'right',
            title: 'Evaporation (ml)',
            titleFill: '#5470C6',
          });
        
        chart
          .line()
          .encode('x', 'Month')
          .encode('y', 'Precipitation')
          .encode('color', '#91CC75')
          .scale('y', { independent: true })
          .style('lineWidth', 2)
          .style('lineDash', [2, 2])
          .axis('y', {
            position: 'right',
            title: 'Precipitation (ml)',
            grid: null,
            titleFill: '#91CC75',
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/dual/demo/multi-line.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/dual/demo/multi-line.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/dual/demo/multi-line.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Multi Axis Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/dual/demo/multi-line.ts
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
