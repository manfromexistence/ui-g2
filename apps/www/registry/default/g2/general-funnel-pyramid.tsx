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

// Original G2 example path: integration/G2/site/examples/general/funnel/demo/pyramid.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { action: '浏览网站', pv: 50000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8000 },
];

export default function G2ChartComponent_general_funnel_pyramid() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          paddingRight: 80,
        });
        
        
        g2ChartInstance.current.coordinate({
          transform: [{ type: 'transpose' }],
        });
        
        g2ChartInstance.current.data({
          type: 'inline',
          value: data,
          transform: [
            {
              type: 'custom',
              callback: (data) => data.map((d) => ({ ...d, rate: d.pv / data[0].pv })),
            },
          ],
        });
        
        g2ChartInstance.current
          .interval()
          .encode('x', 'action')
          .encode('y', 'pv')
          .encode('color', 'action')
          .encode('shape', 'pyramid')
          .transform({ type: 'symmetryY' })
          .scale('x', { padding: 0 })
          .animate('enter', { type: 'fadeIn' })
          .label({
            text: (d) => `${d.action} ${d.pv}`,
            textAlign: 'left',
          })
          .label({
            text: (d) => `${(d.rate * 100).toFixed(1)}%`,
            position: 'inside',
            transform: [{ type: 'contrastReverse' }],
          })
          .legend('color', { position: 'bottom' })
          .axis(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/funnel/demo/pyramid.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/funnel/demo/pyramid.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/funnel/demo/pyramid.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pyramid</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/funnel/demo/pyramid.ts
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
