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

// Original G2 example path: integration/G2/site/examples/general/rose/demo/donut-rose.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { year: '2001', population: 41.8 },
  { year: '2002', population: 38 },
  { year: '2003', population: 33.7 },
  { year: '2004', population: 30.7 },
  { year: '2005', population: 25.8 },
  { year: '2006', population: 31.7 },
  { year: '2007', population: 33 },
  { year: '2008', population: 46 },
  { year: '2009', population: 38.3 },
  { year: '2010', population: 28 },
  { year: '2011', population: 42.5 },
  { year: '2012', population: 30.3 },
];

export default function G2ChartComponent_general_rose_donut_rose() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          width: 720,
          height: 720,
        });
        
        
        g2ChartInstance.current.coordinate({ type: 'polar', innerRadius: 0.2 });
        
        chart
          .interval()
          .data(data)
          .encode('x', 'year')
          .encode('y', 'population')
          .encode('color', 'year')
          .scale('x', { padding: 0 })
        
          .axis(false)
          .tooltip({
            title: (d) => d.year,
            items: [
              (d, i, data, column) => ({
                name: d.year,
                value: d.population,
                channel: 'y',
              }),
            ],
          })
          .legend({
            color: {
              position: 'right',
              layout: {
                justifyContent: 'center',
              },
            },
          })
          .state('active', { stroke: 'black', lineWidth: 1, zIndex: 101 })
          .state('inactive', { opacity: 0.5, zIndex: 100 })
          .style({
            lineWidth: 1,
            stroke: '#fff',
          });
        
        g2ChartInstance.current.interaction('elementHighlight', true);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/rose/demo/donut-rose.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/rose/demo/donut-rose.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/rose/demo/donut-rose.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>General Rose DonutRose</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/rose/demo/donut-rose.ts
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
