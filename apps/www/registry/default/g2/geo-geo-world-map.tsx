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

// Original G2 example path: integration/G2/site/examples/geo/geo/demo/world-map.ts



export default function G2ChartComponent_geo_geo_world_map() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        const geoView = chart.geoView().coordinate({ type: 'orthographic' });
        
        geoView
          .geoPath()
          .data({ type: 'graticule10' })
          .style('stroke', '#ccc')
          .style('fill', 'none');
        
        geoView
          .geoPath()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/countries-50m.json',
            transform: [{ type: 'feature', name: 'land' }],
          })
          .style('fill', 'black');
        
        geoView
          .geoPath()
          .data({ type: 'sphere' })
          .style('stroke', 'black')
          .style('fill', 'none');
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/geo/geo/demo/world-map.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/geo/geo/demo/world-map.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/geo/geo/demo/world-map.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>World Map</CardTitle>
        <CardDescription>
          G2 Chart. Original example: geo/geo/demo/world-map.ts
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
