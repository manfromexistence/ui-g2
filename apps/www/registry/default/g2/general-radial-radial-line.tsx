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

// Original G2 example path: integration/G2/site/examples/general/radial/demo/radial-line.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { term: 'Zombieland', count: 9 },
  { term: 'Wieners', count: 8 },
  { term: 'Toy Story', count: 8 },
  { term: 'trashkannon', count: 7 },
  { term: 'the GROWLERS', count: 6 },
  { term: 'mudweiser', count: 6 },
  { term: 'ThunderCats', count: 4 },
  { term: 'The Taqwacores - Motion Picture', count: 4 },
  { term: 'The Shawshank Redemption', count: 2 },
  { term: 'The Olivia Experiment', count: 1 },
];

export default function G2ChartComponent_general_radial_radial_line() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          padding: 50,
        });
        
        
        chartRef.current
          .data(data)
          .coordinate({ type: 'radial', innerRadius: 0.2, endAngle: Math.PI });
        
        chartRef.current
          .interval()
          .encode('x', 'term')
          .encode('y', 'count')
          .encode('size', 5)
          .axis({
            y: false,
            x: {
              title: false,
            },
          });
        
        chartRef.current
          .point()
          .encode('x', 'term')
          .encode('y', 'count')
          .encode('shape', 'point')
          .encode('size', 4)
          .tooltip({
            title: (item) => item.term,
            items: [
              (item) => ({
                name: 'count',
                value: item.count,
              }),
            ],
          });
        
        chartRef.current
          .text()
          .style('text', 'Music')
          .style('x', '50%')
          .style('y', '50%')
          .style('textAlign', 'center')
          .style('fontSize', 24);
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/radial/demo/radial-line.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radial/demo/radial-line.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/radial/demo/radial-line.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Radial bar chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radial/demo/radial-line.ts
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
