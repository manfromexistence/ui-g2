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

// Original G2 example path: integration/G2/site/examples/composition/facet/demo/rect-col.ts



export default function G2ChartComponent_composition_facet_rect_col() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
              container: chartRef.current,
              height: 800,
              paddingLeft: 140,
              paddingRight: 130,
              paddingBottom: 60,
            });
        
        
            const facetRect = chart
              .facetRect()
              .data(data)
              .encode('y', 'site')
              .scale('y', {
                domain: groupSort(
                  data,
                  (g) => -median(g, (d) => d.yield),
                  (d) => d.site,
                ),
              });
        
            facetRect
              .point()
              .attr('insetLeft', 5)
              .attr('insetRight', 5)
              .scale('color', { type: 'ordinal' })
              .scale('y', {
                domain: groupSort(
                  data,
                  (g) => -median(g, (d) => d.yield),
                  (d) => d.variety,
                ),
              })
              .encode('x', 'yield')
              .encode('y', 'variety')
              .encode('color', 'year')
              .encode('shape', 'hollow')
              .axis('y', { labelAutoRotate: false });
        
            chartRef.current.render();
          });
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/composition/facet/demo/rect-col.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/composition/facet/demo/rect-col.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/composition/facet/demo/rect-col.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Col Facet Rect</CardTitle>
        <CardDescription>
          G2 Chart. Original example: composition/facet/demo/rect-col.ts
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
