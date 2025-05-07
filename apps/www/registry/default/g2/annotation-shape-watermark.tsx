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

// Original G2 example path: integration/G2/site/examples/annotation/shape/demo/watermark.ts



export default function G2ChartComponent_annotation_shape_watermark() {
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
          .interval()
          .data([
            { month: 'Jan.', profit: 387264, start: 0, end: 387264 },
            { month: 'Feb.', profit: 772096, start: 387264, end: 1159360 },
            { month: 'Mar.', profit: 638075, start: 1159360, end: 1797435 },
            { month: 'Apr.', profit: -211386, start: 1797435, end: 1586049 },
            { month: 'May', profit: -138135, start: 1586049, end: 1447914 },
            { month: 'Jun', profit: -267238, start: 1447914, end: 1180676 },
            { month: 'Jul.', profit: 431406, start: 1180676, end: 1612082 },
            { month: 'Aug.', profit: 363018, start: 1612082, end: 1975100 },
            { month: 'Sep.', profit: -224638, start: 1975100, end: 1750462 },
            { month: 'Oct.', profit: -299867, start: 1750462, end: 1450595 },
            { month: 'Nov.', profit: 607365, start: 1450595, end: 2057960 },
            { month: 'Dec.', profit: 1106986, start: 2057960, end: 3164946 },
            { month: 'Total', start: 0, end: 3164946 },
          ])
          .encode('x', 'month')
          .encode('y', ['end', 'start'])
          .encode('color', (d) =>
            d.month === 'Total' ? 'Total' : d.profit > 0 ? 'Increase' : 'Decrease',
          )
          .axis('y', { labelFormatter: '~s' })
          .tooltip({ channel: 'y', valueFormatter: '~s' })
          .tooltip({ channel: 'y1', valueFormatter: '~s' });
        
        g2ChartInstance.current.shape().style('x', '80%').style('y', '70%').style('render', watermark);
        
        g2ChartInstance.current.render();
        
        function watermark({ x, y }, context) {
          const { document } = context;
        
          const g = document.createElement('g', {});
          const c1 = document.createElement('circle', {
            style: {
              cx: x,
              cy: y,
              lineWidth: 4,
              r: 65,
              stroke: 'red',
              opacity: 0.3,
            },
          });
          const c2 = document.createElement('circle', {
            style: {
              cx: x,
              cy: y,
              lineWidth: 2,
              r: 50,
              stroke: 'red',
              opacity: 0.3,
            },
          });
        
          const text = document.createElement('text', {
            style: {
              x,
              y,
              text: '数据保密',
              transformOrigin: 'center',
              transform: 'rotate(30)',
              fontSize: 20,
              fill: 'red',
              textAlign: 'center',
              textBaseline: 'middle',
              fillOpacity: 0.3,
            },
          });
        
          g.appendChild(c1);
          g.appendChild(c2);
          g.appendChild(text);
          return g;
        }
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/shape/demo/watermark.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/shape/demo/watermark.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/shape/demo/watermark.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Watermark</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/shape/demo/watermark.ts
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
