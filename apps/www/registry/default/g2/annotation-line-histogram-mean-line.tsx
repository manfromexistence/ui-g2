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

// Original G2 example path: integration/G2/site/examples/annotation/line/demo/histogram-mean-line.ts



export default function G2ChartComponent_annotation_line_histogram_mean_line() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        chartRef.current.data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/movies.json',
          transform: [
            {
              type: 'filter',
              callback: (d) => d['IMDB Rating'] > 0,
            },
          ],
        });
        
        chart
          .rect()
          .transform({ type: 'binX', y: 'count', thresholds: 9 })
          .encode('x', 'IMDB Rating')
          .scale('y', { domainMax: 1000 })
          .style('inset', 1);
        
        chart
          .lineX()
          .transform({ type: 'groupColor', x: 'mean' }) // groupColor 为分组并对指定的通道进行聚合，可以理解为把数据通过 x 通道的数据 取平均值(mean) 变更为一条数据。
          .encode('x', 'IMDB Rating')
          .style('stroke', '#F4664A')
          .style('strokeOpacity', 1)
          .style('lineWidth', 2)
          .style('lineDash', [4, 4]);
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/line/demo/histogram-mean-line.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/line/demo/histogram-mean-line.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/line/demo/histogram-mean-line.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Histogram, Annotation Mean Value with LineX</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/line/demo/histogram-mean-line.ts
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
