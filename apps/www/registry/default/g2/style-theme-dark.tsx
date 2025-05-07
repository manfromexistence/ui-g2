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

// Original G2 example path: integration/G2/site/examples/style/theme/demo/dark.ts



export default function G2ChartComponent_style_theme_dark() {
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
        
        
        g2ChartInstance.current
          .theme({
            type: 'classicDark',
            view: {
              viewFill: '#141414',
            },
          }) // Apply dark theme.
          .coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 });
        
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
          .encode('color', 'id')
          .label({
            text: 'value',
            offset: 14,
            fontWeight: 'bold',
          })
          .label({
            text: 'id',
            position: 'spider',
            connectorDistance: 0,
            fontWeight: 'bold',
            textBaseline: 'bottom',
            textAlign: (d) => (['c', 'sass'].includes(d.id) ? 'end' : 'start'),
            dy: -4,
          })
          .style('radius', 4)
          .style('inset', 1)
          .animate('enter', { type: 'waveIn', duration: 1000 })
          .legend(false);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/theme/demo/dark.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/theme/demo/dark.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/theme/demo/dark.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dark Theme</CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/theme/demo/dark.ts
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
