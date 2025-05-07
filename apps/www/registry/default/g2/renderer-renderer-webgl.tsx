// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';
import { Renderer } from '@antv/g-webgl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/renderer/renderer/demo/webgl.ts



export default function G2ChartComponent_renderer_renderer_webgl() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          renderer: new Renderer(),
        });
        
        
        const flex = chartRef.current
          .spaceFlex()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
          })
          .attr('direction', 'col')
          .attr('ratio', [1, 1]);
        
        const flex1 = flex.spaceFlex().attr('direction', 'row').attr('ratio', [1, 1]);
        
        flex1
          .interval()
          .transform({ type: 'groupX', y: 'mean' })
          .encode('x', (d) => new Date(d.date).getUTCMonth())
          .encode('y', 'precipitation');
        
        flex1
          .line()
          .transform({ type: 'groupX', y: 'mean' })
          .encode('x', (d) => new Date(d.date).getUTCMonth())
          .encode('y', 'wind')
          .encode('shape', 'smooth');
        
        const flex2 = flex.spaceFlex().attr('direction', 'row').attr('ratio', [1, 1]);
        
        flex2
          .area()
          .transform({ type: 'groupX', y: 'mean' })
          .encode('x', (d) => new Date(d.date).getUTCMonth())
          .encode('y', ['temp_min', 'temp_max'])
          .encode('shape', 'smooth');
        
        flex2
          .point()
          .transform({ type: 'groupX', y: 'mean' })
          .encode('x', 'temp_min')
          .encode('y', 'temp_max')
          .encode('shape', 'point');
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/renderer/renderer/demo/webgl.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/renderer/renderer/demo/webgl.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/renderer/renderer/demo/webgl.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>WebGL Renderer</CardTitle>
        <CardDescription>
          G2 Chart. Original example: renderer/renderer/demo/webgl.ts
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
