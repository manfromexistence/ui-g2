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

// Original G2 example path: integration/G2/site/examples/threed/line/demo/polyline.ts

// Helper code extracted from original (review and adapt if necessary):
const renderer = new WebGLRenderer();

const Chart = extend(Runtime, { ...corelib(), ...threedlib() });

export default function G2ChartComponent_threed_line_polyline() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          renderer,
          depth: 400, // Define the depth of chart.
        });
        
        
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
        
        chartRef.current
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
        
        chart.render().then(() => {
          const { canvas } = chart.getContext();
          const camera = canvas.getCamera();
          // Use perspective projection mode.
          camera.setPerspective(0.1, 5000, 45, 640 / 480);
          camera.setType(CameraType.ORBITING);
        });
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // Original G2 script operations after 'new Chart(...)' did not appear to include a render call for 'chart'.
        // Review original script and adapt necessary logic, including the render call.
        // Original script content after initialization (partial for reference):
        // /**
        //  * 3D Line
        //  * @see https://plotly.com/javascript/3d-line-plots/
        //  */
        // const pointCount = 31;
        // let r;
        // const data = [];
        // 
        // for (let i = 0; i < pointCount; i++) {
        //   r = 10 * Math.cos(i / 10);
        //   data.push({
        //     x: r * Math.cos(i),
        //     y: r * Math.sin(i),
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
        //   .scale('z', { nic
        // // ... (code truncated)
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/threed/line/demo/polyline.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/threed/line/demo/polyline.ts</div>;
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
  }, []);

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
