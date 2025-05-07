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

// Original G2 example path: integration/G2/site/examples/general/radial/demo/bar-cornered-radial.ts



export default function G2ChartComponent_general_radial_bar_cornered_radial() {
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
        
        
        g2ChartInstance.current.coordinate({ type: 'radial', endAngle: Math.PI });
        
        chart
          .interval()
          .data({
            // Data is collected by the end of 2022.11.09
            value: [
              { name: 'G', star: 814 },
              { name: 'G2', star: 11425 },
              { name: 'G2Plot', star: 2320 },
              { name: 'S2', star: 968 },
              { name: 'F2', star: 7346 },
              { name: 'L7', star: 2888 },
              { name: 'G6', star: 9314 },
              { name: 'X6', star: 3985 },
              { name: 'AVA', star: 1151 },
            ],
            transform: [{ type: 'sortBy', fields: [['star', true]] }],
          })
          .encode('x', 'name')
          .encode('y', 'star')
          .scale('y', { type: 'sqrt' })
          .encode('color', 'name')
          .encode('size', 40)
          .style('radius', 20)
          .label({
            text: 'star',
            position: 'outside',
            autoRotate: true,
            rotateToAlignArc: true,
            dx: 4,
          })
          .axis('x', { title: false })
          .axis('y', false)
          .animate('enter', { type: 'waveIn', duration: 1000 });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/radial/demo/bar-cornered-radial.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radial/demo/bar-cornered-radial.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/radial/demo/bar-cornered-radial.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cornered Radial Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radial/demo/bar-cornered-radial.ts
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
