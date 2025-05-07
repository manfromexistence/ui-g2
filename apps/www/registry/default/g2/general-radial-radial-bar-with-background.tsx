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

// Original G2 example path: integration/G2/site/examples/general/radial/demo/radial-bar-with-background.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { type: '1-3秒', value: 0.16 },
  { type: '4-10秒', value: 0.125 },
  { type: '11-30秒', value: 0.2 },
  { type: '1-3分', value: 0.2 },
  { type: '3-10分', value: 0.05 },
  { type: '10-30分', value: 0.01 },
  { type: '30+分', value: 0.015 },
];

export default function G2ChartComponent_general_radial_radial_bar_with_background() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          theme: 'dark',
        });
        
        
        g2ChartInstance.current.data(data).coordinate({ type: 'radial', innerRadius: 0.35 });
        
        chart
          .interval()
          .encode('x', 'type')
          .encode('y', 0.2)
          .style('fill', '#202020')
          .state({
            active: { strokeWidth: 0 },
          })
          .tooltip(false);
        
        chart
          .interval()
          .encode('x', 'type')
          .encode('y', 'value')
          .encode('color', [
            (val) => (val.type === '10-30分' || val.type === '30+分' ? 'high' : 'low'),
          ])
          .scale('color', { range: ['#5B8FF9', '#ff4d4f'] })
          .style('radius', 20)
          .tooltip([
            (item) => ({
              name: item.type,
              value: item.value,
            }),
          ])
          .axis(false)
          .legend(false)
          .state({
            active: { stroke: '#fff', strokeWidth: 1 },
          })
          .interaction('elementHighlight');
        
        chart
          .image()
          .style('x', '50%')
          .style('y', '50%')
          .style('width', 100)
          .style('height', 80)
          .encode(
            'src',
            'https://gw.alipayobjects.com/mdn/rms_ef85c6/afts/img/A*0DYiQKP08cQAAAAAAAAAAAAAARQnAQ',
          )
          .tooltip(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/radial/demo/radial-bar-with-background.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radial/demo/radial-bar-with-background.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/radial/demo/radial-bar-with-background.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Radial bar chart with background</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radial/demo/radial-bar-with-background.ts
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
