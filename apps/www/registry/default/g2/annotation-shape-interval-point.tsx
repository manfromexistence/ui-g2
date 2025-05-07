// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart , register } from '@antv/g2';

import { useShadcnChartColors } from "@/hooks/use-shadcn-chart-colors"; // Import the hook
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/annotation/shape/demo/interval-point.ts



export default function G2ChartComponent_annotation_shape_interval_point() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);
  const shadcnColors = useShadcnChartColors(chartRef); // Use the hook

  useEffect(() => {
    // Palette registration must happen before G2 chart initialization attempts to use it.
    // It also needs to happen after shadcnColors are resolved.
    // And chartRef.current must exist for getComputedStyle to work in the hook.
    
    // Register the palette once colors are resolved (or with fallback).
    // Check if shadcnColors are not the initial fallback to ensure hook has run or CSS vars are applied.
    // The hook itself returns FALLBACK_COLORS initially or if resolution fails.
    if (shadcnColors && shadcnColors.length === 5) {
        try {
            register('palette.shadcnPalette', () => shadcnColors);
        } catch (e) {
            console.error("Error registering shadcnPalette, G2 'register' might not be available or shadcnColors are invalid:", e, shadcnColors);
            // Fallback registration if the above fails for any reason
            register('palette.shadcnPalette', () => JSON.parse(FALLBACK_COLORS_JSON));
        }
    } else {
        // Fallback if shadcnColors is not yet ready or invalid
        console.warn("Shadcn colors not ready or invalid, using fallback palette for G2 chart.");
        register('palette.shadcnPalette', () => JSON.parse(FALLBACK_COLORS_JSON));
    }

    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          paddingRight: 30,
        });
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current.coordinate({ transform: [{ type: 'transpose' }] });
        
        g2ChartInstance.current.data([
          { x: 'Jan', tick: 9.3, value: 11.5 },
          { x: 'Feb', tick: 10.5, value: 12 },
          { x: 'Mar', tick: 11.2, value: 11.7 },
          { x: 'Apr', tick: 11.2, value: 12.4 },
          { x: 'May', tick: 12.7, value: 13.5 },
          { x: 'Jun', tick: 13.1, value: 11.9 },
          { x: 'Jul', tick: 12.2, value: 14.6 },
          { x: 'Aug', tick: 12.2, value: 17.2 },
          { x: 'Sep', tick: 10.1, value: 16.9 },
          { x: 'Oct', tick: 14.5, value: 15.4 },
          { x: 'Nov', tick: 14.5, value: 16.9 },
          { x: 'Dec', tick: 15.5, value: 17.2 },
        ]);
        
        g2ChartInstance.current
          .interval()
          .encode('x', 'x')
          .encode('y', 'value')
          .encode('size', 20)
          .axis('x', { title: false })
          .style('fillOpacity', 0.65)
          .style('lineWidth', 1)
          .label({
            text: 'value',
            position: 'right',
            formatter: (v) => `${v}min`,
            dx: 4,
            textAlign: 'start',
          });
        
        g2ChartInstance.current
          .point()
          .encode('x', 'x')
          .encode('y', 'tick')
          .encode('shape', 'line')
          .encode('size', 15)
          .style('stroke', 'red')
          .tooltip(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/shape/demo/interval-point.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/shape/demo/interval-point.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/shape/demo/interval-point.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Interval, Point Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/shape/demo/interval-point.ts
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
