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

// Original G2 example path: integration/G2/site/examples/interaction/data/demo/area-element-point-move.ts



export default function G2ChartComponent_interaction_data_area_element_point_move() {
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
        
        
        chartRef.current
          .area()
          .data([
            { year: '1991', value: 3, type: 'type1' },
            { year: '1992', value: 4, type: 'type1' },
            { year: '1993', value: 3.5, type: 'type1' },
            { year: '1994', value: 5, type: 'type1' },
            { year: '1995', value: 4.9, type: 'type1' },
            { year: '1996', value: 2, type: 'type1' },
            { year: '1997', value: 7, type: 'type1' },
            { year: '1998', value: 11, type: 'type1' },
            { year: '1999', value: 13, type: 'type1' },
            { year: '1991', value: 6, type: 'type2' },
            { year: '1992', value: 1, type: 'type2' },
            { year: '1993', value: 4, type: 'type2' },
            { year: '1994', value: 9, type: 'type2' },
            { year: '1995', value: 1.9, type: 'type2' },
            { year: '1996', value: 5, type: 'type2' },
            { year: '1997', value: 4, type: 'type2' },
            { year: '1998', value: 6, type: 'type2' },
            { year: '1999', value: 15, type: 'type2' },
          ])
          .interaction({
            legendFilter: false,
            elementPointMove: {
              selection: [1, 4],
            },
          })
          .encode('x', 'year')
          .encode('y', 'value')
          .encode('key', 'type')
          .encode('color', 'type');
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/interaction/data/demo/area-element-point-move.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/interaction/data/demo/area-element-point-move.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/interaction/data/demo/area-element-point-move.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Area Numerical Interaction</CardTitle>
        <CardDescription>
          G2 Chart. Original example: interaction/data/demo/area-element-point-move.ts
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
