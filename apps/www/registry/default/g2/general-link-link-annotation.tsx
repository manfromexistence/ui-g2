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

// Original G2 example path: integration/G2/site/examples/general/link/demo/link-annotation.ts



export default function G2ChartComponent_general_link_link_annotation() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          paddingRight: 20,
        });
        
        
        chart
          .link()
          .data([1])
          .encode('x', [() => incdomain[0], () => incdomain[1]])
          .encode('y', [() => incdomain[0], () => incdomain[1]])
          .tooltip(false)
          .label({
            position: 'top-right',
            text: (v) => `${v * 100}%`,
            dx: 4,
            textAlign: 'start',
            textBaseline: 'middle',
          })
          .style('stroke', '#000');
        
        chart
          .link()
          .data([0.6, 0.7, 0.8, 0.9])
          .encode('x', [() => incdomain[0], () => incdomain[1]])
          .encode('y', [(v) => v * incdomain[0], (v) => v * incdomain[1]])
          .tooltip(false)
          .label({
            position: 'top-right',
            text: (v) => `${v * 100}%`,
            dx: 4,
            textAlign: 'start',
            textBaseline: 'middle',
          })
          .style('stroke', '#000')
          .style('opacity', 0.2);
        
        chart
          .point()
          .data(income)
          .encode('x', 'm')
          .encode('y', 'f')
          .encode('size', 4)
          .encode('shape', 'hollow')
          .style('stroke', '#000');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/link/demo/link-annotation.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/link/demo/link-annotation.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/link/demo/link-annotation.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Link Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/link/demo/link-annotation.ts
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
