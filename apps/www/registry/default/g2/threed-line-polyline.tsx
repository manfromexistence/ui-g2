// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin } from '@antv/g-plugin-3d';
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

// Original G2 example path: integration/G2/site/examples/threed/line/demo/polyline.ts

const FALLBACK_COLORS_JSON = '["#E57373","#81C784","#64B5F6","#FFD54F","#BA68C8"]';

export default function G2ChartComponent_threed_line_polyline() {
  // Helper functions and data extracted from the original G2 example.
  // These are defined within the component scope to be accessible by the G2 chart logic in useEffect.
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
        /**
         * 3D Line
         * @see https://plotly.com/javascript/3d-line-plots/
         */
        const pointCount = 31;
        let r;
        const data = [];
        
        for (let i = 0; i < pointCount; i++) {
          r = 10 * Math.cos(i / 10);
          data.push({
            x: r * Math.cos(i),
            y: r * Math.sin(i),
            z: i,
          });
        }
        
        g2ChartInstance.current
          .line3D()
          .data(data)
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('z', 'z')
          .encode('size', 4)
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
        console.error("Error initializing G2 chart from integration/G2/site/examples/threed/line/demo/polyline.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/threed/line/demo/polyline.ts</div>';
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/threed/line/demo/polyline.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Polyline</CardTitle>
        <CardDescription>
          G2 Chart. Original example: threed/line/demo/polyline.ts
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
