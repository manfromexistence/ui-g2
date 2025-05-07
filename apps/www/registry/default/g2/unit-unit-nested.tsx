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

// Original G2 example path: integration/G2/site/examples/unit/unit/demo/nested.ts



export default function G2ChartComponent_unit_unit_nested() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          paddingBottom: 60,
          paddingLeft: 85,
        });
        
        
        const facetRect = g2ChartInstance.current
          .facetRect()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/titanic.json',
            transform: [
              {
                type: 'sortBy',
                fields: ['survived', 'sex'],
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
          .encode('y', 'pclass')
          .attr('shareSize', true);
        
        const facetRect2 = facetRect
          .facetRect()
          .encode('x', 'survived')
          .axis('y', false)
          .axis('x', {
            labelFormatter: (d) => (d === '1' ? 'Yes' : 'No'),
            position: 'bottom',
          })
          .attr('shareSize', true);
        
        const facetRect3 = facetRect2
          .facetRect()
          .encode('y', 'sex')
          .attr('shareSize', true)
          .axis('x', false)
          .axis('y', { position: 'left' });
        
        facetRect3
          .point()
          .transform({ type: 'pack' })
          .legend('color', { labelFormatter: (d) => (d === '1' ? 'Yes' : 'No') })
          .encode('color', 'survived')
          .encode('shape', 'point')
          .encode('size', 3)
          .tooltip({
            title: '',
            items: ['pclass', 'survived', 'sex'],
          });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/unit/unit/demo/nested.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/unit/unit/demo/nested.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/unit/unit/demo/nested.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nested</CardTitle>
        <CardDescription>
          G2 Chart. Original example: unit/unit/demo/nested.ts
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
