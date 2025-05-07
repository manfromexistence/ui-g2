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

// Original G2 example path: integration/G2/site/examples/general/pie/demo/pie-donut-text.ts



export default function G2ChartComponent_general_pie_pie_donut_text() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 640,
          padding: 0,
          inset: 50,
        });
        
        
        chart.coordinate({ type: 'theta', innerRadius: 0.6 });
        
        g2ChartInstance.current
          .interval()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
          })
          .transform({ type: 'stackY' })
          .encode('y', 'value')
          .encode('color', 'name')
          .scale('color', {
            palette: 'spectral',
            offset: (t) => t * 0.8 + 0.1,
          })
          .legend(false);
        
        g2ChartInstance.current
          .text()
          .style('text', 'Donut')
          // Relative position
          .style('x', '50%')
          .style('y', '50%')
          .style('fontSize', 40)
          .style('fontWeight', 'bold')
          .style('textAlign', 'center');
        
        g2ChartInstance.current
          .text()
          .style('text', 'g2ChartInstance.current')
          // Absolute position
          .style('x', 640 / 2 - 16)
          .style('y', 360)
          .style('fontSize', 20)
          .style('fontWeight', 'bold')
          .style('textAlign', 'center');
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/pie/demo/pie-donut-text.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/pie/demo/pie-donut-text.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/pie/demo/pie-donut-text.ts:", e);
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
          G2 Chart. Original example: general/pie/demo/pie-donut-text.ts
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
