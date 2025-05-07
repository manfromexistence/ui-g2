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

// Original G2 example path: integration/G2/site/examples/general/heatmap/demo/heatmap-density.ts



export default function G2ChartComponent_general_heatmap_heatmap_density() {
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
        
        
        chart.data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/diamond.json',
        });
        
        chart.scale('x', { nice: true, domainMin: -0.5 });
        chart.scale('y', { nice: true, domainMin: -2000 });
        chart.scale('color', { nice: true });
        
        chartRef.current
          .heatmap()
          .data({
            transform: [
              {
                type: 'custom',
                callback: (data) => {
                  const dv = new DataSet.View().source(data);
                  dv.transform({
                    type: 'kernel-smooth.density',
                    fields: ['carat', 'price'],
                    as: ['carat', 'price', 'density'],
                  });
                  return dv.rows;
                },
              },
            ],
          })
          .encode('x', 'carat')
          .encode('y', 'price')
          .encode('color', 'density')
          .style({
            opacity: 0.3,
            gradient: [
              [0, 'white'],
              [0.2, 'blue'],
              [0.4, 'cyan'],
              [0.6, 'lime'],
              [0.8, 'yellow'],
              [0.9, 'red'],
            ],
          });
        
        chart.point().encode('x', 'carat').encode('y', 'price');
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/heatmap/demo/heatmap-density.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/heatmap/demo/heatmap-density.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/heatmap/demo/heatmap-density.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Heatmap Density</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/heatmap/demo/heatmap-density.ts
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
