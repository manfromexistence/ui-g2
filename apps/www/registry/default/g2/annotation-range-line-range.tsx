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

// Original G2 example path: integration/G2/site/examples/annotation/range/demo/line-range.ts



export default function G2ChartComponent_annotation_range_line_range() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 360,
        });
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current.data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/year-population.json',
        });
        
        g2ChartInstance.current
          .rangeX()
          .data([
            { year: [new Date('1933'), new Date('1945')], event: 'Nazi Rule' },
            { year: [new Date('1948'), new Date('1989')], event: 'GDR (East Germany)' },
          ])
          .encode('x', 'year')
          .encode('color', 'event')
          .scale('color', { independent: true, range: ['#FAAD14', '#30BF78'] })
          .style('fillOpacity', 0.75)
          .tooltip(false);
        
        g2ChartInstance.current
          .line()
          .encode('x', (d) => new Date(d.year))
          .encode('y', 'population')
          .encode('color', '#333');
        
        g2ChartInstance.current
          .point()
          .encode('x', (d) => new Date(d.year))
          .encode('y', 'population')
          .encode('color', '#333')
          .style('lineWidth', 1.5)
          .tooltip(false);
        
        g2ChartInstance.current.interaction('legendFilter', false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/range/demo/line-range.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/range/demo/line-range.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/range/demo/line-range.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line, Range Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/range/demo/line-range.ts
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
