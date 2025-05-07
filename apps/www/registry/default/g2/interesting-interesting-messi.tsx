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

// Original G2 example path: integration/G2/site/examples/interesting/interesting/demo/messi.ts

const FALLBACK_COLORS_JSON = '["#E57373","#81C784","#64B5F6","#FFD54F","#BA68C8"]';

// Helper functions and data defined in the G2 original example:
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

// Helper code extracted from original (review and adapt if necessary):
const FW = 600;

const FH = 400;

// Trailing helpers extracted from original:

/**
 * Draw a football field.
 */
function football(_, context) {
  const { document } = context;

  const g = document.createElement('g');
  const r = document.createElement('rect', {
    style: {
      x: 0,
      y: 0,
      width: FW,
      height: FH,
      fill: 'green',
      fillOpacity: 0.2,
      stroke: 'grey',
      lineWidth: 1,
    },
  });

  const r1 = document.createElement('rect', {
    style: {
      x: FW - FH * 0.6 * 0.45,
      y: (FH - FH * 0.6) / 2,
      width: FH * 0.6 * 0.45,
      height: FH * 0.6,
      strokeOpacity: 0.5,
      stroke: 'grey',
      lineWidth: 1,
    },
  });

  const r2 = document.createElement('rect', {
    style: {
      x: FW - FH * 0.3 * 0.45,
      y: (FH - FH * 0.3) / 2,
      width: FH * 0.3 * 0.45,
      height: FH * 0.3,
      strokeOpacity: 0.5,
      stroke: 'grey',
      lineWidth: 1,
    },
  });

  const l = document.createElement('line', {
    style: {
      x1: FW / 2,
      y1: 0,
      x2: FW / 2,
      y2: FH,
      strokeOpacity: 0.4,
      stroke: 'grey',
      lineWidth: 2,
    },
  });

  g.append(r);
  g.append(r1);
  g.append(r2);
  g.append(l);

  return g;
}

export default function G2ChartComponent_interesting_interesting_messi() {
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
          width: FW + P * 2,
          height: FH + P * 2,
          padding: P,
        });
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        // Draw football field.
        g2ChartInstance.current.shape().style('x', '0%').style('y', '0%').style('render', football);
        
        // Analysis messi's shoot data.
        g2ChartInstance.current
          .rect()
          .data({
            type: 'fetch',
            value:
              'https://mdn.alipayobjects.com/afts/file/A*FCRjT4NGENEAAAAAAAAAAAAADrd2AQ/messi.json',
          })
          .transform({
            type: 'bin',
            opacity: 'count',
            thresholdsX: 15,
            thresholdsY: 15,
          })
          .encode('x', (d) => Number(d.X))
          .encode('y', (d) => Number(d.Y))
          .scale('x', { domain: [0, 1] })
          .scale('y', { domain: [0, 1] })
          .axis(false)
          .legend(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/interesting/interesting/demo/messi.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/interesting/interesting/demo/messi.ts</div>';
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/interesting/interesting/demo/messi.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Messi's shoot</CardTitle>
        <CardDescription>
          G2 Chart. Original example: interesting/interesting/demo/messi.ts
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
