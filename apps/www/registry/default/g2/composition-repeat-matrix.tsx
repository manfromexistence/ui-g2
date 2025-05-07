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

// Original G2 example path: integration/G2/site/examples/composition/repeat/demo/matrix.ts

// Helper code extracted from original (review and adapt if necessary):
const toNaN = (d) => (d === 'NaN' ? NaN : d);

export default function G2ChartComponent_composition_repeat_matrix() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          width: 800,
          height: 800,
          paddingLeft: 70,
          paddingBottom: 70,
        });
        
        
        const repeatMatrix = chartRef.current
          .repeatMatrix()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/penguins.json',
            transform: [
              {
                type: 'map',
                callback: ({
                  culmen_depth_mm: cdepth,
                  culmen_length_mm: clength,
                  flipper_length_mm: flength,
                  body_mass_g: bmass,
                  ...d
                }) => ({
                  ...d,
                  culmen_depth_mm: toNaN(cdepth),
                  culmen_length_mm: toNaN(clength),
                  flipper_length_mm: toNaN(flength),
                  body_mass_g: toNaN(bmass),
                }),
              },
            ],
          })
          .encode('position', [
            'culmen_length_mm',
            'culmen_depth_mm',
            'flipper_length_mm',
            'body_mass_g',
          ]);
        
        repeatMatrix.point().encode('color', 'species');
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/composition/repeat/demo/matrix.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/composition/repeat/demo/matrix.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/composition/repeat/demo/matrix.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Repeat Matrix</CardTitle>
        <CardDescription>
          G2 Chart. Original example: composition/repeat/demo/matrix.ts
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
