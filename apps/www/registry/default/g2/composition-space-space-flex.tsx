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

// Original G2 example path: integration/G2/site/examples/composition/space/demo/space-flex.ts

const FALLBACK_COLORS_JSON = '["#E57373","#81C784","#64B5F6","#FFD54F","#BA68C8"]';

export default function G2ChartComponent_composition_space_space_flex() {
  // Helper functions and data extracted from the original G2 example.
  // These are defined within the component scope to be accessible by the G2 chart logic in useEffect.
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
          width: 900,
        });
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        const flex = g2ChartInstance.current
          .spaceFlex()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
          })
          .attr('direction', 'col')
          .attr('ratio', [1, 2]);
        
        flex
          .interval()
          .attr('paddingBottom', 0)
          .attr('paddingRight', 300)
          .transform({ type: 'groupX', y: 'max' })
          .axis('x', false)
          .encode('x', (d) => new Date(d.date).getUTCDate())
          .encode('y', 'temp_max')
          .encode('color', 'steelblue');
        
        flex
          .spaceFlex()
          .attr('ratio', [2, 1])
          .call((node) =>
            node
              .cell()
              .attr('paddingRight', 0)
              .attr('paddingBottom', 60)
              .transform({ type: 'group', color: 'max' })
              .encode('x', (d) => new Date(d.date).getUTCDate())
              .encode('y', (d) => new Date(d.date).getUTCMonth())
              .encode('color', 'temp_max')
              .style('inset', 0.5)
              .axis('x', { title: 'Date' })
              .axis('y', { title: 'Month' })
              .legend({ color: false })
              .scale('color', { palette: 'gnBu' }),
          )
          .call((node) =>
            node
              .attr('paddingBottom', 60)
              .interval()
              .coordinate({ transform: [{ type: 'transpose' }] })
              .transform({ type: 'groupX', y: 'max' })
              .axis('x', false)
              .encode('x', (d) => new Date(d.date).getUTCMonth())
              .encode('y', 'temp_max')
              .encode('color', 'steelblue'),
          );
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/composition/space/demo/space-flex.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/composition/space/demo/space-flex.ts</div>';
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/composition/space/demo/space-flex.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Space Flex</CardTitle>
        <CardDescription>
          G2 Chart. Original example: composition/space/demo/space-flex.ts
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
