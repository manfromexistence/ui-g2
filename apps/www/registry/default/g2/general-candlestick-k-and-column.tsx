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

// Original G2 example path: integration/G2/site/examples/general/candlestick/demo/k-and-column.ts



export default function G2ChartComponent_general_candlestick_k_and_column() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          height: 360,
          paddingLeft: 60,
        });
        
        
        KChart.data({
          type: 'fetch',
          value:
            'https://gw.alipayobjects.com/os/antvdemo/assets/data/candle-sticks.json',
        })
          .encode('x', 'time')
          .encode('color', (d) => {
            const trend = Math.sign(d.start - d.end);
            return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
          })
          .scale('x', {
            compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
          })
          .scale('color', {
            domain: ['下跌', '不变', '上涨'],
            range: ['#4daf4a', '#999999', '#e41a1c'],
          });
        
        KChart.link()
          .encode('y', ['min', 'max'])
          .tooltip({
            title: 'time',
            items: [
              { field: 'start', name: '开盘价' },
              { field: 'end', name: '收盘价' },
              { field: 'min', name: '最低价' },
              { field: 'max', name: '最高价' },
            ],
          });
        
        KChart.interval()
          .encode('y', ['start', 'end'])
          .style('fillOpacity', 1)
          .style('stroke', (d) => {
            if (d.start === d.end) return '#999999';
          })
          .axis('x', {
            title: false,
          })
          .axis('y', {
            title: false,
          })
          .tooltip({
            title: 'time',
            items: [
              { field: 'start', name: '开盘价' },
              { field: 'end', name: '收盘价' },
              { field: 'min', name: '最低价' },
              { field: 'max', name: '最高价' },
            ],
          });
        
        const ColumnChart = new Chart({
          container: 'columnChart',
          autoFit: true,
          paddingTop: 0,
          paddingBottom: 0,
          height: 180,
          paddingLeft: 60,
        });
        
        ColumnChart.data({
          type: 'fetch',
          value:
            'https://gw.alipayobjects.com/os/antvdemo/assets/data/candle-sticks.json',
        });
        
        ColumnChart.interval()
          .encode('x', 'time')
          .encode('y', 'volumn')
          .encode('color', (d) => {
            const trend = Math.sign(d.start - d.end);
            return trend > 0 ? '下跌' : trend === 0 ? '不变' : '上涨';
          })
          .scale('x', {
            compare: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
          })
          .scale('color', {
            domain: ['下跌', '不变', '上涨'],
            range: ['#4daf4a', '#999999', '#e41a1c'],
          })
          .axis('x', false)
          .axis('y', {
            title: false,
          });
        
        KChart.on('legend:filter', (e) => {
          const { nativeEvent, data } = e;
          if (!nativeEvent) return;
          ColumnChart.emit('legend:filter', { data });
        });
        
        KChart.on('legend:reset', (e) => {
          const { nativeEvent, data } = e;
          if (!nativeEvent) return;
          ColumnChart.emit('legend:reset', { data });
        });
        
        KChart.render();
        ColumnChart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/candlestick/demo/k-and-column.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/candlestick/demo/k-and-column.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/candlestick/demo/k-and-column.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Candlestick chart and column chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/candlestick/demo/k-and-column.ts
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
