// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart, MASK_CLASS_NAME } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/interaction/brush/demo/brush.ts



export default function G2ChartComponent_interaction_brush_brush() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        const [render, remove] = useTip({
          container: document.getElementById('container'),
          onRemove: () => g2ChartInstance.current.emit('brush:remove', {}),
        });
        
        chart
          .point()
          .data({
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
          })
          .encode('x', 'weight')
          .encode('y', 'height')
          .encode('color', 'gender')
          .encode('shape', 'point')
          .style({
            fillOpacity: 0.2,
            lineWidth: 1,
            transform: 'scale(1, 1)',
            transformOrigin: 'center center',
          })
          .state('inactive', {
            fill: 'black',
            fillOpacity: 0.5,
            transform: 'scale(0.5, 0.5)',
          })
          .interaction('brushHighlight', true);
        
        g2ChartInstance.current.on('brush:start', onStart);
        g2ChartInstance.current.on('brush:end', onUpdate);
        g2ChartInstance.current.on('brush:remove', onRemove);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/interaction/brush/demo/brush.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/interaction/brush/demo/brush.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/interaction/brush/demo/brush.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Brush</CardTitle>
        <CardDescription>
          G2 Chart. Original example: interaction/brush/demo/brush.ts
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
