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

// Original G2 example path: integration/G2/site/examples/general/polygon/demo/treemap.ts

// Helper code extracted from original (review and adapt if necessary):
const layout = (data) => {
  const root = d3.hierarchy(data);

const name = (d) => {
  const { name } = d.data;

export default function G2ChartComponent_general_polygon_treemap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          paddingLeft: 4,
          paddingBottom: 4,
          paddingRight: 4,
        });
        
        
        g2ChartInstance.current
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/5155ef81-db23-49f3-b72b-d436a219d289.json',
            transform: [{ type: 'custom', callback: layout }],
          })
          .legend(false);
        
        g2ChartInstance.current
          .polygon()
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('size', 'r')
          .encode('color', (d) => d.parent.data.name)
          .tooltip({
            title: '',
            items: [(d) => d.parent.data.name],
          })
          .scale('x', { domain: [0, 1] })
          .scale('y', { domain: [0, 1], range: [0, 1] })
          .scale('size', { type: 'identity' })
          .axis(false);
        
        g2ChartInstance.current
          .text()
          .data({
            transform: [
              {
                type: 'filter',
                callback: (d) => d.height === 0,
              },
            ],
          })
          .encode('x', (d) => d.x[0])
          .encode('y', (d) => d.y[0])
          .encode('text', name)
          .style('dy', 15)
          .style('dx', 5)
          .style('fill', 'black')
          .style('textAlign', 'start')
          .style('fontSize', 12);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/polygon/demo/treemap.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/polygon/demo/treemap.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/polygon/demo/treemap.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Treemap</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/polygon/demo/treemap.ts
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
