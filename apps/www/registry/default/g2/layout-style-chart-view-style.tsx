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

// Original G2 example path: integration/G2/site/examples/layout/style/demo/chart-view-style.ts



export default function G2ChartComponent_layout_style_chart_view_style() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({ container: chartRef.current });
        
        
        g2ChartInstance.current.options({
          viewStyle: {
            // 配置图表的视图区域的样式
            viewFill: '#DCEEFE',
            viewRadius: 20,
        
            // 配置图表的绘制区域的样式
            plotFill: '#fff',
            plotFillOpacity: 0.45,
            plotStroke: 'yellow',
            plotLineWidth: 4,
        
            // 配置图表的主区域的样式
            mainFill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            mainFillOpacity: 0.75,
        
            // 配置图表的内容区域的样式
            contentFill: 'l(90) 0:#ffadad 0.5:#ffd6a5 1:#fdffb6',
            contentShadowColor: '#5d5d5d',
            contentShadowBlur: 40,
            contentShadowOffsetX: 5,
            contentShadowOffsetY: 5,
          },
          type: 'area',
          data: {
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/aapl.json',
          },
          encode: {
            x: (d) => new Date(d.date),
            y: 'close',
          },
          axis: false,
          style: {
            fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            fillOpacity: 0.9,
          },
          height: 350,
          width: 700,
          margin: 30,
          padding: 20,
          inset: 15,
          legend: false,
        });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/layout/style/demo/chart-view-style.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/layout/style/demo/chart-view-style.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/layout/style/demo/chart-view-style.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>chart View Style</CardTitle>
        <CardDescription>
          G2 Chart. Original example: layout/style/demo/chart-view-style.ts
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
