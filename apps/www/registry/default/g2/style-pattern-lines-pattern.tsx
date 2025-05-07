// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';
import { lines } from '@antv/g-pattern';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/style/pattern/demo/lines-pattern.ts



export default function G2ChartComponent_style_pattern_lines_pattern() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          width: 500,
          height: 400,
        });
        
        
        chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });
        
        const colors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];
        
        chartRef.current
          .interval()
          .data([
            { id: 'c', value: 526 },
            { id: 'sass', value: 220 },
            { id: 'php', value: 325 },
            { id: 'elixir', value: 561 },
            { id: 'rust', value: 54 },
          ])
          .transform({ type: 'stackY' })
          .encode('y', 'value')
          .label({
            text: 'id',
            position: 'outside',
            fontWeight: 'bold',
          })
          .style('radius', 6)
          .style('stroke', '#fff')
          .style('lineWidth', 4)
          .style('fill', (_, idx) => {
            return {
              image: lines({
                backgroundColor: colors[idx],
                backgroundOpacity: 0.65,
                stroke: colors[idx],
                lineWidth: 4,
                spacing: 5,
              }),
              repetition: 'repeat',
              transform: 'rotate(30deg)',
            };
          })
          .legend(false);
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/pattern/demo/lines-pattern.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/pattern/demo/lines-pattern.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/pattern/demo/lines-pattern.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lines Pattern</CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/pattern/demo/lines-pattern.ts
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
