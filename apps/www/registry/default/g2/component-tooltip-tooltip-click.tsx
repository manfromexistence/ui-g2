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

// Original G2 example path: integration/G2/site/examples/component/tooltip/demo/tooltip-click.ts

// Helper code extracted from original (review and adapt if necessary):
function css(...styles) {
  return styles
    .map((obj) =>
      Object.entries(obj)
        .map(([k, v]) => k + ':' + v)
        .join(';'),
    )
    .join(';');

export default function G2ChartComponent_component_tooltip_tooltip_click() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        chart
          .interval()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
          })
          .encode('x', 'letter')
          .encode('y', 'frequency')
          .axis('y', { labelFormatter: '.0%' })
          .interaction('tooltip', {
            disableNative: true, // Disable pointerover and pointerout events.
            bounding: {
              x: -Infinity,
              y: -Infinity,
              width: Infinity,
              height: Infinity,
            },
            css: {
              '.g2-tooltip': {
                background: 'transparent',
                'box-shadow': 'none',
                transform: 'translate(-50%, -100%)',
              },
            },
            offset: [0, -10],
            mount: 'body',
            render: (event, { title, items }) => {
              const plot = chart
                .getContext()
                .canvas.document.getElementsByClassName('plot')[0];
              const plotBounds = plot.getRenderBounds();
              const target = event.target;
              const bounds = target.getRenderBounds();
              const height = bounds.min[1] - plotBounds.min[1];
              return `<div>
                <div style="${css({
                  position: 'relative',
                  background: '#fff',
                  'box-shadow': '0 6px 12px 0 rgba(0, 0, 0, 0.12)',
                  'z-index': 999,
                  padding: '12px',
                  'min-width': '120px',
                })}">
                  <h2
                    style="${css({
                      'margin-bottom': '9px',
                      'font-size': '18px',
                      'line-height': '30px',
                      'font-weight': '500px',
                    })}"
                  >
                    Letter: ${title}
                  </h2>
                  ${items
                    .map(
                      (item) =>
                        `<div style="font-size: 16px; color: #666">
                          <span style="${css({
                            height: '10px',
                            width: '10px',
                            background: item.color,
                            display: 'inline-block',
                            'border-radius': '50%',
                          })}"></span>
                          <span>${item.name}</span>
                          <span>${item.value}</span>
                        </div>`,
                    )
                    .join('')}
                </div>
                <div style="${css({
                  width: '1px',
                  height: height + 'px',
                  background: '#aaa',
                  position: 'absolute',
                  left: '50%',
                  top: '90%',
                  'z-index': 500,
                })}"></div>
              </div>`;
            },
          });
        
        g2ChartInstance.current.on('element:click', ({ data }) =>
          g2ChartInstance.current.emit('tooltip:show', {
            data,
            offsetY: 0,
          }),
        );
        
        g2ChartInstance.current.on('plot:click', () => g2ChartInstance.current.emit('tooltip:hide'));
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-click.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/tooltip/demo/tooltip-click.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-click.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Click Tooltip</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/tooltip/demo/tooltip-click.ts
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
