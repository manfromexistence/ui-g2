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

// Original G2 example path: integration/G2/site/examples/unit/unit/demo/share-data.ts



export default function G2ChartComponent_unit_unit_share_data() {
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
        
        
        const facetRect = chart
          .facetRect()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/titanic.json',
            transform: [
              {
                type: 'sortBy',
                fields: ['survived'],
              },
              {
                type: 'map',
                callback: ({ survived, ...d }) => ({
                  ...d,
                  survived: survived + '',
                }),
              },
            ],
          })
          .encode('x', 'pclass')
          .attr('shareData', true);
        
        facetRect
          .point()
          .transform({ type: 'pack' })
          .legend('color', { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') })
          .encode('color', 'survived')
          .encode('shape', 'point')
          .encode('size', 3)
          .tooltip({
            title: '',
            items: ['pclass', 'survived'],
          });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/unit/unit/demo/share-data.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/unit/unit/demo/share-data.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/unit/unit/demo/share-data.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Share Data</CardTitle>
        <CardDescription>
          G2 Chart. Original example: unit/unit/demo/share-data.ts
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
