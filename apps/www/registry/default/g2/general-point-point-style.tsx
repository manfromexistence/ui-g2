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

// Original G2 example path: integration/G2/site/examples/general/point/demo/point-style.ts



export default function G2ChartComponent_general_point_point_style() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({ container: chartRef.current });
        
        
        chart.options({
          type: 'point',
          style: {
            fill: 'skyblue', // 图形填充颜色，支持颜色字符串，优先级高于color通道
            fillOpacity: 0.9, // 填充颜色透明度，范围 0-1
            stroke: '#FADC7C', // 图形描边颜色
            lineWidth: 3, // 描边宽度（像素）
            lineDash: [1, 2], // 虚线配置[实线长度, 间隔长度]，[0,0]表示无描边
            strokeOpacity: 0.95, // 描边透明度，范围 0-1
            opacity: 0.9, // 整体透明度，影响填充和描边
            shadowColor: 'black', // 阴影颜色
            shadowBlur: 10, // 阴影模糊程度（像素）
            shadowOffsetX: 5, // 阴影水平偏移量（像素）
            shadowOffsetY: 5, // 阴影垂直偏移量（像素）
            cursor: 'pointer', // 鼠标悬停样式（同CSS cursor属性）
          },
          height: 350,
          data: [{ x: 0.5, y: 0.5 }],
          encode: {
            x: 'x',
            y: 'y',
            size: 10,
            shape: 'point',
          },
          scale: {
            x: { domain: [0, 1], nice: true },
            y: { domain: [0, 1], nice: true },
          },
        });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/point/demo/point-style.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/point/demo/point-style.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/point/demo/point-style.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Point Style</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/point/demo/point-style.ts
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
