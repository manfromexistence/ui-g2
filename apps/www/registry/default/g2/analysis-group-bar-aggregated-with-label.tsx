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

// Original G2 example path: integration/G2/site/examples/analysis/group/demo/bar-aggregated-with-label.ts



export default function G2ChartComponent_analysis_group_bar_aggregated_with_label() {
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
          .interval()
          .data({
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/diamond.json',
          })
          .transform({
            type: 'groupX',
            y: 'max',
          })
          .encode('x', 'clarity')
          .encode('y', 'price')
          .axis('y', { labelFormatter: '~s' })
          .label({ text: (d, i, data, { channel }) => channel.y[i] })
          .style('fill', (d, i, data, { channel }) =>
            channel.y[i] < 11700 ? '#E49361' : '#4787F7',
          )
          .tooltip({ channel: 'y', valueFormatter: '~s' });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/analysis/group/demo/bar-aggregated-with-label.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/analysis/group/demo/bar-aggregated-with-label.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/analysis/group/demo/bar-aggregated-with-label.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Aggregated Stacked Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: analysis/group/demo/bar-aggregated-with-label.ts
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
