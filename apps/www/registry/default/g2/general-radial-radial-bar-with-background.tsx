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

// Original G2 example path: integration/G2/site/examples/general/radial/demo/radial-bar-with-background.ts

const FALLBACK_COLORS_JSON = '["#E57373","#81C784","#64B5F6","#FFD54F","#BA68C8"]'; // Added definition

// Default data used as a fallback because no specific data source was detected:
const data = [
  { site: 'MN', variety: 'Manchuria', yield: 32.4, year: 1932 },
  { site: 'MN', variety: 'Manchuria', yield: 30.7, year: 1931 },
  { site: 'MN', variety: 'Glabron', yield: 33.1, year: 1932 },
  { site: 'MN', variety: 'Glabron', yield: 33, year: 1931 },
  { site: 'MN', variety: 'Svansota', yield: 29.3, year: 1932 },
  { site: 'MN', variety: 'Svansota', yield: 30.8, year: 1931 },
  { site: 'MN', variety: 'Velvet', yield: 32, year: 1932 },
  { site: 'MN', variety: 'Velvet', yield: 33.3, year: 1931 },
  { site: 'MN', variety: 'Peatland', yield: 30.5, year: 1932 },
  { site: 'MN', variety: 'Peatland', yield: 26.7, year: 1931 },
  { site: 'MN', variety: 'Trebi', yield: 31.6, year: 1932 },
  { site: 'MN', variety: 'Trebi', yield: 29.3, year: 1931 },
  { site: 'MN', variety: 'No. 457', yield: 31.9, year: 1932 },
  { site: 'MN', variety: 'No. 457', yield: 32.3, year: 1931 },
  { site: 'MN', variety: 'No. 462', yield: 29.9, year: 1932 },
  { site: 'MN', variety: 'No. 462', yield: 30.7, year: 1931 },
  { site: 'MN', variety: 'No. 475', yield: 28.1, year: 1932 },
  { site: 'MN', variety: 'No. 475', yield: 29.1, year: 1931 },
];



export default function G2ChartComponent_general_radial_radial_bar_with_background() {
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
          theme: 'dark',
        });
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        g2ChartInstance.current.data(data).coordinate({ type: 'radial', innerRadius: 0.35 });
        
        g2ChartInstance.current
          .interval()
          .encode('x', 'type')
          .encode('y', 0.2)
          .style('fill', '#202020')
          .state({
            active: { strokeWidth: 0 },
          })
          .tooltip(false);
        
        g2ChartInstance.current
          .interval()
          .encode('x', 'type')
          .encode('y', 'value')
          .encode('color', [
            (val) => (val.type === '10-30分' || val.type === '30+分' ? 'high' : 'low'),
          ])
          .scale('color', { range: ['#5B8FF9', '#ff4d4f'] })
          .style('radius', 20)
          .tooltip([
            (item) => ({
              name: item.type,
              value: item.value,
            }),
          ])
          .axis(false)
          .legend(false)
          .state({
            active: { stroke: '#fff', strokeWidth: 1 },
          })
          .interaction('elementHighlight');
        
        g2ChartInstance.current
          .image()
          .style('x', '50%')
          .style('y', '50%')
          .style('width', 100)
          .style('height', 80)
          .encode(
            'src',
            'https://gw.alipayobjects.com/mdn/rms_ef85c6/afts/img/A*0DYiQKP08cQAAAAAAAAAAAAAARQnAQ',
          )
          .tooltip(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/radial/demo/radial-bar-with-background.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radial/demo/radial-bar-with-background.ts</div>';
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/radial/demo/radial-bar-with-background.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Radial bar chart with background</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radial/demo/radial-bar-with-background.ts
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
