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

// Original G2 example path: integration/G2/site/examples/general/gauge/demo/gauge-round.ts



export default function G2ChartComponent_general_gauge_gauge_round() {
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
        
        
        chartRef.current
          .gauge()
          .data({
            value: {
              target: 159,
              total: 400,
              name: 'score',
              thresholds: [100, 200, 400],
            },
          })
          .scale('color', {
            range: ['#F4664A', '#FAAD14', 'green'],
          })
          .style({
            arcShape: 'round',
            arcLineWidth: 2,
            arcStroke: '#fff',
          })
          .style(
            'textContent',
            (target, total) => `得分：${target}\n占比：${(target / total) * 100}%`,
          )
          .legend(false);
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/gauge/demo/gauge-round.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/gauge/demo/gauge-round.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/gauge/demo/gauge-round.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Round Shape Gauge Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/gauge/demo/gauge-round.ts
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
