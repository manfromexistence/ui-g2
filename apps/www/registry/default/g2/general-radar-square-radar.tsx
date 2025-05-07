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

// Original G2 example path: integration/G2/site/examples/general/radar/demo/square-radar.ts



export default function G2ChartComponent_general_radar_square_radar() {
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
        
        
        chart.coordinate({
          type: 'polar',
          startAngle: (-Math.PI * 3) / 4,
          endAngle: (Math.PI * 5) / 4,
        });
        
        g2ChartInstance.current
          .line()
          .data([
            { item: 'Design', type: 'a', score: 70 },
            { item: 'Development', type: 'a', score: 60 },
            { item: 'Marketing', type: 'a', score: 50 },
            { item: 'Users', type: 'a', score: 40 },
          ])
          .encode('x', 'item')
          .encode('y', 'score')
          .scale('x', {
            padding: 0.5,
            align: 0,
          })
          .scale('y', {
            domainMin: 0,
            domainMax: 80,
          })
          .style({
            zIndex: 0,
            lineWidth: 5,
            lineJoin: 'round',
          })
          .axis('x', {
            grid: true,
            zIndex: 1,
            title: false,
            gridLineWidth: 1,
            gridLineDash: null,
          })
          .axis('y', {
            titleOpacity: '0',
            gridConnect: 'line',
            gridLineWidth: 1,
            gridLineDash: [0, 0],
            gridAreaFill: 'rgba(0, 0, 0, 0.04)',
          });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/radar/demo/square-radar.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radar/demo/square-radar.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/radar/demo/square-radar.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Square radar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radar/demo/square-radar.ts
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
