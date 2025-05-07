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

// Original G2 example path: integration/G2/site/examples/general/text/demo/train.ts



export default function G2ChartComponent_general_text_train() {
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
          width: 600,
          height: 300,
          paddingLeft: 48,
        });
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        const X = new Array(21).fill(0).map((_, idx) => idx + 4);
        const Y = [-3, -2, -1, 0, 1, 2, 3];
        
        // Time axis
        g2ChartInstance.current
          .text()
          .data(X.slice(1))
          .encode('x', (v) => v)
          .encode('y', 0)
          .encode('text', (v) => (v < 12 ? `${v}a` : `${v - 12}p`))
          .scale('x', { domain: X })
          .scale('y', { domain: Y })
          .style('fill', 'grey')
          .axis(false);
        
        // South / North label
        g2ChartInstance.current
          .text()
          .data(['South', 'North'])
          .encode('x', 4)
          .encode('y', (_, idx) => (idx == 0 ? -1 : 1))
          .encode('text', (t) => t)
          .scale('x', { domain: X })
          .scale('y', { domain: Y })
          .style('textAlign', 'right')
          .axis(false);
        
        // NLB
        g2ChartInstance.current
          .text()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/caltrain.json',
          })
          .transform([{ type: 'stackY' }])
          .encode('x', (d) => Number(d.hours))
          .encode('y', (d) => (d.orientation === 'S' ? -1 : 1))
          .encode('color', 'type')
          .encode('text', (d) => d.minutes.padStart(2, '0'))
          .scale('x', { domain: X })
          .scale('y', { domain: Y })
          .scale('color', { range: ['currentColor', 'peru', 'brown'] })
          .style('stroke', 'transparent');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/text/demo/train.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/text/demo/train.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/text/demo/train.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Train</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/text/demo/train.ts
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
