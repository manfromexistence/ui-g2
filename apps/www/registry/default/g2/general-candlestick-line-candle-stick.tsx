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

// Original G2 example path: integration/G2/site/examples/general/candlestick/demo/line-candle-stick.ts



export default function G2ChartComponent_general_candlestick_line_candle_stick() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        chart
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/aapl2.json',
            transform: [
              {
                type: 'map',
                callback: (d) => ({
                  ...d,
                  Date: new Date(d.Date),
                }),
              },
            ],
          })
          .scale('color', {
            domain: [1, 0, -1],
            range: ['#4daf4a', '#999999', '#e41a1c'],
          });
        
        chart
          .link()
          .encode('x', 'Date')
          .encode('y', ['Low', 'High'])
          .encode('color', (d) => Math.sign(d.Close - d.Open)) // For LegendFilter.
          .style('stroke', 'black')
          .tooltip({
            title: (d) => d.Date.toLocaleString(),
            items: [
              { field: 'Low', name: 'low' },
              { field: 'High', name: 'high' },
            ],
          });
        
        chart
          .link()
          .encode('x', 'Date')
          .encode('y', ['Open', 'Close'])
          .encode('color', (d) => Math.sign(d.Close - d.Open))
          .style('radius', 2)
          .style('fillOpacity', 1)
          .style('lineWidth', 4)
          .style('lineCap', 'round')
          .tooltip({
            title: '',
            items: [
              { field: 'Open', name: 'open' },
              { field: 'Close', name: 'close' },
            ],
          });
        
        chartRef.current.interaction('tooltip', { shared: true, groupName: false });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/candlestick/demo/line-candle-stick.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/candlestick/demo/line-candle-stick.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/candlestick/demo/line-candle-stick.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Candlestick chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/candlestick/demo/line-candle-stick.ts
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
