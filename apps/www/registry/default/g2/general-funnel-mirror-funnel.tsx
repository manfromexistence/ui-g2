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

// Original G2 example path: integration/G2/site/examples/general/funnel/demo/mirror-funnel.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { action: '访问', visitor: 500, site: '站点1' },
  { action: '浏览', visitor: 400, site: '站点1' },
  { action: '交互', visitor: 300, site: '站点1' },
  { action: '下单', visitor: 200, site: '站点1' },
  { action: '完成', visitor: 100, site: '站点1' },
  { action: '访问', visitor: 550, site: '站点2' },
  { action: '浏览', visitor: 420, site: '站点2' },
  { action: '交互', visitor: 280, site: '站点2' },
  { action: '下单', visitor: 150, site: '站点2' },
  { action: '完成', visitor: 80, site: '站点2' },
];

export default function G2ChartComponent_general_funnel_mirror_funnel() {
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
        
        
        chartRef.current.data(data);
        
        chartRef.current.scale('x', { padding: 0 });
        chartRef.current.scale('color', {
          range: ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'],
        });
        chartRef.current.axis(false);
        
        chartRef.current.coordinate({
          transform: [{ type: 'transpose' }],
        });
        
        chart
          .interval()
          .data({
            transform: [
              {
                type: 'filter',
                callback: (d) => d.site === '站点1',
              },
            ],
          })
          .encode('x', 'action')
          .encode('y', 'visitor')
          .encode('color', 'action')
          .encode('shape', 'funnel')
          .label({
            text: 'visitor',
            position: 'inside',
            transform: [{ type: 'contrastReverse' }],
          })
          .label({
            text: 'action',
            position: 'right',
            dx: (d) => {
              return d.action === '完成' ? 48 : 16;
            },
          })
          .style('stroke', '#FFF')
          .animate('enter', { type: 'fadeIn' });
        
        chart
          .interval()
          .data({
            transform: [
              {
                type: 'filter',
                callback: (d) => d.site === '站点2',
              },
            ],
          })
          .encode('x', 'action')
          .encode('y', (d) => -d.visitor)
          .encode('color', 'action')
          .encode('shape', 'funnel')
          .label({
            text: 'visitor',
            position: 'inside',
            transform: [{ type: 'contrastReverse' }],
          })
          .style('stroke', '#FFF')
          .animate('enter', { type: 'fadeIn' });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/funnel/demo/mirror-funnel.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/funnel/demo/mirror-funnel.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/funnel/demo/mirror-funnel.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Mirror Funnel</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/funnel/demo/mirror-funnel.ts
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
