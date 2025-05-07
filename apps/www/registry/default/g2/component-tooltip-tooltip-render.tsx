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

// Original G2 example path: integration/G2/site/examples/component/tooltip/demo/tooltip-render.ts



export default function G2ChartComponent_component_tooltip_tooltip_render() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
        });
        
        
        chart
          .interval()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
          })
          .transform([{ type: 'sortX', by: 'y', reverse: true }])
          .encode('x', 'letter')
          .encode('y', 'frequency');
        
        chartRef.current.interaction('tooltip', {
          render: (event, { title, items }) => `
          <div
            style="
              width: 300px;
              background: #f2f2f2;
              border-radius: 10px;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 10px;
              margin: -12px;
            "
          >
            <h2
              style="
                margin-bottom: 9px; 
                font-size: 18px; 
                line-height: 30px; 
                font-weight: 500px"
            >
              Letter: ${title}
            </h2>
            ${items
              .map(
                (item) =>
                  `<div style="font-size: 16px; color: #666">name: ${item.name}
                  <br/>
                  value: 
                  <div style="width:${
                    item.value * 1000
                  }px;height:10px;display:inline-block;background:${item.color}"></div>
                  ${item.value}
                </div>`,
              )
              .join('')}
          </div>
          `,
        });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-render.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/tooltip/demo/tooltip-render.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/tooltip/demo/tooltip-render.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Custom Tooltip Rendering</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/tooltip/demo/tooltip-render.ts
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
