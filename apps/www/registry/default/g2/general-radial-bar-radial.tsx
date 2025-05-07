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

// Original G2 example path: integration/G2/site/examples/general/radial/demo/bar-radial.ts



export default function G2ChartComponent_general_radial_bar_radial() {
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
        
        
        chart.coordinate({ type: 'radial', innerRadius: 0.1, endAngle: Math.PI });
        
        g2ChartInstance.current
          .interval()
          .data([
            { question: '问题 1', percent: 0.21 },
            { question: '问题 2', percent: 0.4 },
            { question: '问题 3', percent: 0.49 },
            { question: '问题 4', percent: 0.52 },
            { question: '问题 5', percent: 0.53 },
            { question: '问题 6', percent: 0.84 },
            { question: '问题 7', percent: 1.0 },
            { question: '问题 8', percent: 1.2 },
          ])
          .encode('x', 'question')
          .encode('y', 'percent')
          .encode('color', 'percent')
          .style('stroke', 'white')
          .scale('color', {
            range: '#BAE7FF-#1890FF-#0050B3',
          })
          .axis('y', { tickFilter: (d, i) => i !== 0 })
          .legend({
            color: {
              length: 400,
              position: 'bottom',
              layout: { justifyContent: 'center' },
            },
          })
          .animate('enter', { type: 'waveIn', duration: 800 });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/radial/demo/bar-radial.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radial/demo/bar-radial.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/radial/demo/bar-radial.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Radial Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radial/demo/bar-radial.ts
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
