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

// Original G2 example path: integration/G2/site/examples/general/interval/demo/bar-stacked-diverging-rounded.ts



export default function G2ChartComponent_general_interval_bar_stacked_diverging_rounded() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          paddingLeft: 25,
        });
        
        
        g2ChartInstance.current
          .interval()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/nivo-gain-lost.json',
            transform: [
              {
                type: 'fold',
                fields: [
                  'lost > 100$',
                  'lost <= 100$',
                  'gained <= 100$',
                  'gained > 100$',
                ],
              },
            ],
          })
          .transform([{ type: 'stackY' }])
          .encode('x', 'user')
          .encode('y', 'value')
          .encode('color', 'key')
          .scale('x', { padding: 0.2 })
          .scale('y', { domainMin: -100, domainMax: 100 })
          .scale('color', {
            domain: ['lost > 100$', 'lost <= 100$', 'gained <= 100$', 'gained > 100$'],
            range: ['#97e3d5', '#61cdbb', '#e25c3b', '#f47560'],
          })
          .legend('color', { title: false })
          .label({
            text: 'value',
            position: 'inside',
            formatter: (v) => (v ? `${v}%` : ''),
            transform: [{ type: 'overlapDodgeY' }],
            fill: '#000',
            fontSize: 10,
          })
          .axis('y', {
            position: 'right',
            title: false,
            labelFormatter: (v) => `${v}%`,
          })
          .style('radius', 10);
        
        g2ChartInstance.current
          .lineY()
          .data([0])
          .style('lineWidth', 2)
          .style('stroke', '#e25c3b')
          .style('strokeOpacity', 1);
        
        chart.call(titleLeft, '75%', 'lost', '#61cdbb');
        chart.call(titleLeft, '20%', 'gain', '#e25c3b');
        
        function titleLeft(node, y, text, fill) {
          node
            .text()
            .style('x', -10)
            .style('y', y)
            .style('text', text)
            .style('fontWeight', 'bold')
            .style('dy', -10)
            .style('transform', 'rotate(-90)')
            .style('fill', fill);
        }
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/interval/demo/bar-stacked-diverging-rounded.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/interval/demo/bar-stacked-diverging-rounded.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/interval/demo/bar-stacked-diverging-rounded.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Rounded Diverging Stacked Bar Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/interval/demo/bar-stacked-diverging-rounded.ts
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
