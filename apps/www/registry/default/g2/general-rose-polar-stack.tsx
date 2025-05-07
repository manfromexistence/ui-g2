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

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { year: '2000', '类型 A': 21.0, '类型 B': 16, '类型 C': 8 },
  { year: '2001', '类型 A': 25.0, '类型 B': 16, '类型 C': 8 },
  { year: '2002', '类型 A': 25.0, '类型 B': 15, '类型 C': 8 },
  { year: '2003', '类型 A': 25.0, '类型 B': 14, '类型 C': 7 },
  { year: '2004', '类型 A': 25.0, '类型 B': 14, '类型 C': 7 },
  { year: '2005', '类型 A': 24.0, '类型 B': 13, '类型 C': 8 },
  { year: '2006', '类型 A': 24.0, '类型 B': 14, '类型 C': 7 },
  { year: '2007', '类型 A': 26.0, '类型 B': 16, '类型 C': 7 },
  { year: '2008', '类型 A': 26.0, '类型 B': 15.2, '类型 C': 8 },
  { year: '2009', '类型 A': 27.1, '类型 B': 15.2, '类型 C': 10 },
  { year: '2010', '类型 A': 27.5, '类型 B': 15.4, '类型 C': 8 },
  { year: '2011', '类型 A': 26.4, '类型 B': 15.2, '类型 C': 9 },
  { year: '2012', '类型 A': 28.8, '类型 B': 15.4, '类型 C': 9 },
  { year: '2013', '类型 A': 33.3, '类型 B': 16.7, '类型 C': 12 },
  { year: '2014', '类型 A': 38.2, '类型 B': 19.5, '类型 C': 18 },
];

export default function G2ChartComponent_general_rose_polar_stack() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          width: 720,
          height: 720,
        });
        
        
        chartRef.current.coordinate({ type: 'polar', innerRadius: 0.1 });
        
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
        
        chartRef.current.interaction('tooltip', {
          body: false,
          crosshairsStroke: 'red',
          crosshairsStrokeWidth: 4,
        });
        
        chartRef.current.interaction('elementHighlight', true);
        
        chartRef.current.render();
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
