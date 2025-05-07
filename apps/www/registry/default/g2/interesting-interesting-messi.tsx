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

// Original G2 example path: integration/G2/site/examples/interesting/interesting/demo/messi.ts

// Helper code extracted from original (review and adapt if necessary):
const FW = 600;


const FH = 400;


const P = 50;

export default function G2ChartComponent_interesting_interesting_messi() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          width: FW + P * 2,
          height: FH + P * 2,
          padding: P,
        });
        
        
        // Draw football field.
        chartRef.current.shape().style('x', '0%').style('y', '0%').style('render', football);
        
        // Analysis messi's shoot data.
        chart
          .rect()
          .data({
            type: 'fetch',
            value:
              'https://mdn.alipayobjects.com/afts/file/A*FCRjT4NGENEAAAAAAAAAAAAADrd2AQ/messi.json',
          })
          .transform({
            type: 'bin',
            opacity: 'count',
            thresholdsX: 15,
            thresholdsY: 15,
          })
          .encode('x', (d) => Number(d.X))
          .encode('y', (d) => Number(d.Y))
          .scale('x', { domain: [0, 1] })
          .scale('y', { domain: [0, 1] })
          .axis(false)
          .legend(false);
        
        chartRef.current.render();
        
        /**
         * Draw a football field.
         */
        function football(_, context) {
          const { document } = context;
        
          const g = document.createElement('g');
          const r = document.createElement('rect', {
            style: {
              x: 0,
              y: 0,
              width: FW,
              height: FH,
              fill: 'green',
              fillOpacity: 0.2,
              stroke: 'grey',
              lineWidth: 1,
            },
          });
        
          const r1 = document.createElement('rect', {
            style: {
              x: FW - FH * 0.6 * 0.45,
              y: (FH - FH * 0.6) / 2,
              width: FH * 0.6 * 0.45,
              height: FH * 0.6,
              strokeOpacity: 0.5,
              stroke: 'grey',
              lineWidth: 1,
            },
          });
        
          const r2 = document.createElement('rect', {
            style: {
              x: FW - FH * 0.3 * 0.45,
              y: (FH - FH * 0.3) / 2,
              width: FH * 0.3 * 0.45,
              height: FH * 0.3,
              strokeOpacity: 0.5,
              stroke: 'grey',
              lineWidth: 1,
            },
          });
        
          const l = document.createElement('line', {
            style: {
              x1: FW / 2,
              y1: 0,
              x2: FW / 2,
              y2: FH,
              strokeOpacity: 0.4,
              stroke: 'grey',
              lineWidth: 2,
            },
          });
        
          g.append(r);
          g.append(r1);
          g.append(r2);
          g.append(l);
        
          return g;
        }
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/interesting/interesting/demo/messi.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/interesting/interesting/demo/messi.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/interesting/interesting/demo/messi.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Messi's shoot</CardTitle>
        <CardDescription>
          G2 Chart. Original example: interesting/interesting/demo/messi.ts
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
