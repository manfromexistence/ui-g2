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

// Original G2 example path: integration/G2/site/examples/general/polygon/demo/voronoi.ts

// Helper code extracted from original (review and adapt if necessary):
const layout = (data) => {
  return d3
    .voronoi()
    .x((d) => d.x)
    .y((d) => d.y)
    .extent([
      [0, 0],
      [800, 600],
    ])
    .polygons(data)
    .map((p) =>
      Object.assign({}, p, {
        x: p.map((pi) => pi[0]),
        y: p.map((pi) => pi[1]),
      }),
    );

export default function G2ChartComponent_general_polygon_voronoi() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        });
        
        
        chart
          .polygon()
          .data({
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/voronoi.json',
            transform: [
              {
                type: 'custom',
                callback: layout,
              },
            ],
          })
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('color', (d) => d.data.value)
          .scale('x', { domain: [0, 800] })
          .scale('y', { domain: [0, 600] })
          .axis(false)
          .style('stroke', '#fff')
          .style('fillOpacity', 0.65);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/polygon/demo/voronoi.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/polygon/demo/voronoi.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/polygon/demo/voronoi.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Voronoi</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/polygon/demo/voronoi.ts
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
