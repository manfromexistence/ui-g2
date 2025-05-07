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

// Original G2 example path: integration/G2/site/examples/interaction/multi-view/demo/focus-context.ts



export default function G2ChartComponent_interaction_multi_view_focus_context() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          height: 360,
          paddingLeft: 60,
        });
        
        
        g2ChartInstance.current
          .area()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
          })
          .encode('x', 'date')
          .encode('y', 'close')
          .animate(false)
          .axis('x', { grid: false, title: false, tickCount: 5 })
          .axis('y', { grid: false, tickCount: 5 })
          .interaction('tooltip', false)
          .interaction('brushXFilter', true);
        
        g2ChartInstance.current.render();
        
        // Render context View.
        const context = new Chart({
          container: 'context',
          paddingTop: 0,
          paddingBottom: 0,
          height: 90,
          paddingLeft: 60,
        });
        
        context
          .area()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
          })
          .encode('x', 'date')
          .encode('y', 'close')
          .animate(false)
          .axis(false)
          .interaction('tooltip', false)
          .interaction('brushXHighlight', {
            series: true,
            maskOpacity: 0.3,
            maskFill: '#777',
            maskHandleWRender: createPathRender((x, y, width, height) => ({
              d: 'M-0.5,31.5c-2.5,0,-4.5,2,-4.5,4.5v30c0,2.5,2,4.5,4.5,4.5V31.5z',
              transform: `translate(${x + width / 2}, ${y - height / 2})`,
            })),
            maskHandleERender: createPathRender((x, y, width, height) => ({
              d: 'M0.5,31.5c2.5,0,4.5,2,4.5,4.5v30c0,2.5,-2,4.5,-4.5,4.5V31.5z',
              transform: `translate(${x + width / 2}, ${y - height / 2})`,
            })),
            maskHandleEFill: '#D3D8E0',
            maskHandleWFill: '#D3D8E0',
          });
        
        context.render();
        
        function createPathRender(compute) {
          return (group, options, document) => {
            if (!group.handle) {
              const path = document.createElement('path');
              group.handle = path;
              group.appendChild(group.handle);
            }
            const { handle } = group;
            const { x, y, width, height, ...rest } = options;
            if (width === undefined || height === undefined) return handle;
            handle.attr({ ...compute(x, y, width, height), ...rest });
            return handle;
          };
        }
        
        // Add event listeners  to communicate.
        g2ChartInstance.current.on('brush:filter', (e) => {
          const { nativeEvent } = e;
          if (!nativeEvent) return;
          const { selection } = e.data;
          const { x: scaleX } = g2ChartInstance.current.getScale();
          const [[x1, x2]] = selection;
          const domainX = scaleX.getOptions().domain;
          if (x1 === domainX[0] && x2 === domainX[1]) {
            context.emit('brush:remove', {});
          } else {
            context.emit('brush:highlight', { data: { selection } });
          }
        });
        
        context.on('brush:highlight', (e) => {
          const { nativeEvent, data } = e;
          if (!nativeEvent) return;
          const { selection } = data;
          g2ChartInstance.current.emit('brush:filter', { data: { selection } });
        });
        
        context.on('brush:remove', (e) => {
          const { nativeEvent } = e;
          if (!nativeEvent) return;
          const { x: scaleX, y: scaleY } = context.getScale();
          const selection = [scaleX.getOptions().domain, scaleY.getOptions().domain];
          g2ChartInstance.current.emit('brush:filter', { data: { selection } });
        });
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/interaction/multi-view/demo/focus-context.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/interaction/multi-view/demo/focus-context.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/interaction/multi-view/demo/focus-context.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Focus and Context</CardTitle>
        <CardDescription>
          G2 Chart. Original example: interaction/multi-view/demo/focus-context.ts
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
