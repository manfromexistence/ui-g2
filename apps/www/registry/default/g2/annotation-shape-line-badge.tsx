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

// Original G2 example path: integration/G2/site/examples/annotation/shape/demo/line-badge.ts



export default function G2ChartComponent_annotation_shape_line_badge() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          insetTop: 50,
        });
        
        
        chartRef.current
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
            transform: [
              {
                type: 'fold',
                fields: ['blockchain', 'nlp'],
                key: 'type',
                value: 'value',
              },
            ],
          })
          .axis('x', { labelAutoHide: 'greedy' });
        
        chartRef.current
          .line()
          .encode('x', (d) => new Date(d.date))
          .encode('y', 'value')
          .encode('color', 'type');
        
        chartRef.current
          .text()
          .data([new Date('2017-12-17'), 100])
          .encode('shape', 'badge')
          .style({
            text: '100',
            dy: -1,
            markerSize: 24,
            markerFill: '#6395FA',
            markerFillOpacity: 0.55,
          });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/shape/demo/line-badge.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/shape/demo/line-badge.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/shape/demo/line-badge.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line, Badge Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/shape/demo/line-badge.ts
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
