// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart, register } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/geo/geo/demo/projection-comparison.ts

// Helper code extracted from original (review and adapt if necessary):
function worldMap(node, projection, color, opacity = 0.7) {
  const geoView = node.geoView().coordinate({
    type: projection,
    size: 'fitWidth',
  });



export default function G2ChartComponent_geo_geo_projection_comparison() {
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
        
        
        chart
          .spaceLayer()
          .call(worldMap, geoPolyconic, '#f00')
          .call(worldMap, geoRectangularPolyconic, '#00f');
        
        g2ChartInstance.current.render();
        
        function worldMap(node, projection, color, opacity = 0.7) {
          const geoView = node.geoView().coordinate({
            type: projection,
            size: 'fitWidth',
          });
        
          geoView
            .geoPath()
            .data({
              type: 'fetch',
              value: 'https://assets.antv.antgroup.com/g2/countries-50m.json',
              transform: [{ type: 'feature', name: 'land' }],
            })
            .style('fill', color)
            .style('opacity', opacity);
        
          geoView
            .geoPath()
            .data({ type: 'graticule10' })
            .style('stroke', color)
            .style('strokeOpacity', 0.3)
            .style('fill', 'none');
        
          geoView
            .geoPath()
            .data({ type: 'sphere' })
            .style('stroke', color)
            .style('fill', 'none');
        }
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/geo/geo/demo/projection-comparison.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/geo/geo/demo/projection-comparison.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/geo/geo/demo/projection-comparison.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Projection Comparison</CardTitle>
        <CardDescription>
          G2 Chart. Original example: geo/geo/demo/projection-comparison.ts
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
