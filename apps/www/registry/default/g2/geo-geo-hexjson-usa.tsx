// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart, register } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/geo/geo/demo/hexjson-usa.ts



export default function G2ChartComponent_geo_geo_hexjson_usa() {
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
        
        
        chart
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/antvdemo/assets/data/us-states.hex.json',
          })
          .axis(false);
        
        chart
          .polygon()
          .data({
            transform: [{ type: 'hexgird' }],
          })
          .encode('x', 'x')
          .encode('y', 'y')
          .style('fill', 'grey')
          .style('opacity', 0.2)
          .style('lineWidth', 2)
          .style('stroke', '#fff')
          .style('pointerEvents', 'none')
          .tooltip(false);
        
        chart
          .polygon()
          .data({
            transform: [{ type: 'hexbin' }],
          })
          .encode('x', 'x')
          .encode('y', 'y')
          .style('fill', '#5B8FF9')
          .style('lineWidth', 5)
          .style('stroke', '#fff')
          .label({
            text: 'key',
            fontSize: 16,
            fontWeight: 500,
            position: 'inside',
            pointerEvents: 'none',
          })
          .tooltip({
            field: 'capital',
          })
          .state('active', { fill: 'orange' })
          .state('inactive', { opacity: 0.5 })
          .interaction('elementHighlight', true);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/geo/geo/demo/hexjson-usa.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/geo/geo/demo/hexjson-usa.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/geo/geo/demo/hexjson-usa.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hexbin USA Map</CardTitle>
        <CardDescription>
          G2 Chart. Original example: geo/geo/demo/hexjson-usa.ts
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
