// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart , register } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/general/radial/demo/apple-activity.ts



export default function G2ChartComponent_general_radial_apple_activity() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 244,
          height: 244,
        });
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
        g2ChartInstance.current
          .data([
            {
              name: 'activity1',
              percent: 0.6,
              color: '#1ad5de',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/ck11Y6aRrz/shangjiantou.png',
            },
            {
              name: 'activity2',
              percent: 0.2,
              color: '#a0ff03',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/zY2JB7hhrO/shuangjiantou.png',
            },
            {
              name: 'activity3',
              percent: 0.3,
              color: '#e90b3a',
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/%24qBxSxdK05/jiantou.png',
            },
          ])
          .coordinate({ type: 'radial', innerRadius: 0.2 });
        
        g2ChartInstance.current
          .interval()
          .encode('x', 'name')
          .encode('y', 1)
          .encode('size', 52)
          .encode('color', 'color')
          .scale('color', { type: 'identity' })
          .style('fillOpacity', 0.25)
          .animate(false);
        
        g2ChartInstance.current
          .interval()
          .encode('x', 'name')
          .encode('y', 'percent')
          .encode('color', 'color')
          .encode('size', 52)
          .style('radius', 26)
          .style('shadowColor', 'rgba(0,0,0,0.45)')
          .style('shadowBlur', 20)
          .style('shadowOffsetX', -2)
          .style('shadowOffsetY', -5)
          .axis(false)
          .animate('enter', {
            type: 'waveIn',
            easing: 'easing-out-bounce',
            duration: 1000,
          });
        
        g2ChartInstance.current
          .image()
          .encode('x', 'name')
          .encode('y', 0)
          .encode('src', (d) => d.icon)
          .encode('size', 12)
          .style('transform', 'translateX(10)');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/radial/demo/apple-activity.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radial/demo/apple-activity.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/radial/demo/apple-activity.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Apple Activity</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radial/demo/apple-activity.ts
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
