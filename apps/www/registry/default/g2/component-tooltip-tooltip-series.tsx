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

// Original G2 example path: integration/G2/site/examples/component/tooltip/demo/tooltip-series.ts



export default function G2ChartComponent_component_tooltip_tooltip_series() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        g2ChartInstance.current
          .line()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/indices.json',
          })
          .transform({ type: 'normalizeY', basis: 'first', groupBy: 'color' })
          .encode('x', (d) => new Date(d.Date))
          .encode('y', 'Close')
          .encode('color', 'Symbol')
          .axis('y', { title: '↑ Change in price (%)' })
          .tooltip({
            title: (d) => new Date(d.Date).toUTCString(),
            items: [
              (d, i, data, column) => ({
                name: 'Close',
                value: column.y.value[i].toFixed(1),
              }),
            ],
          })
          .label({
            text: 'Symbol',
            selector: 'last',
            fontSize: 10,
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-series.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/tooltip/demo/tooltip-series.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-series.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tooltip Series</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/tooltip/demo/tooltip-series.ts
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
