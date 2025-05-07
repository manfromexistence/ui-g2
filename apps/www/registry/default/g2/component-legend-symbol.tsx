// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart, register, type SymbolFactor } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/component/legend/demo/symbol.ts

// Helper code extracted from original (review and adapt if necessary):
const customSquare = Object.assign<SymbolFactor, Partial<SymbolFactor>>(
  (x, y, r) => {
    const radius = r / 2;

    return [
      ['M', x + radius, y - r],
      ['L', x - radius, y - r],
      ['A', radius, radius, 0, 0, 0, x - r, y - radius],
      ['L', x - r, y + radius],
      ['A', radius, radius, 0, 0, 0, x - radius, y + r],
      ['L', x + radius, y + r],
      ['A', radius, radius, 0, 0, 0, x + r, y + radius],
      ['L', x + r, y - radius],
      ['A', radius, radius, 0, 0, 0, x + radius, y - r],
      ['Z'],
    ];
  },
  {
    // 空心请设置为 ['stroke', 'lineWidth']
    style: ['fill']
  },
);

register('symbol.customSquare', customSquare);

export default function G2ChartComponent_component_legend_symbol() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        const data = [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ];
        
        const colorField = 'genre';
        
        g2ChartInstance.current
          .interval()
          .data(data)
          .encode('x', 'genre')
          .encode('y', 'sold')
          .encode('color', colorField)
          .legend({
            color: {
              itemMarker: 'customSquare',
            },
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/legend/demo/symbol.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/legend/demo/symbol.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/legend/demo/symbol.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Custom Symbol</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/legend/demo/symbol.ts
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
