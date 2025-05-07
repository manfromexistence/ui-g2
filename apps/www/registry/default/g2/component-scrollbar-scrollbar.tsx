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

// Original G2 example path: integration/G2/site/examples/component/scrollbar/demo/scrollbar.ts



export default function G2ChartComponent_component_scrollbar_scrollbar() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        g2ChartInstance.current
          .line()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
          })
          .encode('x', 'date')
          .encode('y', 'close')
          // 开启 X 轴方向上的滚动条
          .scrollbar('x', {})
          .scrollbar('y', { value: 0.2 });
        
        g2ChartInstance.current.on('afterrender', () => {
          const { canvas } = g2ChartInstance.current.getContext();
          const { document } = canvas;
          document
            .querySelector('.g2-scrollbar')
            .addEventListener('valuechange', (evt) => {
              console.info(evt.detail);
            });
        });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/scrollbar/demo/scrollbar.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/scrollbar/demo/scrollbar.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/scrollbar/demo/scrollbar.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Scrollbar</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/scrollbar/demo/scrollbar.ts
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
