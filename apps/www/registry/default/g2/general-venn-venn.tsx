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

// Original G2 example path: integration/G2/site/examples/general/venn/demo/venn.ts



export default function G2ChartComponent_general_venn_venn() {
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
        
        
        g2ChartInstance.current
          .path()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/lastfm.json',
            transform: [
              {
                type: 'venn',
                padding: 8,
                sets: 'sets',
                size: 'size',
                as: ['key', 'path'],
              },
            ],
          })
          .encode('d', 'path')
          .encode('color', 'key')
          .label({
            position: 'inside',
            text: (d) => d.label || '',
            transform: [{ type: 'contrastReverse' }],
          })
          .style('opacity', (d) => (d.sets.length > 1 ? 0.001 : 0.5))
          .state('inactive', { opacity: 0.2 })
          .state('active', { opacity: 0.8 })
          .interaction('elementHighlight', true)
          .legend(false);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/venn/demo/venn.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/venn/demo/venn.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/venn/demo/venn.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Venn Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/venn/demo/venn.ts
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
