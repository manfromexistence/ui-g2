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

// Original G2 example path: integration/G2/site/examples/component/legend/demo/item-style.ts



export default function G2ChartComponent_component_legend_item_style() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({ container: chartRef.current, height: 350 });
        
        const shapeList = ['bowtie', 'smooth', 'hv', 'rect', 'hollowPoint'];
        const data = [
          { genre: 'Sports', sold: 50 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ];
        chartRef.current.options({
          type: 'interval',
          data,
          encode: { x: 'genre', y: 'sold', color: 'genre' },
          legend: {
            color: {
              size: 100,
              itemWidth: 120,
              // itemMarker
              itemMarker: (d, index) => shapeList[index],
              // itemLabel
              itemLabelFill: 'red',
              // itemValue
              itemValueText: (d, index) => data[index]['sold'],
              // itemBackground
              itemBackgroundFill: (d) => d.color,
              itemBackgroundFillOpacity: 0.2,
            },
          },
        });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/legend/demo/item-style.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/legend/demo/item-style.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/legend/demo/item-style.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Legend Item Style</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/legend/demo/item-style.ts
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
