// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { lines } from '@antv/g-pattern';
import { plotlib } from '@antv/g2-extension-plot';
import { Runtime, corelib, extend } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/general/sunburst/demo/sunburst-pattern.ts

// Helper code extracted from original (review and adapt if necessary):
const Chart = extend(Runtime, { ...corelib(), ...plotlib() });



const colors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];

export default function G2ChartComponent_general_sunburst_sunburst_pattern() {
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
        
        
        chart
          .sunburst()
          .data({
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/sunburst.json',
          })
          .encode('value', 'sum')
          .style({
            fill: (_, idx) => {
              return {
                image: lines({
                  backgroundColor: colors[idx % colors.length],
                  backgroundOpacity: 0.65,
                  stroke: colors[idx % colors.length],
                  lineWidth: 4,
                  spacing: 5,
                }),
                repetition: 'repeat',
                transform: 'rotate(30deg)',
              };
            },
          });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/sunburst/demo/sunburst-pattern.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/sunburst/demo/sunburst-pattern.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/sunburst/demo/sunburst-pattern.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sunburst Pattern Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/sunburst/demo/sunburst-pattern.ts
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
