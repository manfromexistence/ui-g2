// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';
import { Plugin } from '@antv/g-plugin-rough-canvas-renderer';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/style/rough/demo/point.ts



export default function G2ChartComponent_style_rough_point() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
              container: chartRef.current,
              autoFit: true,
              plugins: [new Plugin()],
            });
        
        
            g2ChartInstance.current
              .point()
              .data({
                type: 'fetch',
                value:
                  'https://gw.alipayobjects.com/os/basement_prod/6b4aa721-b039-49b9-99d8-540b3f87d339.json',
              })
              .encode('x', 'height')
              .encode('y', 'weight')
              .encode('color', 'gender')
              .axis('x', {
                titleFontSize: 15,
                titleFontFamily: 'Gaegu',
                labelFontFamily: 'Gaegu',
                tickStroke: '#cdcdcd',
                gridStroke: '#efefef',
              })
              .axis('y', {
                titleFontSize: 15,
                titleFontFamily: 'Gaegu',
                labelFontFamily: 'Gaegu',
                tickStroke: '#cdcdcd',
                gridStroke: '#efefef',
              })
              .legend('color', { itemLabelFontFamily: 'Gaegu' });
        
            chart.render();
          },
        });
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/rough/demo/point.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/rough/demo/point.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/rough/demo/point.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sketchy Scatterplot</CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/rough/demo/point.ts
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
