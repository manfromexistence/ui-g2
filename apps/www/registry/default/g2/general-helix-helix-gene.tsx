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

// Original G2 example path: integration/G2/site/examples/general/helix/demo/helix-gene.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [];


const groups = ['WT', 'KO'];


const hours = 72;


const baseValues = {
  WT: 2.0,
  KO: 2.3,
};

export default function G2ChartComponent_general_helix_helix_gene() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          height: 600,
          padding: [50, 50, 50, 50],
        });
        
        
        chart.data(data);
        
        chart.coordinate({
          type: 'helix',
          startAngle: 0.2 * Math.PI,
          endAngle: 6.5 * Math.PI,
          innerRadius: 0.1,
        });
        
        chartRef.current
          .interval()
          .encode('x', 'time')
          .encode('y', 'group')
          .encode('color', 'logFPKM')
          .scale('color', {
            type: 'linear',
            range: ['#fff', '#ec4839'],
          })
          .tooltip({
            title: 'time',
            items: [
              { field: 'group', name: '组别' },
              {
                field: 'logFPKM',
                name: 'log(FPKM)',
                valueFormatter: (value) => value.toFixed(2),
              },
            ],
          })
          .animate('enter', {
            type: 'fadeIn',
            duration: 1000,
          });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/helix/demo/helix-gene.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/helix/demo/helix-gene.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/helix/demo/helix-gene.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gene helix</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/helix/demo/helix-gene.ts
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
