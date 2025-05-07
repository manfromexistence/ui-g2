// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart , register } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/component/axis/demo/axis-polar.ts



export default function G2ChartComponent_component_axis_axis_polar() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current
          .coordinate({ type: 'polar' })
          .scale('x', {
            type: 'linear',
            domain: [5, 10],
            range: [0, 1],
          })
          .scale('y', {
            type: 'linear',
            domain: [5, 10],
            range: [1, 0],
          });
        
        g2ChartInstance.current
          .axisX()
          .attr('title', 'AxisX')
          .attr('tickFilter', (_, i, ticks) => i && i !== ticks.length - 1);
        
        g2ChartInstance.current
          .axisY()
          .attr('title', 'AxisY')
          .style('labelFontSize', 14)
          .style('gridLineWidth', 10)
          .style('gridStroke', 'red');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/axis/demo/axis-polar.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/axis/demo/axis-polar.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/axis/demo/axis-polar.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Axis Polar</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/axis/demo/axis-polar.ts
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
