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

// Original G2 example path: integration/G2/site/examples/general/dual/demo/multi-line-sync.ts

// Helper code extracted from original (review and adapt if necessary):
function syncTicksOfDomainsFromZero(scales) {
  scales.forEach((scale) => scale.update({ nice: true }));
  const normalize = (d) => d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10));
  const maxes = scales.map((scale) => scale.getOptions().domain[1]);
  const normalized = maxes.map(normalize);
  const normalizedMax = Math.max(...normalized);
  for (let i = 0; i < scales.length; i++) {
    const scale = scales[i];
    const domain = scale.getOptions().domain;
    const t = maxes[i] / normalized[i];
    const newDomainMax = normalizedMax * t;
    scale.update({ domain: [domain[0], newDomainMax] });
  }
}

const data = [
  {
    Month: 'Jan',
    Evaporation: 2,
    Precipitation: 2.6,
    Temperature: 2,
  },
  {
    Month: 'Feb',
    Evaporation: 4.9,
    Precipitation: 5.9,
    Temperature: 2.2,
  },
  {
    Month: 'Mar',
    Evaporation: 7,
    Precipitation: 9,
    Temperature: 3.3,
  },
  {
    Month: 'Apr',
    Evaporation: 23.2,
    Precipitation: 26.4,
    Temperature: 4.5,
  },
  {
    Month: 'May',
    Evaporation: 25.6,
    Precipitation: 28.7,
    Temperature: 6.3,
  },
  {
    Month: 'Jun',
    Evaporation: 76.7,
    Precipitation: 70.7,
    Temperature: 10.2,
  },
  {
    Month: 'Jul',
    Evaporation: 135.6,
    Precipitation: 175.6,
    Temperature: 20.3,
  },
  {
    Month: 'Aug',
    Evaporation: 162.2,
    Precipitation: 182.2,
    Temperature: 23.4,
  },
  {
    Month: 'Sep',
    Evaporation: 32.6,
    Precipitation: 48.7,
    Temperature: 23,
  },
  {
    Month: 'Oct',
    Evaporation: 20,
    Precipitation: 18.8,
    Temperature: 16.5,
  },
  {
    Month: 'Nov',
    Evaporation: 6.4,
    Precipitation: 6,
    Temperature: 12,
  },
  {
    Month: 'Dec',
    Evaporation: 3.3,
    Precipitation: 2.3,
    Temperature: 6.2,
  },
];

export default function G2ChartComponent_general_dual_multi_line_sync() {
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
        
        
        g2ChartInstance.current.data(data);
        
        g2ChartInstance.current
          .line()
          .encode('x', 'Month')
          .encode('y', 'Temperature')
          .encode('color', '#EE6666')
          .encode('shape', 'smooth')
          .scale('y', {
            independent: true,
            groupTransform: syncTicksOfDomainsFromZero,
          })
          .axis('y', {
            title: 'Temperature (°C)',
            grid: null,
            titleFill: '#EE6666',
          });
        
        g2ChartInstance.current
          .interval()
          .encode('x', 'Month')
          .encode('y', 'Evaporation')
          .encode('color', '#5470C6')
          .scale('y', { independent: true })
          .style('fillOpacity', 0.8)
          .axis('y', {
            position: 'right',
            title: 'Evaporation (ml)',
            titleFill: '#5470C6',
          });
        
        g2ChartInstance.current
          .line()
          .encode('x', 'Month')
          .encode('y', 'Precipitation')
          .encode('color', '#91CC75')
          .scale('y', { independent: true })
          .style('lineWidth', 2)
          .style('lineDash', [2, 2])
          .axis('y', {
            position: 'right',
            title: 'Precipitation (ml)',
            grid: null,
            titleFill: '#91CC75',
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/dual/demo/multi-line-sync.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/dual/demo/multi-line-sync.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/dual/demo/multi-line-sync.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sync Multi Axis Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/dual/demo/multi-line-sync.ts
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
