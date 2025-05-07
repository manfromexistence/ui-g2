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

// Original G2 example path: integration/G2/site/examples/component/tooltip/demo/tooltip-two.ts

// Helper code extracted from original (review and adapt if necessary):
function css(...styles) {
  return styles
    .map((obj) =>
      Object.entries(obj)
        .map(([k, v]) => k + ':' + v)
        .join(';'),
    )
    .join(';');

export default function G2ChartComponent_component_tooltip_tooltip_two() {
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
        
        
        chart.data([
          { time: '16', north: 0, south: 0 },
          { time: '18', north: 7, south: -8 },
          { time: '20', north: 6, south: -7 },
          { time: '22', north: 9, south: -8 },
          { time: '00', north: 5, south: -7 },
          { time: '02', north: 8, south: -5 },
          { time: '04', north: 6, south: -7 },
          { time: '06', north: 7, south: -8 },
          { time: '08', north: 9, south: -9 },
          { time: '10', north: 6, south: -9 },
          { time: '12', north: 5, south: -9 },
        ]);
        
        chartRef.current
          .area()
          .encode('x', (d) => d.time)
          .encode('y', 'north')
          .encode('color', () => 'north')
          .encode('shape', 'smooth');
        
        chartRef.current
          .area()
          .encode('x', (d) => d.time)
          .encode('y', 'south')
          .encode('color', () => 'south')
          .encode('shape', 'smooth');
        
        chart.interaction('tooltip', {
          css: {
            '.g2-tooltip': {
              background: 'transparent',
              'box-shadow': 'none',
            },
          },
          render: (event, { title, items }) => {
            const containerStyle = () => ({
              background: '#fff',
              'border-radius': '4px',
              padding: '12px',
              'box-shadow': '0 6px 12px 0 rgba(0, 0, 0, 0.12)',
            });
        
            const itemStyle = (color) => ({
              display: 'inline-block',
              width: '8px',
              height: '8px',
              background: color,
              'border-radius': '50%',
            });
        
            return `
               <div>
                  <div style="${css(containerStyle(), { 'margin-bottom': '20px' })}">
                    <span>${title}</span>
                    </br>
                    <span style="${css(itemStyle(items[0].color))}"></span>
                    <span>${items[0].name}</span>
                    <span style="float:right">${items[0].value}</span>
                  </div>
                  <div style="${css(containerStyle())}">
                    <span>${title}</span>
                    </br>
                    <span style=${css(itemStyle(items[1].color))}></span>
                    <span>${items[1].name}</span>
                    <span style="float:right">${items[1].value}</span>
                  </div>
              </div>
            `;
          },
        });
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-two.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/tooltip/demo/tooltip-two.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-two.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Two Tooltip</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/tooltip/demo/tooltip-two.ts
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
