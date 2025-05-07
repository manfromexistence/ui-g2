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

// Original G2 example path: integration/G2/site/examples/annotation/connector/demo/interval-connector.ts



export default function G2ChartComponent_annotation_connector_interval_connector() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          insetTop: 30,
        });
        
        
        g2ChartInstance.current
          .data([
            { x: 'Net Sales', value: 5085000, start: 0, end: 5085000 },
            { x: 'Cost of Sales', value: -1250450, start: 5085000, end: 3834550 },
            { x: 'Operating Expenses', value: -2350050, start: 3834550, end: 1484500 },
            { x: 'Other Income', value: 750000, start: 1484500, end: 2234500 },
            { x: 'Extraordinary Gain', value: -230050, start: 2234500, end: 2004450 },
            { x: 'Interest Expense', value: -500000, start: 2004450, end: 1504450 },
            { x: 'Taxes', value: 490000, start: 1504450, end: 1994450 },
            { x: 'Net Income', isTotal: true, value: 1994450, start: 0, end: 1994450 },
          ])
          .axis('x', { title: false, labelTransform: 'rotate(-90)' })
          .axis('y', { labelFormatter: '~s' })
          .legend(null);
        
        g2ChartInstance.current
          .link()
          .data({ transform: [{ type: 'custom', callback: linkData }] })
          .encode('x', ['x1', 'x2'])
          .encode('y', 'value')
          .style('stroke', '#697474')
          .style('lineDash', [4, 2])
          .tooltip(false);
        
        g2ChartInstance.current
          .connector()
          .data({ transform: [{ type: 'custom', callback: connectorData }] })
          .encode('x', ['x1', 'x2'])
          .encode('y', ['y1', 'y2'])
          .label({
            text: (d) => `${d.y2 - d.y1}`,
            formatter: '~s',
            fontSize: 10,
            dy: 2,
          })
          .style({ stroke: '#697474', offset: 16 })
          .tooltip(false);
        
        g2ChartInstance.current
          .interval()
          .encode('x', 'x')
          .encode('y', ['start', 'end'])
          .encode('color', (d, idx) =>
            idx === 0 || d.isTotal ? 'D' : d.value > 0 ? 'P' : 'N',
          )
          .scale('color', {
            domain: ['P', 'N', 'D'],
            range: ['#64b5f6', '#ef6c00', '#96a6a6'],
          })
          .encode('size', 24)
          .style('stroke', '#697474')
          .label({
            text: 'value',
            formatter: '~s',
            position: (d) => (d.value > 0 ? 'top' : 'bottom'),
            textBaseline: (d) => (d.value > 0 ? 'bottom' : 'top'),
            fontSize: 10,
            dy: (d) => (d.value > 0 ? -4 : 4),
          })
          .tooltip({ channel: 'y', valueFormatter: '~s' })
          .tooltip({ channel: 'y1', valueFormatter: '~s' });
        
        g2ChartInstance.current.render();
        
        // Process data.
        function linkData(data) {
          return data.reduce((r, d, idx) => {
            if (idx > 0) {
              return r.concat({
                x1: data[idx - 1].x,
                x2: d.x,
                value: d.isTotal ? d.end : d.start,
              });
            }
            return r;
          }, []);
        }
        
        function connectorData(data) {
          return [
            {
              x1: data[0].x,
              y1: data[0].end,
              x2: data[data.length - 1].x,
              y2: data[data.length - 1].end,
            },
          ];
        }
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/annotation/connector/demo/interval-connector.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/annotation/connector/demo/interval-connector.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/annotation/connector/demo/interval-connector.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Annotation Connector IntervalConnector</CardTitle>
        <CardDescription>
          G2 Chart. Original example: annotation/connector/demo/interval-connector.ts
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
