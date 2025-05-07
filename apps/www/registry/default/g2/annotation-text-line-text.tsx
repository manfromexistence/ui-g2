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

// Original G2 example path: integration/G2/site/examples/annotation/text/demo/line-text.ts



export default function G2ChartComponent_annotation_text_line_text() {
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
        
        chart
          .line()
          .encode('x', (d) => new Date(d.date))
          .encode('y', 'value')
          .encode('color', 'type');
        
        chart
          .text()
          .data([new Date('2017-12-17'), 100])
          .style({
            text: `2017-12-17, 受比特币影响，blockchain 搜索热度达到峰值：100`,
            wordWrap: true,
            wordWrapWidth: 164,
            dx: -174,
            dy: 30,
            fill: '#2C3542',
            fillOpacity: 0.65,
            fontSize: 10,
            background: true,
            backgroundRadius: 2,
            connector: true,
            startMarker: true,
            startMarkerFill: '#2C3542',
            startMarkerFillOpacity: 0.65,
          })
          .tooltip(false);
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/text/demo/line-text.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/text/demo/line-text.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/text/demo/line-text.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line, Text Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/text/demo/line-text.ts
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
