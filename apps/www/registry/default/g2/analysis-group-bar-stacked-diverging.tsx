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

// Original G2 example path: integration/G2/site/examples/analysis/group/demo/bar-stacked-diverging.ts



export default function G2ChartComponent_analysis_group_bar_stacked_diverging() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        const types = [
          'Strongly disagree',
          'Disagree',
          'Neither agree nor disagree',
          'Agree',
          'Strongly agree',
        ];
        const colors = ['#c30d24', '#f3a583', '#cccccc', '#94c6da', '#1770ab'];
        
        g2ChartInstance.current.coordinate({ transform: [{ type: 'transpose' }] });
        
        chart
          .interval()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/82c97016-0f99-433b-ab21-9ecf14244610.csv',
          })
          .transform({ type: 'stackY' })
          .encode('x', 'question')
          .encode('color', 'type')
          .encode('y', (d) =>
            d.type === 'Disagree' || d.type === 'Strongly disagree'
              ? -d.percentage
              : d.type === 'Neither agree nor disagree'
              ? -d.percentage / 2
              : +d.percentage,
          )
          .scale('y', { nice: true })
          .scale('color', { domain: types, range: colors });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/analysis/group/demo/bar-stacked-diverging.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/analysis/group/demo/bar-stacked-diverging.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/analysis/group/demo/bar-stacked-diverging.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Diverging Stacked Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: analysis/group/demo/bar-stacked-diverging.ts
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
