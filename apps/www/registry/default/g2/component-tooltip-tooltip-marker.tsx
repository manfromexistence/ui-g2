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

// Original G2 example path: integration/G2/site/examples/component/tooltip/demo/tooltip-marker.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { item: 'Design', type: 'a', score: 70 },
  { item: 'Design', type: 'b', score: 30 },
  { item: 'Development', type: 'a', score: 60 },
  { item: 'Development', type: 'b', score: 70 },
  { item: 'Marketing', type: 'a', score: 50 },
  { item: 'Marketing', type: 'b', score: 60 },
  { item: 'Users', type: 'a', score: 40 },
  { item: 'Users', type: 'b', score: 50 },
  { item: 'Test', type: 'a', score: 60 },
  { item: 'Test', type: 'b', score: 70 },
  { item: 'Language', type: 'a', score: 70 },
  { item: 'Language', type: 'b', score: 50 },
  { item: 'Technology', type: 'a', score: 50 },
  { item: 'Technology', type: 'b', score: 40 },
  { item: 'Support', type: 'a', score: 30 },
  { item: 'Support', type: 'b', score: 40 },
  { item: 'Sales', type: 'a', score: 60 },
  { item: 'Sales', type: 'b', score: 40 },
  { item: 'UX', type: 'a', score: 50 },
  { item: 'UX', type: 'b', score: 60 },
];



const options = {
  type: 'view',
  coordinate: {
    type: 'polar',
  },
  scale: {
    x: { padding: 0.5, align: 0 },
    y: { tickCount: 5, domainMax: 80 },
  },
  autoFit: true,
  data,
  interaction: {
    legendFilter: false,
    elementPointMove: true,
    tooltip: {
      crosshairs: true,
      crosshairsStroke: 'red',
      crosshairsLineDash: [4, 4],
      markerType: 'hollow',
    },
  },
  axis: {
    x: {
      grid: true,
      gridStrokeWidth: 1,
      tick: false,
      gridLineDash: [0, 0],
    },
    y: {
      zIndex: 1,
      title: false,
      gridConnect: 'line',
      gridStrokeWidth: 1,
      gridLineDash: [0, 0],
    },
  },
  children: [
    {
      type: 'area',
      encode: {
        x: 'item',
        y: 'score',
        color: 'type',
        key: 'type',
      },
      style: {
        fillOpacity: 0.5,
      },
    },
    {
      type: 'line',
      encode: {
        x: 'item',
        y: 'score',
        color: 'type',
        key: 'type',
      },
      style: {
        lineWidth: 2,
      },
    },
  ],
};

export default function G2ChartComponent_component_tooltip_tooltip_marker() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        g2ChartInstance.current.options(options);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-marker.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/tooltip/demo/tooltip-marker.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-marker.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hollow Marker</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/tooltip/demo/tooltip-marker.ts
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
