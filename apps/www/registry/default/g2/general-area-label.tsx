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

// Original G2 example path: integration/G2/site/examples/general/area/demo/label.ts



export default function G2ChartComponent_general_area_label() {
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
        
        
        g2ChartInstance.current.data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/population-by-state.json',
          transform: [
            {
              type: 'fold',
              fields: States,
              key: 'state',
              value: 'population',
            },
            {
              type: 'map',
              callback: (d) => ({
                ...d,
                region: RegionStateMap.get(d.state),
                date: new Date(d.date),
              }),
            },
          ],
        });
        
        chart
          .area()
          .transform([{ type: 'stackY' }, { type: 'normalizeY' }])
          .encode('x', 'date')
          .encode('y', 'population')
          .encode('color', 'region')
          .encode('series', 'state')
          .label({
            text: 'state',
            position: 'area', // `area` type positon used here.
            selector: 'first',
            transform: [{ type: 'overlapHide' }],
            fontSize: 10,
          })
          .tooltip({ channel: 'y', valueFormatter: (d) => d.toFixed(3) });
        
        chart
          .line()
          .transform([{ type: 'stackY' }, { type: 'normalizeY' }])
          .encode('x', 'date')
          .encode('y', 'population')
          .encode('series', 'state')
          .encode('color', 'region') // For LegendFilter.
          .style('stroke', '#000')
          .style('lineWidth', 0.5)
          .style('fillOpacity', 0.8)
          .tooltip(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/area/demo/label.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/area/demo/label.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/area/demo/label.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Area Label</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/area/demo/label.ts
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
