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

// Original G2 example path: integration/G2/site/examples/general/pie/demo/pie.ts



export default function G2ChartComponent_general_pie_pie() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 640,
        });
        
        
        chart.coordinate({ type: 'theta' });
        
        g2ChartInstance.current
          .interval()
          .transform({ type: 'stackY' })
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
          })
          .encode('y', 'value')
          .encode('color', 'name')
          .style('stroke', 'white')
          .scale('color', {
            palette: 'spectral',
            offset: (t) => t * 0.8 + 0.1,
          })
          .label({
            text: 'name',
            radius: 0.8,
            fontSize: 10,
            fontWeight: 'bold',
          })
          .label({
            text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
            radius: 0.8,
            fontSize: 9,
            dy: 12,
          })
          .animate('enter', { type: 'waveIn' })
          .legend(false);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/pie/demo/pie.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/pie/demo/pie.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/pie/demo/pie.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/pie/demo/pie.ts
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
