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

// Original G2 example path: integration/G2/site/examples/general/pie/demo/pie-base-facet.ts

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



export default function G2ChartComponent_general_pie_pie_base_facet() {
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
        });
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        const facetRect = g2ChartInstance.current
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
          chartRef.current.innerHTML = '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/pie/demo/pie-base-facet.ts</div>';
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
  }, [shadcnColors]);

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
