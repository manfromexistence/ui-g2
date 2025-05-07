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

// Original G2 example path: integration/G2/site/examples/general/rose/demo/polar-stack.ts



export default function G2ChartComponent_general_rose_polar_stack() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          width: 720,
          height: 720,
        });
        
        
        g2ChartInstance.current.coordinate({ type: 'polar', innerRadius: 0.1 });
        
        chart
          .interval()
          .data({
            value: data,
            transform: [
              {
                type: 'fold',
                fields: ['类型 A', '类型 B', '类型 C'],
                key: '难民类型',
                value: 'count',
              },
            ],
          })
        
          .encode('x', 'year')
          .encode('y', 'count')
          .encode('color', '难民类型')
          .scale('x', { padding: 0 })
          .style({
            lineWidth: 1,
            stroke: '#fff',
          })
          .transform([{ type: 'stackY' }])
          .axis('x', {
            line: true,
            grid: true,
            gridLineDash: [0, 0],
            gridLineWidth: 1,
          })
          .axis('y', {
            title: false,
            line: true,
            gridLineWidth: 1,
          })
          .legend({
            color: {
              position: 'bottom',
              layout: {
                justifyContent: 'center',
              },
            },
          })
          .state('active', { stroke: 'black', lineWidth: 1, zIndex: 101 })
          .state('inactive', { opacity: 0.5, zIndex: 100 });
        
        g2ChartInstance.current.interaction('tooltip', {
          body: false,
          crosshairsStroke: 'red',
          crosshairsStrokeWidth: 4,
        });
        
        g2ChartInstance.current.interaction('elementHighlight', true);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/rose/demo/polar-stack.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/rose/demo/polar-stack.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/rose/demo/polar-stack.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>stacked column chart in polar coordinate</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/rose/demo/polar-stack.ts
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
