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

// Original G2 example path: integration/G2/site/examples/general/text/demo/train.ts



export default function G2ChartComponent_general_text_train() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          width: 600,
          height: 300,
          paddingLeft: 48,
        });
        
        
        const X = new Array(21).fill(0).map((_, idx) => idx + 4);
        const Y = [-3, -2, -1, 0, 1, 2, 3];
        
        // Time axis
        chart
          .text()
          .data(X.slice(1))
          .encode('x', (v) => v)
          .encode('y', 0)
          .encode('text', (v) => (v < 12 ? `${v}a` : `${v - 12}p`))
          .scale('x', { domain: X })
          .scale('y', { domain: Y })
          .style('fill', 'grey')
          .axis(false);
        
        // South / North label
        chart
          .text()
          .data(['South', 'North'])
          .encode('x', 4)
          .encode('y', (_, idx) => (idx == 0 ? -1 : 1))
          .encode('text', (t) => t)
          .scale('x', { domain: X })
          .scale('y', { domain: Y })
          .style('textAlign', 'right')
          .axis(false);
        
        // NLB
        chart
          .text()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/caltrain.json',
          })
          .transform([{ type: 'stackY' }])
          .encode('x', (d) => Number(d.hours))
          .encode('y', (d) => (d.orientation === 'S' ? -1 : 1))
          .encode('color', 'type')
          .encode('text', (d) => d.minutes.padStart(2, '0'))
          .scale('x', { domain: X })
          .scale('y', { domain: Y })
          .scale('color', { range: ['currentColor', 'peru', 'brown'] })
          .style('stroke', 'transparent');
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/text/demo/train.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/text/demo/train.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/text/demo/train.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Train</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/text/demo/train.ts
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
