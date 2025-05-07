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

// Original G2 example path: integration/G2/site/examples/general/interval/demo/bar-marimekko.ts



export default function G2ChartComponent_general_interval_bar_marimekko() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 900,
          height: 800,
          paddingLeft: 0,
          paddingRight: 0,
        });
        
        
        chart
          .interval()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/3041da62-1bf4-4849-aac3-01a387544bf4.csv',
          })
          .transform({ type: 'flexX', reducer: 'sum' })
          .transform({ type: 'stackY' })
          .transform({ type: 'normalizeY' })
          .encode('x', 'market')
          .encode('y', 'value')
          .encode('color', 'segment')
          .axis('y', false)
          .scale('x', { paddingOuter: 0, paddingInner: 0.01 })
          .tooltip('value')
          .label({
            text: 'segment',
            x: 5,
            y: 5,
            textAlign: 'start',
            textBaseline: 'top',
            fontSize: 10,
            fill: '#fff',
          })
          .label({
            text: 'value',
            x: 5,
            y: 5,
            textAlign: 'start',
            dy: 15,
            fontSize: 10,
            fill: '#fff',
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/interval/demo/bar-marimekko.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/interval/demo/bar-marimekko.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/interval/demo/bar-marimekko.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Marimekko</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/interval/demo/bar-marimekko.ts
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
