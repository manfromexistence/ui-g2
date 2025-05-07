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

// Original G2 example path: integration/G2/site/examples/general/pie/demo/pie-base-facet.ts



export default function G2ChartComponent_general_pie_pie_base_facet() {
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
        
        
        const facetRect = chart
          .facetRect()
          .data(data)
          .encode('x', 'type')
          .axis(false)
          .legend(false)
          .view()
          .attr('frame', false)
          .coordinate({ type: 'theta', innerRadius: 0.5, outerRadius: 0.8 });
        
        facetRect
          .interval()
          .encode('y', 100)
          .scale('y', { zero: true })
          .style('fill', '#e8e8e8')
          .tooltip(false)
          .animate(false);
        
        facetRect
          .interval()
          .encode('y', 'percent')
          .encode('color', 'color')
          .scale('color', { type: 'identity' })
          .tooltip((data) => ({
            name: data.type,
            value: data.percent,
          }))
          .animate('enter', { type: 'waveIn', duration: 1000 });
        
        facetRect
          .text()
          .encode('text', 'type')
          .style('textAlign', 'center')
          .style('textBaseline', 'middle')
          .style('fontSize', 20)
          .style('color', '#8c8c8c')
          .style('x', '50%')
          .style('y', '50%')
          .style('dy', -20);
        
        facetRect
          .text()
          .encode('text', 'percent')
          .style('textAlign', 'center')
          .style('textBaseline', 'middle')
          .style('fontSize', 30)
          .style('fontWeight', 500)
          .style('color', '#000')
          .style('x', '50%')
          .style('y', '50%')
          .style('dy', 20);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/pie/demo/pie-base-facet.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/pie/demo/pie-base-facet.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/pie/demo/pie-base-facet.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gender distribution of short video users</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/pie/demo/pie-base-facet.ts
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
