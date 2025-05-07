// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart , register } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/geo/geo/demo/hexbin-china.ts



export default function G2ChartComponent_geo_geo_hexbin_china() {
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
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current
          .polygon()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/hexbin-china.json',
            transform: [
              {
                type: 'custom',
                callback: (data) => {
                  const dv = new DataSet.View().source(data).transform({
                    type: 'bin.hexagon',
                    fields: ['longitude', 'latitude'],
                    binWidth: [2, 3],
                    as: ['longitude', 'latitude', 'count'],
                  });
                  return dv.rows;
                },
              },
            ],
          })
          .encode('x', 'longitude')
          .encode('y', 'latitude')
          .encode('color', 'count')
          .scale('color', {
            range: '#BAE7FF-#1890FF-#0050B3',
          })
          .style('lineWidth', 5)
          .style('stroke', '#fff')
          .axis(false)
          .legend(false)
          .tooltip({
            field: 'count',
          })
          .state('active', { fill: 'orange' })
          .state('inactive', { opacity: 0.8 })
          .interaction('elementHighlight', true);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/geo/geo/demo/hexbin-china.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/geo/geo/demo/hexbin-china.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/geo/geo/demo/hexbin-china.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hexbin China Map</CardTitle>
        <CardDescription>
          G2 Chart. Original example: geo/geo/demo/hexbin-china.ts
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
