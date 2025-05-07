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

// Original G2 example path: integration/G2/site/examples/general/area/demo/area-difference.ts



export default function G2ChartComponent_general_area_area_difference() {
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
        
        
        chart.data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/temperature-compare.json',
        });
        
        g2ChartInstance.current
          .area()
          .data({
            transform: [
              {
                type: 'fold',
                fields: ['New York', 'San Francisco'],
                key: 'city',
                value: 'temperature',
              },
            ],
          })
          .transform([{ type: 'diffY' }]) // Diff the 2 area shape.
          .encode('x', (d) => new Date(d.date))
          .encode('y', 'temperature')
          .encode('color', 'city')
          .encode('shape', 'hvh');
        // .scale('color', { range: ['#67a9cf', '#ef8a62'] });
        
        g2ChartInstance.current
          .line()
          .encode('x', (d) => new Date(d.date))
          .encode('y', 'San Francisco')
          .encode('shape', 'hvh')
          .style('stroke', '#000')
          .tooltip(false);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/area/demo/area-difference.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/area/demo/area-difference.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/area/demo/area-difference.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Area Difference</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/area/demo/area-difference.ts
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
