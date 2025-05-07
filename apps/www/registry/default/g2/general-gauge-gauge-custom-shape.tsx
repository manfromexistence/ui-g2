// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';
import { Path } from '@antv/g';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/general/gauge/demo/gauge-custom-shape.ts



export default function G2ChartComponent_general_gauge_gauge_custom_shape() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({ container: chartRef.current });
        
        
        function getOrigin(points) {
          if (points.length === 1) return points[0];
          const [[x0, y0, z0 = 0], [x2, y2, z2 = 0]] = points;
          return [(x0 + x2) / 2, (y0 + y2) / 2, (z0 + z2) / 2];
        }
        // 自定义指针形状
        const customShape = (style) => {
          return (points, value, coordinate, theme) => {
            // 获取几何点中心坐标
            const [x, y] = getOrigin(points);
            const [cx, cy] = coordinate.getCenter();
            // 计算指针方向角度
            const angle = Math.atan2(y - cy, x - cx);
            const length = 100; // 指针长度
            const width = 8; // 指针底部宽度
            // 构造指针三角形路径
            return new Path({
              style: {
                d: [
                  ['M', cx + Math.cos(angle) * length, cy + Math.sin(angle) * length], // 顶点
                  [
                    'L',
                    cx + Math.cos(angle + Math.PI / 2) * width,
                    cy + Math.sin(angle + Math.PI / 2) * width,
                  ], // 底部左点
                  [
                    'L',
                    cx + Math.cos(angle - Math.PI / 2) * width,
                    cy + Math.sin(angle - Math.PI / 2) * width,
                  ], // 底部右点
                  ['Z'], // 闭合路径
                ],
                fill: '#30BF78', // 填充色
              },
            });
          };
        };
        
        g2ChartInstance.current.options({
          type: 'gauge',
          data: {
            value: {
              target: 159,
              total: 424,
              name: 'score',
            },
          },
          style: {
            pointerShape: customShape,
            pinShape: false,
            textContent: (target, total) => {
              return `得分：${target}\n占比：${(target / total) * 100}%`;
            },
          },
        });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/gauge/demo/gauge-custom-shape.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/gauge/demo/gauge-custom-shape.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/gauge/demo/gauge-custom-shape.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Custom Shape Gauge Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/gauge/demo/gauge-custom-shape.ts
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
