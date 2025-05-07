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

// Original G2 example path: integration/G2/site/examples/component/tooltip/demo/tooltip-style.ts



export default function G2ChartComponent_component_tooltip_tooltip_style() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        chart
          .interval()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
            format: 'csv',
          })
          .transform({ type: 'sortX', by: 'y', reverse: true, slice: 6 })
          .transform({ type: 'dodgeX' })
          .encode('x', 'state')
          .encode('y', 'population')
          .encode('color', 'age')
          .scale('y', { nice: true })
          .axis('y', { labelFormatter: '~s' })
          .interaction('tooltip', {
            shared: true,
            css: {
              '.g2-tooltip': {
                background: '#eee',
                'border-radius': ' 0.25em !important',
              },
              '.g2-tooltip-title': {
                'font-size': '20px',
                'font-weight': 'bold',
                'padding-bottom': '0.25em',
              },
              '.g2-tooltip-list-item': {
                background: '#ccc',
                padding: '0.25em',
                margin: '0.25em',
                'border-radius': '0.25em',
              },
              '.g2-tooltip-list-item-name-label': {
                'font-weight': 'bold',
                'font-size': '16px',
              },
              'g2-tooltip-list-item-marker': {
                'border-radius': '0.25em',
                width: '15px',
                height: '15px',
              },
              '.g2-tooltip-list-item-value': {
                'font-weight': 'bold',
                'font-size': '16px',
              },
            },
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-style.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/tooltip/demo/tooltip-style.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-style.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Custom style</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/tooltip/demo/tooltip-style.ts
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
