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

// Original G2 example path: integration/G2/site/examples/expr/base/demo/expr.ts



export default function G2ChartComponent_expr_base_expr() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        const spec = {
          type: 'spaceLayer',
          height: 840,
          width: 640,
          data: {
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
            format: 'csv',
          },
          children: [
            {
              type: 'interval',
              height: 360,
              width: 360,
              legend: false,
              x: 280,
              transform: [{ type: 'stackY' }],
              coordinate: { type: 'theta' },
              scale: {
                color: { palette: 'spectral' },
              },
              encode: {
                y: 'value',
                color: 'name',
                enterDelay: '{a.value>10000000 ? a.value>20000000 ? 2000 : 1000 : 0}',
              },
              style: {
                stroke: '{ a.value>20000000 ? "purple" : null}',
              },
              labels: [
                {
                  text: '{"*" + a.name}',
                  radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
                  style: {
                    fontSize: '{a.value>15000000 ? a.value>20000000 ? 12 : 10 : 6}',
                    fontWeight: 'bold',
                  },
                  transform: [{ type: 'contrastReverse' }],
                },
                {
                  text: '{b < c.length - 3 ? a.value : ""}',
                  radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
                  style: { fontSize: 9, dy: 12 },
                  transform: [{ type: 'contrastReverse' }],
                },
              ],
              animate: { enter: { type: 'waveIn', duration: 600 } },
            },
            {
              type: 'view',
              height: 400,
              width: 540,
              y: 300,
              children: [
                {
                  type: 'interval',
                  height: 400,
                  width: 540,
                  legend: false,
                  y: 300,
                  scale: {
                    color: { palette: 'spectral' },
                  },
                  encode: {
                    y: 'value',
                    x: 'name',
                    color: 'name',
                    enterDelay:
                      '{a.value>10000000 ? a.value>20000000 ? 2000 : 1000 : 0}',
                  },
                },
                {
                  type: 'line',
                  height: 400,
                  width: 540,
                  legend: false,
                  y: 300,
                  encode: { x: 'name', y: 'value' },
                  scale: { y: { independent: true } },
                  labels: [
                    {
                      text: '{a.value}',
                      selector: '{a}',
                    },
                  ],
                  axis: {
                    y: {
                      position: 'right',
                      grid: null,
                    },
                  },
                },
              ],
            },
          ],
        };
        
        g2ChartInstance.current.options(spec);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/expr/base/demo/expr.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/expr/base/demo/expr.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/expr/base/demo/expr.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spec Function Expression</CardTitle>
        <CardDescription>
          G2 Chart. Original example: expr/base/demo/expr.ts
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
