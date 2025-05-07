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

// Original G2 example path: integration/G2/site/examples/composition/facet/demo/rect-frame.ts



export default function G2ChartComponent_composition_facet_rect_frame() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          width: 928,
          height: 320,
          paddingLeft: 60,
          paddingBottom: 60,
        });
        
        
        const facetRect = chart
          .facetRect()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/anscombe.json',
          })
          .encode('x', 'series');
        
        facetRect
          .point()
          .attr('inset', 10)
          .encode('x', 'x')
          .encode('y', 'y')
          .style('stroke', '#000')
          .attr('frame', false) // Hide the default frame.
          .viewStyle('plotStroke', 'red') // Customize the plot area to mock a frame.
          .viewStyle('plotLineWidth', 2)
          .viewStyle('plotOpacity', 0.5);
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/composition/facet/demo/rect-frame.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/composition/facet/demo/rect-frame.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/composition/facet/demo/rect-frame.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Custom Frame Style</CardTitle>
        <CardDescription>
          G2 Chart. Original example: composition/facet/demo/rect-frame.ts
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
