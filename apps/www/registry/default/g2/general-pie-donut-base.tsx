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

// Original G2 example path: integration/G2/site/examples/general/pie/demo/donut-base.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { item: '事例一', count: 40, percent: 0.4 },
  { item: '事例二', count: 21, percent: 0.21 },
  { item: '事例三', count: 17, percent: 0.17 },
  { item: '事例四', count: 13, percent: 0.13 },
  { item: '事例五', count: 9, percent: 0.09 },
];

export default function G2ChartComponent_general_pie_donut_base() {
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
        
        
        g2ChartInstance.current.coordinate({ type: 'theta', outerRadius: 0.8, innerRadius: 0.5 });
        
        g2ChartInstance.current
          .interval()
          .data(data)
          .transform({ type: 'stackY' })
          .encode('y', 'percent')
          .encode('color', 'item')
          .legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
          .label({
            position: 'outside',
            text: (data) => `${data.item}: ${data.percent * 100}%`,
          })
          .tooltip((data) => ({
            name: data.item,
            value: `${data.percent * 100}%`,
          }));
        
        g2ChartInstance.current
          .text()
          .style('text', '主机')
          // Relative position
          .style('x', '50%')
          .style('y', '50%')
          .style('dy', -25)
          .style('fontSize', 34)
          .style('fill', '#8c8c8c')
          .style('textAlign', 'center');
        
        g2ChartInstance.current
          .text()
          .style('text', '200')
          // Relative position
          .style('x', '50%')
          .style('y', '50%')
          .style('dx', -25)
          .style('dy', 25)
          .style('fontSize', 44)
          .style('fill', '#8c8c8c')
          .style('textAlign', 'center');
        
        g2ChartInstance.current
          .text()
          .style('text', '台')
          // Relative position
          .style('x', '50%')
          .style('y', '50%')
          .style('dx', 35)
          .style('dy', 25)
          .style('fontSize', 34)
          .style('fill', '#8c8c8c')
          .style('textAlign', 'center');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/pie/demo/donut-base.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/pie/demo/donut-base.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/pie/demo/donut-base.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Simple donut chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/pie/demo/donut-base.ts
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
