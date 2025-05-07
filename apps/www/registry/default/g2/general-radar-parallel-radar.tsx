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

// Original G2 example path: integration/G2/site/examples/general/radar/demo/parallel-radar.ts

// Helper code extracted from original (review and adapt if necessary):
const axis = {
  zIndex: 1,
  labelStroke: '#fff',
  labelLineWidth: 5,
  labelFontSize: 10,
  labelStrokeLineJoin: 'round',
  titleStroke: '#fff',
  titleFontSize: 10,
  titleLineWidth: 5,
  titleStrokeLineJoin: 'round',
  lineStroke: 'black',
  tickStroke: 'black',
  lineLineWidth: 1,
};

export default function G2ChartComponent_general_radar_parallel_radar() {
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
        
        
        chartRef.current.coordinate({ type: 'radar' });
        
        chart
          .line()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/cars3.json',
          })
          .encode('position', [
            'economy (mpg)',
            'cylinders',
            'displacement (cc)',
            'power (hp)',
            'weight (lb)',
            '0-60 mph (s)',
            'year',
          ])
          .encode('color', 'weight (lb)')
          .style('lineWidth', 1.5)
          .style('strokeOpacity', 0.4)
          .scale('color', {
            palette: 'brBG',
            offset: (t) => 1 - t,
          })
          .legend({
            color: {
              position: 'bottom',
              labelFormatter: '~s',
              length: 200,
              layout: { justifyContent: 'center' },
            },
          })
          .axis('position', axis)
          .axis('position1', axis)
          .axis('position2', axis)
          .axis('position3', axis)
          .axis('position4', axis)
          .axis('position5', axis)
          .axis('position6', axis)
          .axis('position7', axis);
        
        chartRef.current.interaction('tooltip', { series: false });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/radar/demo/parallel-radar.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radar/demo/parallel-radar.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/radar/demo/parallel-radar.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Radar</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radar/demo/parallel-radar.ts
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
