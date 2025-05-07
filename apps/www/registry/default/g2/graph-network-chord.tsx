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

// Original G2 example path: integration/G2/site/examples/graph/network/demo/chord.ts



export default function G2ChartComponent_graph_network_chord() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 900,
          height: 600,
        });
        
        
        const data = [
          {
            source: '北京',
            target: '天津',
            value: 30,
          },
          {
            source: '北京',
            target: '上海',
            value: 80,
          },
          {
            source: '北京',
            target: '河北',
            value: 46,
          },
          {
            source: '北京',
            target: '辽宁',
            value: 49,
          },
          {
            source: '北京',
            target: '黑龙江',
            value: 69,
          },
          {
            source: '北京',
            target: '吉林',
            value: 19,
          },
          {
            source: '天津',
            target: '河北',
            value: 62,
          },
          {
            source: '天津',
            target: '辽宁',
            value: 82,
          },
          {
            source: '天津',
            target: '上海',
            value: 16,
          },
          {
            source: '上海',
            target: '黑龙江',
            value: 16,
          },
          {
            source: '河北',
            target: '黑龙江',
            value: 76,
          },
          {
            source: '河北',
            target: '内蒙古',
            value: 24,
          },
          {
            source: '内蒙古',
            target: '北京',
            value: 32,
          },
        ];
        
        g2ChartInstance.current
          .chord()
          .data({
            value: { links: data },
          })
          .layout({
            nodeWidthRatio: 0.05,
          })
          .scale('color', { range: schemeTableau10 })
          .style('labelFontSize', 15)
          .style('linkFillOpacity', 0.6);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/graph/network/demo/chord.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/graph/network/demo/chord.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/graph/network/demo/chord.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chord</CardTitle>
        <CardDescription>
          G2 Chart. Original example: graph/network/demo/chord.ts
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
