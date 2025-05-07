// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin } from '@antv/g-plugin-3d';
import { Plugin as ControlPlugin } from '@antv/g-plugin-control';
import { Runtime, corelib, extend } from '@antv/g2';
import { threedlib } from '@antv/g2-extension-3d';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/threed/surface/demo/dirichlet.ts

// Helper code extracted from original (review and adapt if necessary):
const size = 100;


const points: { x: number; y: number; z: number }[] = [];

const renderer = new WebGLRenderer();

const Chart = extend(Runtime, { ...corelib(), ...threedlib() });

export default function G2ChartComponent_threed_surface_dirichlet() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          renderer,
          width: 600,
          height: 600,
          depth: 300, // Define the depth of chart.
        });
        
        
        g2ChartInstance.current
          .surface3D()
          .data(points)
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('z', 'z')
          .coordinate({ type: 'cartesian3D' })
          .scale('x', { nice: true })
          .scale('y', { nice: true })
          .scale('z', { nice: true })
          .legend(false)
          .axis('x', { gridLineWidth: 1 })
          .axis('y', { gridLineWidth: 1, titleBillboardRotation: -Math.PI / 2 })
          .axis('z', { gridLineWidth: 1 });
        
        chart.render().then(() => {
          const { canvas } = chart.getContext();
          const camera = canvas.getCamera();
          // Use perspective projection mode.
          camera.setPerspective(0.1, 3000, 45, 600 / 600);
          camera.rotate(30, 30, 0);
          camera.dolly(60);
          camera.setType(CameraType.ORBITING);
        });
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // Original G2 script operations after 'new Chart(...)' did not appear to include a render call for 'chart'.
        // Review original script and adapt necessary logic, including the render call.
        // Original script content after initialization (partial for reference):
        // chart
        //   .surface3D()
        //   .data(points)
        //   .encode('x', 'x')
        //   .encode('y', 'y')
        //   .encode('z', 'z')
        //   .coordinate({ type: 'cartesian3D' })
        //   .scale('x', { nice: true })
        //   .scale('y', { nice: true })
        //   .scale('z', { nice: true })
        //   .legend(false)
        //   .axis('x', { gridLineWidth: 1 })
        //   .axis('y', { gridLineWidth: 1, titleBillboardRotation: -Math.PI / 2 })
        //   .axis('z', { gridLineWidth: 1 });
        // 
        // chart.render().then(() => {
        //   const { canvas } = chart.getContext();
        //   const camera = canvas.getCamera();
        //   // U
        // // ... (code truncated)
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/threed/surface/demo/dirichlet.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/threed/surface/demo/dirichlet.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/threed/surface/demo/dirichlet.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>The Dirichlet distribution</CardTitle>
        <CardDescription>
          G2 Chart. Original example: threed/surface/demo/dirichlet.ts
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
