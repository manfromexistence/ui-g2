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

// Original G2 example path: integration/G2/site/examples/general/pie/demo/spider-label-overlap.ts



export default function G2ChartComponent_general_pie_spider_label_overlap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        chart;
        
        chart
          .interval()
          .data([
            { type: '微博', value: 93.33 },
            { type: '其他', value: 6.67 },
            { type: '论坛', value: 4.77 },
            { type: '网站', value: 1.44 },
            { type: '微信', value: 1.12 },
            { type: '客户端', value: 1.05 },
            { type: '新闻', value: 0.81 },
            { type: '视频', value: 0.39 },
            { type: '博客', value: 0.37 },
            { type: '报刊', value: 0.17 },
          ])
          .encode('y', 'value')
          .encode('color', 'type')
          .transform({ type: 'stackY' })
          .coordinate({ type: 'theta' })
          .animate('enter', { type: 'waveIn' })
          .label({
            position: 'spider',
            text: (d) => `${d.type} (${d.value})`,
          })
          .legend(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/pie/demo/spider-label-overlap.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/pie/demo/spider-label-overlap.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/pie/demo/spider-label-overlap.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Adjust Spider Layout</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/pie/demo/spider-label-overlap.ts
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
