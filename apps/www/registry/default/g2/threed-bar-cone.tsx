// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { CameraType } from '@antv/g';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin as ThreeDPlugin, DirectionalLight } from '@antv/g-plugin-3d';
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

// Original G2 example path: integration/G2/site/examples/threed/bar/demo/cone.ts

// Helper code extracted from original (review and adapt if necessary):
const renderer = new WebGLRenderer();

const Chart = extend(Runtime, { ...corelib(), ...threedlib() });

export default function G2ChartComponent_threed_bar_cone() {
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
        
        const data: { x: string; z: string; y: number; color: number }[] = [];
        for (let x = 0; x < 5; ++x) {
          for (let z = 0; z < 5; ++z) {
            data.push({
              x: `x-${x}`,
              z: `z-${z}`,
              y: 10 - x - z,
              color: Math.random() < 0.33 ? 0 : Math.random() < 0.67 ? 1 : 2,
            });
          }
        }
        
        chart
          .interval3D()
          .data({
            type: 'inline',
            value: data,
          })
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('z', 'z')
          .encode('color', 'color')
          .encode('shape', 'cone')
          .coordinate({ type: 'cartesian3D' })
          .scale('x', { nice: true })
          .scale('y', { nice: true })
          .scale('z', { nice: true })
          .legend(false)
          .axis('x', { gridLineWidth: 2 })
          .axis('y', { gridLineWidth: 2, titleBillboardRotation: -Math.PI / 2 })
          .axis('z', { gridLineWidth: 2 })
          .style('opacity', 0.7);
        
        g2ChartInstance.current.render().then(() => {
          const { canvas } = g2ChartInstance.current.getContext();
          const camera = canvas.getCamera();
          // Use perspective projection mode.
          camera.setPerspective(0.1, 5000, 45, 640 / 480);
          camera.rotate(-40, 30, 0);
          camera.dolly(70);
          camera.setType(CameraType.ORBITING);
        
          // Add a directional light into scene.
          const light = new DirectionalLight({
            style: {
              intensity: 2.5,
              fill: 'white',
              direction: [-1, 0, 1],
            },
          });
          canvas.appendChild(light);
        });
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // Original G2 script operations after 'new Chart(...)' did not appear to include a render call for 'chart'.
        // Review original script and adapt necessary logic, including the render call.
        // Original script content after initialization (partial for reference):
        // const data: { x: string; z: string; y: number; color: number }[] = [];
        // for (let x = 0; x < 5; ++x) {
        //   for (let z = 0; z < 5; ++z) {
        //     data.push({
        //       x: `x-${x}`,
        //       z: `z-${z}`,
        //       y: 10 - x - z,
        //       color: Math.random() < 0.33 ? 0 : Math.random() < 0.67 ? 1 : 2,
        //     });
        //   }
        // }
        // 
        // chart
        //   .interval3D()
        //   .data({
        //     type: 'inline',
        //     value: data,
        //   })
        //   .encode('x', 'x')
        //   .encode('y', 'y')
        //   .encode('z', 'z')
        //   .encode('color', 'color')
        //   .encode('shape', 'cone')
        //   .coordinate({ ty
        // // ... (code truncated)
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/threed/bar/demo/cone.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/threed/bar/demo/cone.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/threed/bar/demo/cone.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cone</CardTitle>
        <CardDescription>
          G2 Chart. Original example: threed/bar/demo/cone.ts
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
