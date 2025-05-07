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

// Original G2 example path: integration/G2/site/examples/component/legend/demo/position.ts



export default function G2ChartComponent_component_legend_position() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 350,
        });
        
        
        chart.options({
          type: 'interval',
          data: [
            { genre: 'Sports', sold: 50 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
          ],
          encode: { x: 'genre', y: 'sold', color: 'genre' },
          legend: {
            color: {
              // 图例显示位置 可选 top ｜ bottom | right | left
              position: 'top',
              layout: {
                // 主轴对齐方式 可选 flex-start | flex-end | center
                justifyContent: 'flex-start',
                // 交叉轴对齐方式 可选 flex-start | flex-end | center
                alignItems: 'flex-start',
                // 主轴方向 可选 row | column
                flexDirection: 'row',
              },
            },
          },
        });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/legend/demo/position.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/legend/demo/position.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/legend/demo/position.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Legend Position</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/legend/demo/position.ts
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
