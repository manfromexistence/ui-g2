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

// Original G2 example path: integration/G2/site/examples/general/violin/demo/violin-polar.ts



export default function G2ChartComponent_general_violin_violin_polar() {
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
        
        
        g2ChartInstance.current.coordinate({
          type: 'polar',
        });
        
        g2ChartInstance.current.data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/species.json',
        });
        
        g2ChartInstance.current
          .density()
          .data({
            transform: [
              {
                type: 'kde',
                field: 'y',
                groupBy: ['x', 'species'],
              },
            ],
          })
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('series', 'species')
          .encode('color', 'species')
          .encode('size', 'size')
          .tooltip(false);
        
        g2ChartInstance.current
          .boxplot()
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('series', 'species')
          .encode('color', 'species')
          .encode('shape', 'violin')
          .style('opacity', 0.5)
          .style('strokeOpacity', 0.5)
          .style('point', false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/violin/demo/violin-polar.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/violin/demo/violin-polar.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/violin/demo/violin-polar.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Violin in polar</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/violin/demo/violin-polar.ts
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
