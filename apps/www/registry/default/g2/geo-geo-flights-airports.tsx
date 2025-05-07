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

// Original G2 example path: integration/G2/site/examples/geo/geo/demo/flights-airports.ts



export default function G2ChartComponent_geo_geo_flights_airports() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
            container: chartRef.current,
            autoFit: true,
          });
        
        
          const geoView = chartRef.current.geoView().coordinate({ type: 'albersUsa' });
        
          geoView
            .geoPath()
            .data(states)
            .style('fill', 'lightgray')
            .style('stroke', 'white');
        
          geoView
            .point()
            .data(airports)
            .encode('x', 'longitude')
            .encode('y', 'latitude')
            .encode('color', 'gray')
            .encode('shape', 'point')
            .encode('size', 1);
        
          geoView
            .link()
            .data({
              value: flights,
              transform: [
                {
                  type: 'filter',
                  callback: (d) => d.origin === 'SEA',
                },
                {
                  type: 'join',
                  join: airports,
                  on: ['origin', 'iata'],
                  select: ['latitude', 'longitude'],
                  as: ['origin_latitude', 'origin_longitude'],
                },
                {
                  type: 'join',
                  join: airports,
                  on: ['destination', 'iata'],
                  select: ['latitude', 'longitude'],
                  as: ['dest_latitude', 'dest_longitude'],
                },
              ],
            })
            .encode('x', ['origin_longitude', 'dest_longitude'])
            .encode('y', ['origin_latitude', 'dest_latitude'])
            .style('stroke', 'black');
        
          chartRef.current.render();
        });
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/geo/geo/demo/flights-airports.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/geo/geo/demo/flights-airports.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/geo/geo/demo/flights-airports.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Flights and Airports</CardTitle>
        <CardDescription>
          G2 Chart. Original example: geo/geo/demo/flights-airports.ts
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
