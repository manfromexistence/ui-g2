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

// Original G2 example path: integration/G2/site/examples/general/dual/demo/dual-aggregated-line-area.ts



export default function G2ChartComponent_general_dual_dual_aggregated_line_area() {
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
        
        
        chart.data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/weather.json',
          transform: [
            {
              type: 'filter',
              callback: (d) => d.location === 'Seattle',
            },
          ],
        });
        
        g2ChartInstance.current
          .area()
          .transform({ type: 'groupX', y: 'mean', y1: 'mean' })
          .encode('x', (d) => new Date(d.date).getUTCMonth())
          .encode('y', ['temp_max', 'temp_min'])
          .scale('y', { nice: true })
          .axis('y', {
            title: 'Avg. Temperature (°C)',
            titleFill: '#85C5A6',
          })
          .style('fill', '#85c5A6')
          .style('fillOpacity', 0.3)
          .tooltip({ channel: 'y', valueFormatter: '.1f' })
          .tooltip({ channel: 'y1', valueFormatter: '.1f' });
        
        g2ChartInstance.current
          .line()
          .transform({ type: 'groupX', y: 'mean' })
          .encode('x', (d) => new Date(d.date).getMonth())
          .encode('y', 'precipitation')
          .encode('shape', 'smooth')
          .style('stroke', 'steelblue')
          .scale('y', { independent: true })
          .axis('y', {
            position: 'right',
            grid: null,
            title: 'Precipitation (inches)',
            titleFill: 'steelblue',
          })
          .tooltip({ channel: 'y', valueFormatter: '.1f' });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/dual/demo/dual-aggregated-line-area.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/dual/demo/dual-aggregated-line-area.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/dual/demo/dual-aggregated-line-area.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Aggregated Dual Line And Area Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/dual/demo/dual-aggregated-line-area.ts
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
