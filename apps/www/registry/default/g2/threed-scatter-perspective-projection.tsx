// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { threedlib } from '@antv/g2-extension-3d';
import { Runtime, corelib, extend , register } from '@antv/g2';

import { useShadcnChartColors } from "@/hooks/use-shadcn-chart-colors"; // Import the hook
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/threed/scatter/demo/perspective-projection.ts

const FALLBACK_COLORS_JSON = '["#E57373","#81C784","#64B5F6","#FFD54F","#BA68C8"]';

export default function G2ChartComponent_threed_scatter_perspective_projection() {
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
  
  // Helper code extracted from original (review and adapt if necessary):
  const renderer = new WebGLRenderer();
  renderer.registerPlugin(new ThreeDPlugin());
  renderer.registerPlugin(new ControlPlugin());
  
  // Customize our own Chart with threedlib.
  
  // Trailing helpers extracted from original:
    const { canvas } = g2ChartInstance.current.getContext();
    const camera = canvas.getCamera();
    // Use perspective projection mode.
    camera.setPerspective(0.1, 5000, 45, 640 / 480);
    camera.setType(CameraType.ORBITING);
  
    // Add a directional light into scene.
    const light = new DirectionalLight({
      style: {
        intensity: 3,
        fill: 'white',
        direction: [-1, 0, 1],
      },
    });
    canvas.appendChild(light);
  });

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
          renderer,
          depth: 400, // Define the depth of chart.
        });
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        g2ChartInstance.current
          .point3D()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/2c813e2d-2276-40b9-a9af-cf0a0fb7e942.csv',
          })
          .encode('x', 'Horsepower')
          .encode('y', 'Miles_per_Gallon')
          .encode('z', 'Weight_in_lbs')
          .encode('color', 'Origin')
          .encode('shape', 'cube')
          .coordinate({ type: 'cartesian3D' })
          .scale('x', { nice: true })
          .scale('y', { nice: true })
          .scale('z', { nice: true })
          .legend(false)
          .axis('x', { gridLineWidth: 2 })
          .axis('y', { gridLineWidth: 2, titleBillboardRotation: -Math.PI / 2 })
          .axis('z', { gridLineWidth: 2 });
        
        g2ChartInstance.current.render().then(() => {
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/threed/scatter/demo/perspective-projection.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/threed/scatter/demo/perspective-projection.ts</div>';
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/threed/scatter/demo/perspective-projection.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Perspective projection</CardTitle>
        <CardDescription>
          G2 Chart. Original example: threed/scatter/demo/perspective-projection.ts
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
