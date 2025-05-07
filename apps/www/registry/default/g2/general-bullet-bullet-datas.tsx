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

// Original G2 example path: integration/G2/site/examples/general/bullet/demo/bullet-datas.ts



export default function G2ChartComponent_general_bullet_bullet_datas() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        const colors = {
          ranges: ['#bfeec8', '#FFe0b0', '#FFbcb8'],
          measures: ['#61DDAA', '#5B8FF9'],
          target: '#39a3f4',
        };
        
        const data = [
          {
            title: '满意度',
            ranges: 100,
            measures: 60,
            target: 90,
          },
          {
            title: '满意度',
            ranges: 80,
            measures: 10,
          },
          {
            title: '满意度',
            ranges: 30,
          },
        ];
        
        g2ChartInstance.current.coordinate({ transform: [{ type: 'transpose' }] });
        
        chart
          .data(data)
          .scale('color', {
            range: [colors['ranges'], colors['measures'], colors['target']].flat(),
          })
          .legend('color', {
            itemMarker: (d) => {
              return d === '目标' ? 'line' : 'square';
            },
          });
        
        chart
          .interval()
          .axis({
            y: {
              grid: true,
              gridLineWidth: 2,
            },
            x: {
              title: false,
            },
          })
          .encode('x', 'title')
          .encode('y', 'ranges')
          .encode('color', (d, i) => ['优', '良', '差'][i])
          .style('maxWidth', 30);
        
        chart
          .interval()
          .encode('x', 'title')
          .encode('y', 'measures')
          .encode('color', (d, i) => ['下半年', '上半年'][i] || '下半年')
          .style('maxWidth', 20)
          .label({
            text: 'measures',
            position: 'right',
            textAlign: 'left',
            dx: 5,
          });
        
        chart
          .point()
          .encode('x', 'title')
          .encode('y', 'target')
          .encode('shape', 'line')
          .encode('color', () => '目标')
          .encode('size', 8)
          .style('lineWidth', 1)
          .tooltip({
            title: false,
            items: [{ channel: 'y' }],
          });
        
        g2ChartInstance.current.interaction('tooltip', { shared: true });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/bullet/demo/bullet-datas.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/bullet/demo/bullet-datas.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/bullet/demo/bullet-datas.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bullet more data</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/bullet/demo/bullet-datas.ts
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
