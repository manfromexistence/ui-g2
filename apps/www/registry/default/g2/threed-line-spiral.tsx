// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { Runtime, corelib, extend , register } from '@antv/g2';
import { threedlib , register } from '@antv/g2-extension-3d';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/threed/line/demo/spiral.ts

// Helper code extracted from original (review and adapt if necessary):
const renderer = new WebGLRenderer();
renderer.registerPlugin(new ThreeDPlugin());
renderer.registerPlugin(new ControlPlugin());

// Customize our own Chart with threedlib.

const Chart = extend(Runtime, { ...corelib(), ...threedlib() });

export default function G2ChartComponent_threed_line_spiral() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
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
         * 3D Spiral
         * @see https://plotly.com/javascript/3d-line-plots/
         */
        const pointCount = 500;
        let r;
        const data = [];
        
        for (let i = 0; i < pointCount; i++) {
          r = i * (pointCount - i);
          data.push({
            x: r * Math.cos(i / 30),
            y: r * Math.sin(i / 30),
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
          const { canvas } = g2ChartInstance.current.getContext();
          const camera = canvas.getCamera();
          // Use perspective projection mode.
          camera.setPerspective(0.1, 5000, 45, 640 / 480);
          camera.rotate(30, 30, 0);
          camera.dolly(30);
          camera.setType(CameraType.ORBITING);
        });
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // Original G2 script operations after 'new Chart(...)' did not appear to include a render call for 'chart'.
        // Review original script and adapt necessary logic, including the render call.
        // Original script content after initialization (partial for reference):
        // /**
        //  * 3D Spiral
        //  * @see https://plotly.com/javascript/3d-line-plots/
        //  */
        // const pointCount = 500;
        // let r;
        // const data = [];
        // 
        // for (let i = 0; i < pointCount; i++) {
        //   r = i * (pointCount - i);
        //   data.push({
        //     x: r * Math.cos(i / 30),
        //     y: r * Math.sin(i / 30),
        //     z: i,
        //   });
        // }
        // 
        // chart
        //   .line3D()
        //   .data(data)
        //   .encode('x', 'x')
        //   .encode('y', 'y')
        //   .encode('z', 'z')
        //   .encode('size', 4)
        //   .coordinate({ type: 'cartesian3D' })
        //   .scale('x', { nice: true })
        //   .scale('y', { nice: true })
        //   .scal
        // // ... (code truncated)
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/threed/line/demo/spiral.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/threed/line/demo/spiral.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/threed/line/demo/spiral.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spiral</CardTitle>
        <CardDescription>
          G2 Chart. Original example: threed/line/demo/spiral.ts
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
