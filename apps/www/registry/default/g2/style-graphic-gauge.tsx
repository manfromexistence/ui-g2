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

// Original G2 example path: integration/G2/site/examples/style/graphic/demo/gauge.ts



export default function G2ChartComponent_style_graphic_gauge() {
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
        
        
        g2ChartInstance.current.options({
          type: 'gauge',
          data: {
            value: { target: 159, total: 400, name: 'score', thresholds: [200, 400] },
          },
          scale: {
            color: { range: ['l(0):0:#37b38e 1:#D9C652', 'l(0):0:#D9C652 1:#f96e3e'] },
          },
          style: {
            textContent: (target, total) => `得分：${target}
        占比：${(target / total) * 100}%`,
          },
          legend: false,
        });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/graphic/demo/gauge.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/graphic/demo/gauge.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/graphic/demo/gauge.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configure Linear-gradient Gauge  </CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/graphic/demo/gauge.ts
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
