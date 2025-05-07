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

// Original G2 example path: integration/G2/site/examples/general/interval/demo/interval-style.ts



export default function G2ChartComponent_general_interval_interval_style() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({ container: chartRef.current, height: 350 });
        
        
        chart.options({
          type: 'interval',
          data: [
            { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
            { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
            { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
            { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
            { name: 'London', 月份: 'May', 月均降雨量: 47 },
            { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
            { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
            { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
            { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
            { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
            { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
            { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
            { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
            { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
            { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
            { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
          ],
          encode: { x: '月份', y: '月均降雨量', color: 'name' },
          transform: [{ type: 'stackY' }],
          style: {
            minHeight: 20,
            columnWidthRatio: 0.5,
            radiusTopLeft: 20,
            radiusTopRight: 20,
            insetBottom: 5,
            // 绘图属性
            fill: (d) => (d.name === 'London' ? '#688FD4' : '#55BECC'), // 绘图属性也可以是一个回调函数
            fillOpacity: 0.9,
            stroke: '#fff',
            lineWidth: 1,
            lineDash: [4, 5],
            strokeOpacity: 0.5,
            opacity: 1,
            shadowColor: '#BABBBD',
            shadowBlur: 10,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            cursor: 'pointer',
          },
        });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/interval/demo/interval-style.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/interval/demo/interval-style.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/interval/demo/interval-style.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interval Style</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/interval/demo/interval-style.ts
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
