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
} from "@/registry/new-york/ui/card";

// Original G2 example path: integration/G2/site/examples/composition/facet/demo/rect-pie.ts

const FALLBACK_COLORS_JSON = '["#E57373","#81C784","#64B5F6","#FFD54F","#BA68C8"]';

export default function G2ChartComponent_composition_facet_rect_pie() {
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
          width: 800,
        });
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        const days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
        const mockData = () => {
          const names = ['Eat', 'Play', 'Sleep'];
          const week = (date) => {
            const currentDate = date.getDate();
            const newDate = new Date(date);
            const firstDay = new Date(newDate.setDate(1)).getDay();
            return Math.ceil((currentDate + firstDay) / 7);
          };
          const day = (date) => date.getDay();
          return Array.from({ length: 30 }, (_, i) => {
            const date = new Date(2022, 5, i + 1);
            return names.map((name) => ({
              activity: name,
              value: Math.random(),
              week: `${week(date)}`,
              day: days[day(date)],
            }));
          }).flat(Infinity);
        };
        
        const facetRect = g2ChartInstance.current
          .facetRect()
          .data(mockData())
          .encode('x', 'day')
          .encode('y', 'week')
          .scale('x', { domain: days })
          .legend('color', { position: 'right', size: 50 })
          .attr('paddingRight', 100);
        
        facetRect
          .view()
          .coordinate({ type: 'theta' })
          .interval()
          .transform({ type: 'stackY' })
          .scale('y', { facet: false })
          .encode('y', 'value')
          .encode('color', 'activity');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/composition/facet/demo/rect-pie.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/composition/facet/demo/rect-pie.ts</div>';
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/composition/facet/demo/rect-pie.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Calendar Pie Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: composition/facet/demo/rect-pie.ts
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
