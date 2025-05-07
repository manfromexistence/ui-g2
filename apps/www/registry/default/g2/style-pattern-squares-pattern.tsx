// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { squares } from '@antv/g-pattern';
import { Chart , register } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/style/pattern/demo/squares-pattern.ts



export default function G2ChartComponent_style_pattern_squares_pattern() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 500,
          height: 400,
        });
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });
        
        const colors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];
        
        g2ChartInstance.current
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
              image: squares({
                fill: colors[idx],
                size: 6,
                padding: 0,
              }),
              repetition: 'repeat',
              transform: 'rotate(30deg)',
            };
          })
          .legend(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/pattern/demo/squares-pattern.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/pattern/demo/squares-pattern.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/pattern/demo/squares-pattern.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Squares Pattern</CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/pattern/demo/squares-pattern.ts
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
