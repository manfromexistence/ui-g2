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

// Original G2 example path: integration/G2/site/examples/general/funnel/demo/funnel-annotation.ts



export default function G2ChartComponent_general_funnel_funnel_annotation() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          paddingRight: 60,
        });
        
        
        g2ChartInstance.current.coordinate({
          transform: [{ type: 'transpose' }],
        });
        
        chart
          .interval()
          .data(data)
          .transform({ type: 'symmetryY' })
          .axis(false)
          .legend(false)
          .encode('x', encodeX)
          .encode('y', encodeY)
          .encode('color', encodeX)
          .encode('shape', 'funnel')
          .scale('x', { paddingOuter: 0, paddingInner: 0 })
          .label({
            text: (d) => `${d[encodeX]} ${d[encodeY]}`,
            position: 'inside',
            fontSize: 20,
          })
          .label({
            text: '',
            // Use div to mock a line.
            render: (d, data, i) =>
              i !== 0
                ? `<div style="height:1px;width:30px;background:#aaa;margin:0 20px;"></div>`
                : '',
            position: 'top-right',
          })
          .label({
            text: (d, i) => (i !== 0 ? '转换率' : ''),
            position: 'top-right',
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#aaa',
            dx: 60,
          })
          .label({
            text: (d, i, data) =>
              i !== 0 ? r(data[i - 1][encodeY], data[i][encodeY]) : '',
            position: 'top-right',
            textAlign: 'left',
            textBaseline: 'middle',
            dx: 60,
            dy: 15,
          });
        
        chart
          .connector()
          .data([
            {
              startX: data[0][encodeX],
              startY: data[data.length - 1][encodeX],
              endX: 0,
              endY: (data[0][encodeY] - data[data.length - 1][encodeY]) / 2,
            },
          ])
          .encode('x', 'startX')
          .encode('x1', 'startY')
          .encode('y', 'endX')
          .encode('y1', 'endY')
          .label({
            text: '转换率',
            position: 'left',
            textAlign: 'start',
            textBaseline: 'middle',
            fill: '#aaa',
            dx: 10,
          })
          .label({
            text: r(data[0][encodeY], data[data.length - 1][encodeY]),
            position: 'left',
            textAlign: 'start',
            dy: 15,
            dx: 10,
            fill: '#000',
          })
          .style('stroke', '#aaa')
          .style('markerEnd', false)
          .style('connectLength1', -12)
          .style('offset2', -20);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/funnel/demo/funnel-annotation.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/funnel/demo/funnel-annotation.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/funnel/demo/funnel-annotation.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Annotation Funnel</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/funnel/demo/funnel-annotation.ts
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
