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

// Original G2 example path: integration/G2/site/examples/general/radar/demo/area-radial.ts



export default function G2ChartComponent_general_radar_area_radial() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 954,
          height: 954,
        });
        
        
        chart.data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/seasonal-weather.json',
          transform: [
            {
              type: 'map',
              callback: (d) => ({
                ...d,
                date: new Date(d.date),
              }),
            },
          ],
        });
        
        chart.coordinate({ type: 'polar', innerRadius: 0.4 });
        
        g2ChartInstance.current
          .axis('y', {
            zIndex: 1,
            direction: 'center',
            title: null,
            labelFormatter: (d, i, array) =>
              i === array.length - 1 ? `${d}°F` : `${d}`,
            labelStroke: '#fff',
            labelLineWidth: 5,
          })
          .axis('x', {
            grid: true,
            position: 'inner',
          })
          .scale('x', { utc: true });
        
        g2ChartInstance.current
          .area()
          .encode('x', 'date')
          .encode('y', ['minmin', 'maxmax'])
          .style('fill', 'lightsteelblue')
          .style('fillOpacity', 0.2);
        
        g2ChartInstance.current
          .area()
          .encode('x', 'date')
          .encode('y', ['min', 'max'])
          .style('fill', 'steelblue')
          .style('fillOpacity', 0.2);
        
        g2ChartInstance.current
          .line()
          .encode('x', 'date')
          .encode('y', 'avg')
          .style('stroke', 'steelblue')
          .style('lineWidth', 1.5)
          .tooltip({ channel: 'y', valueFormatter: '.1f' });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/radar/demo/area-radial.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radar/demo/area-radial.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/radar/demo/area-radial.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Radial Area Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radar/demo/area-radial.ts
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
