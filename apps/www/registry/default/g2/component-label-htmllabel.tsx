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

// Original G2 example path: integration/G2/site/examples/component/label/demo/htmlLabel.ts

const FALLBACK_COLORS_JSON = '["#E57373","#81C784","#64B5F6","#FFD54F","#BA68C8"]';

// Helper functions and data defined in the G2 original example:


export default function G2ChartComponent_component_label_htmllabel() {
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
        const data = [
          { repo: 'G', star: 918 },
          { repo: 'G2', star: 11688 },
          { repo: 'G6', star: 10045 },
          { repo: 'L7', star: 3125 },
          { repo: 'F2', star: 7820 },
          { repo: 'S2', star: 1231 },
          { repo: 'X6', star: 4755 },
        ];
        
        g2ChartInstance.current
          .interval()
          .data(data)
          .encode('x', 'repo')
          .encode('y', 'star')
          .encode('color', 'repo')
          .label({
            text: 'star',
            render: (text, datum) => {
              return `
                <div style="left:-50%;top:-20px;position:relative;font-size:14px;">
                  <span>${datum.repo}</span>
                  :
                  <a href="https://github.com/antvis/${datum.repo}" target="_blank">${datum.star}</a>
                </div>
              `;
            },
          })
          .legend(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/label/demo/htmlLabel.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/label/demo/htmlLabel.ts</div>';
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/label/demo/htmlLabel.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>HTML Label</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/label/demo/htmlLabel.ts
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
