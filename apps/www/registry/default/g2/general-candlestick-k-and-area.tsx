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

// Original G2 example path: integration/G2/site/examples/general/candlestick/demo/k-and-area.ts



export default function G2ChartComponent_general_candlestick_k_and_area() {
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
          .data({
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/stock-03.json',
          })
          .encode('x', 'date')
          .scale('color', {
            domain: ['down', 'up'],
            range: ['#4daf4a', '#e41a1c'],
          })
          .scale('x', {
            compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
          })
          .scale('y', {
            domain: [20, 35],
          })
          .axis('x', {
            labelFormatter: (d) => new Date(d).toLocaleDateString(),
          });
        
        chart.interaction('tooltip', {
          shared: true,
        });
        
        g2ChartInstance.current
          .area()
          .encode('y', 'range')
          .style('fillOpacity', 0.3)
          .style('fill', '#64b5f6')
          .animate(false);
        
        g2ChartInstance.current
          .link()
          .encode('y', ['lowest', 'highest'])
          .encode('color', 'trend')
          .animate('enter', {
            type: 'waveIn',
          });
        
        g2ChartInstance.current
          .interval()
          .encode('y', ['start', 'end'])
          .encode('color', 'trend')
          .style('fillOpacity', 1)
          .axis('y', {
            title: false,
          })
          .tooltip({
            title: 'date',
            items: [
              { field: 'start' },
              { field: 'end' },
              { field: 'lowest' },
              { field: 'highest' },
            ],
          })
          .animate('enter', {
            type: 'waveIn',
          });
        
        chart.line().encode('x', 'date').encode('y', 'mean').style('stroke', '#FACC14');
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/candlestick/demo/k-and-area.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/candlestick/demo/k-and-area.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/candlestick/demo/k-and-area.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Candlestick chart and area range</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/candlestick/demo/k-and-area.ts
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
