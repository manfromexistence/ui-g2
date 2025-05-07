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

// Original G2 example path: integration/G2/site/examples/annotation/connector/demo/revenue-flow-waterfall.ts

// Helper code extracted from original (review and adapt if necessary):
const linkData = (data) =>
  data.reduce((r, d, idx) => {
    if (idx > 0) {
      return r.concat({
        x1: data[idx - 1].x,
        x2: d.x,
        value: d.isTotal ? d.end : d.start,
      });


export default function G2ChartComponent_annotation_connector_revenue_flow_waterfall() {
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
          .data([
            { x: 'Start', value: 23000000, start: 0, end: 23000000 },
            { x: 'Jan', value: 2200000, start: 23000000, end: 25200000 },
            { x: 'Feb', value: -4600000, start: 25200000, end: 20600000 },
            { x: 'Mar', value: -9100000, start: 20600000, end: 11500000 },
            { x: 'Apr', value: 3700000, start: 11500000, end: 15200000 },
            { x: 'May', value: -2100000, start: 15200000, end: 13100000 },
            { x: 'Jun', value: 5300000, start: 13100000, end: 18400000 },
            { x: 'Jul', value: 3100000, start: 18400000, end: 21500000 },
            { x: 'Aug', value: -1500000, start: 21500000, end: 20000000 },
            { x: 'Sep', value: 4200000, start: 20000000, end: 24200000 },
            { x: 'Oct', value: 5300000, start: 24200000, end: 29500000 },
            { x: 'Nov', value: -1500000, start: 29500000, end: 28000000 },
            { x: 'Dec', value: 5100000, start: 28000000, end: 33100000 },
            { x: 'End', isTotal: true, value: 33100000, start: 0, end: 33100000 },
          ])
          .axis('x', { title: false })
          .axis('y', { labelFormatter: '~s' })
          .legend(null);
        
        chart
          .link()
          .data({ transform: [{ type: 'custom', callback: linkData }] })
          .encode('x', ['x1', 'x2'])
          .encode('y', 'value')
          .style('stroke', '#697474')
          .tooltip(false);
        
        chart
          .interval()
          .encode('x', 'x')
          .encode('y', ['start', 'end'])
          .encode('color', (d, idx) =>
            idx === 0 || d.isTotal ? 'D' : d.value > 0 ? 'P' : 'N',
          )
          .scale('color', {
            domain: ['P', 'N', 'D'],
            range: ['#64b5f6', '#ef6c00', '#96a6a6'],
          })
          .encode('size', 24)
          .style('stroke', '#697474')
          .label({
            text: 'value',
            formatter: '~s',
            position: (d) => (d.value > 0 ? 'top' : 'bottom'),
            textBaseline: (d) => (d.value > 0 ? 'bottom' : 'top'),
            fontSize: 10,
            dy: (d) => (d.value > 0 ? -4 : 4),
          })
          .tooltip({ channel: 'y', valueFormatter: '~s' })
          .tooltip({ channel: 'y1', valueFormatter: '~s' });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/connector/demo/revenue-flow-waterfall.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/connector/demo/revenue-flow-waterfall.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/connector/demo/revenue-flow-waterfall.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Revenue Flow Waterfall Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/connector/demo/revenue-flow-waterfall.ts
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
