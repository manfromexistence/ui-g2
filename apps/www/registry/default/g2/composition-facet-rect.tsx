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

// Original G2 example path: integration/G2/site/examples/composition/facet/demo/rect.ts



export default function G2ChartComponent_composition_facet_rect() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          paddingBottom: 60,
          paddingLeft: 60,
          height: 640,
        });
        
        
        const facetRect = chart
          .facetRect()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/penguins.json',
            transform: [
              {
                type: 'map',
                callback: ({
                  culmen_depth_mm: depth,
                  culmen_length_mm: length,
                  ...d
                }) => ({
                  ...d,
                  culmen_depth_mm: depth === 'NaN' ? NaN : depth,
                  culmen_length_mm: length === 'NaN' ? NaN : length,
                }),
              },
            ],
          })
          .encode('x', 'sex')
          .encode('y', 'species');
        
        facetRect
          .point()
          .attr('facet', false)
          .attr('frame', false)
          .encode('x', 'culmen_depth_mm')
          .encode('y', 'culmen_length_mm')
          .style('fill', '#ddd')
          .style('lineWidth', 0);
        
        facetRect
          .point()
          .encode('x', 'culmen_depth_mm')
          .encode('y', 'culmen_length_mm')
          .encode('color', 'island');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/composition/facet/demo/rect.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/composition/facet/demo/rect.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/composition/facet/demo/rect.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Facet Rect</CardTitle>
        <CardDescription>
          G2 Chart. Original example: composition/facet/demo/rect.ts
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
