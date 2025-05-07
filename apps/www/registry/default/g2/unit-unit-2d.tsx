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

// Original G2 example path: integration/G2/site/examples/unit/unit/demo/2d.ts



export default function G2ChartComponent_unit_unit_2d() {
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
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        const facetRect = g2ChartInstance.current
          .facetRect()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/titanic2.json',
            transform: [
              {
                type: 'sortBy',
                fields: [['Survived', false]],
              },
            ],
          })
          .encode('x', 'Class')
          .encode('y', 'Sex');
        
        facetRect
          .point()
          .transform({ type: 'pack' })
          .encode('color', 'Survived')
          .encode('shape', 'point')
          .encode('size', 3)
          .tooltip({
            title: '',
            items: ['pclass', 'survived'],
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/unit/unit/demo/2d.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/unit/unit/demo/2d.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/unit/unit/demo/2d.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>2D</CardTitle>
        <CardDescription>
          G2 Chart. Original example: unit/unit/demo/2d.ts
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
