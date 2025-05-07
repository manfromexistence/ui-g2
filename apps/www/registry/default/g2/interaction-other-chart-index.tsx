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

// Original G2 example path: integration/G2/site/examples/interaction/other/demo/chart-index.ts



export default function G2ChartComponent_interaction_other_chart_index() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
        });
        
        
        chartRef.current
          .line()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/indices.json',
          })
          .encode('x', (d) => new Date(d.Date))
          .encode('y', 'Close')
          .encode('color', 'Symbol')
          .encode('key', 'Symbol')
          .encode('title', (d) => d.Date.toLocaleString())
          .axis('y', { title: '↑ Change in price (%)', labelAutoRotate: false })
          .scale('y', { type: 'log' })
          .label({
            text: 'Symbol',
            selector: 'last',
            fontSize: 10,
          });
        
        chartRef.current
          .interaction('chartIndex', {
            ruleStroke: '#aaa',
            labelDx: 5,
            labelTextAlign: 'center',
            labelStroke: '#fff',
            labelLineWidth: 5,
            labelFormatter: (d) => `${d.toLocaleDateString()}`,
          })
          .interaction('tooltip', false);
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/interaction/other/demo/chart-index.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/interaction/other/demo/chart-index.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/interaction/other/demo/chart-index.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chart Index</CardTitle>
        <CardDescription>
          G2 Chart. Original example: interaction/other/demo/chart-index.ts
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
