// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/composition/space/demo/space-layer.ts



export default function G2ChartComponent_composition_space_space_layer() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        const scaleColor = (node) =>
          node.scale('color', {
            palette: 'cool',
            offset: (t) => t * 0.8 + 0.1,
          });
        
        const layer = g2ChartInstance.current.spaceLayer().data({
          type: 'fetch',
          value:
            'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
          format: 'csv',
        });
        
        layer
          .interval()
          .transform({ type: 'sortX', reverse: true, by: 'y' })
          .encode('x', 'letter')
          .encode('y', 'frequency')
          .encode('color', 'letter')
          .call(scaleColor);
        
        layer
          .interval()
          .attr('x', 300)
          .attr('y', 50)
          .attr('width', 300)
          .attr('height', 300)
          .coordinate({ type: 'theta' })
          .transform({ type: 'stackY' })
          .legend(false)
          .scale('color', {
            palette: 'cool',
            offset: (t) => t * 0.8 + 0.1,
          })
          .encode('y', 'frequency')
          .encode('color', 'letter')
          .call(scaleColor);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/composition/space/demo/space-layer.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/composition/space/demo/space-layer.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/composition/space/demo/space-layer.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Space Layer</CardTitle>
        <CardDescription>
          G2 Chart. Original example: composition/space/demo/space-layer.ts
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
