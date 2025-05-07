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

// Original G2 example path: integration/G2/site/examples/style/rough/demo/line.ts



export default function G2ChartComponent_style_rough_line() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
              container: chartRef.current,
              autoFit: true,
              plugins: [new Plugin()],
            });
        
        
            chart
              .line()
              .data({
                type: 'fetch',
                value:
                  'https://gw.alipayobjects.com/os/bmw-prod/cb99c4ab-e0a3-4c76-9586-fe7fa2ff1a8c.csv',
              })
              .transform({ type: 'groupX', y: 'mean' })
              .encode('x', (d) => new Date(d.date).getFullYear())
              .encode('y', 'price')
              .encode('color', 'symbol')
              .label({
                text: 'price',
                transform: [{ type: 'overlapDodgeY' }],
                fontSize: 10,
                fontFamily: 'Gaegu',
              })
              .axis('x', {
                tickStroke: '#cdcdcd',
                gridStroke: '#efefef',
                labelFontFamily: 'Gaegu',
              })
              .axis('y', {
                tickStroke: '#cdcdcd',
                gridStroke: '#efefef',
                titleFontFamily: 'Gaegu',
                labelFontFamily: 'Gaegu',
              })
              .legend('color', { itemLabelFontFamily: 'Gaegu' })
              .style('roughness', 2);
        
            chartRef.current.render();
          },
        });
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/rough/demo/line.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/rough/demo/line.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/rough/demo/line.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sketchy Line Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/rough/demo/line.ts
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
