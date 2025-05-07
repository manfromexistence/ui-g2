// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Plugin } from '@antv/g-plugin-rough-canvas-renderer';
import { Chart , register } from '@antv/g2';

import { useShadcnChartColors } from "@/hooks/use-shadcn-chart-colors"; // Import the hook
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/style/rough/demo/radial.ts



export default function G2ChartComponent_style_rough_radial() {
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
              height: 480,
              plugins: [new Plugin()],
            });
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
            g2ChartInstance.current.coordinate({ type: 'theta' });
        
            g2ChartInstance.current
              .interval()
              .transform({ type: 'stackY' })
              .data({
                type: 'fetch',
                value:
                  'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
              })
              .encode('y', 'value')
              .encode('color', 'name')
              .scale('color', {
                range: [
                  'hachure',
                  'solid',
                  'zigzag',
                  'cross-hatch',
                  'dots',
                  'dashed',
                  'zigzag-line',
                ],
              })
              .style('fill', 'black')
              .style('stroke', 'black')
              .style('lineWidth', '4')
              .style('colorAttribute', 'fillStyle')
              .legend(false)
              .label({
                text: 'name',
                radius: 0.8,
                fontSize: 10,
                fontWeight: 'bold',
                fontFamily: 'Gaegu',
                fill: 'black',
                stroke: 'white',
              })
              .label({
                text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
                radius: 0.8,
                fontSize: 12,
                fontFamily: 'Gaegu',
                fill: 'black',
                stroke: 'white',
                dy: 8,
              });
        
            g2ChartInstance.current.render();
          },
        });
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/rough/demo/radial.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/rough/demo/radial.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/rough/demo/radial.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sketchy Raidal Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/rough/demo/radial.ts
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
