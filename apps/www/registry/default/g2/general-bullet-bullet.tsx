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

// Original G2 example path: integration/G2/site/examples/general/bullet/demo/bullet.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  {
    title: '满意度',
    ranges: 100,
    measures: 80,
    target: 85,
  },
];



export default function G2ChartComponent_general_bullet_bullet() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        const data = [
          {
            title: '满意度',
            ranges: 100,
            measures: 80,
            target: 85,
          },
        ];
        
        g2ChartInstance.current.coordinate({ transform: [{ type: 'transpose' }] });
        
        g2ChartInstance.current.data(data);
        
        chart
          .interval()
          .encode('x', 'title')
          .encode('y', 'ranges')
          .encode('color', '#f0efff')
          .style('maxWidth', 30)
          .axis({
            y: {
              grid: true,
              gridLineWidth: 2,
            },
            x: {
              title: false,
            },
          });
        
        chart
          .interval()
          .encode('x', 'title')
          .encode('y', 'measures')
          .encode('color', '#5B8FF9')
          .style('maxWidth', 20)
          .label({
            text: 'measures',
            position: 'right',
            textAlign: 'left',
            dx: 5,
          });
        
        chart
          .point()
          .encode('x', 'title')
          .encode('y', 'target')
          .encode('shape', 'line')
          .encode('color', '#3D76DD')
          .encode('size', 8)
          .tooltip({
            title: false,
            items: [{ channel: 'y' }],
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/bullet/demo/bullet.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/bullet/demo/bullet.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/bullet/demo/bullet.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bullet</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/bullet/demo/bullet.ts
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
