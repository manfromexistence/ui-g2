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

// Original G2 example path: integration/G2/site/examples/general/area/demo/missing-data-area.ts



export default function G2ChartComponent_general_area_missing_data_area() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({ container: chartRef.current });
        
        
        chart.options({
          type: 'area',
          autoFit: true,
          data: {
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/aapl.json',
          },
          encode: {
            x: (d) => new Date(d.date),
            // Mock missing data. Set NaN from Jan. to Mar.
            y: (d) => (new Date(d.date).getUTCMonth() <= 3 ? NaN : d.close),
          },
          style: {
            connect: true,
            // 配置connector样式
            connectFill: 'grey',
            connectFillOpacity: 0.15,
            // 配置area样式
            fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
            opacity: 0.9,
            stroke: 'yellow',
          },
        });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/area/demo/missing-data-area.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/area/demo/missing-data-area.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/area/demo/missing-data-area.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Missing Data Area Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/area/demo/missing-data-area.ts
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
