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

// Original G2 example path: integration/G2/site/examples/style/pattern/demo/custom-pattern-with-g-api.ts



export default function G2ChartComponent_style_pattern_custom_pattern_with_g_api() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 550,
          height: 500,
          paddingBottom: 80,
        });
        
        
        // create pattern with G API
        const createPattern = (
          document,
          color,
          stroke,
          cross = false,
          density = false,
        ) => {
          const spacing = density ? 3 : 5;
          const width = Math.abs(spacing / Math.sin(Math.PI / 4));
          const height = spacing / Math.sin(Math.PI / 4);
        
          const background = document.createElement('rect', {
            style: {
              width,
              height,
              fill: color,
            },
          });
        
          const line = document.createElement('path', {
            style: {
              d: `
                 M 0 ${-height} L ${width * 2} ${height}
                 M ${-width} ${-height} L ${width} ${height}
                 M ${-width} 0 L ${width} ${height * 2}`,
              stroke,
              lineWidth: 1,
              strokeOpacity: 0.9,
            },
          });
          background.appendChild(line);
        
          if (cross) {
            const crossLine = document.createElement('path', {
              style: {
                d: `
                   M ${-width} ${height} L ${width} ${-height}
                   M ${-width} ${height * 2} L ${width * 2} ${-height}
                   M 0 ${height * 2} L ${width * 2} 0`,
                stroke,
                lineWidth: 1,
                strokeOpacity: 0.9,
              },
            });
            background.appendChild(crossLine);
          }
        
          return background;
        };
        // create patterns before g2ChartInstance.current gets rendered
        let pattern1;
        let pattern2;
        let pattern3;
        chart.on('beforerender', () => {
          const { document } = chart.getContext().canvas;
          pattern1 = createPattern(document, '#edaa53', '#44120c', true, true);
          pattern2 = createPattern(document, '#edaa53', '#44120c', true);
          pattern3 = createPattern(document, '#edaa53', '#fff');
        });
        
        g2ChartInstance.current
          .cell()
          .data({
            type: 'fetch',
            value:
              'https://gw.alipayobjects.com/os/bmw-prod/68d3f380-089e-4683-ab9e-4493200198f9.json',
          })
          .encode('x', 'name')
          .encode('y', 'country')
          .encode('color', '#edaa53')
          .style('radius', Infinity)
          .style('inset', 1)
          .style('shadowBlur', 10)
          .style('shadowColor', 'rgba(0,0,0,0.3)')
          .style('fill', ({ value }) => {
            return {
              image:
                60 <= value && value < 90
                  ? pattern1
                  : value >= 50
                  ? pattern2
                  : pattern3,
              repetition: 'repeat',
            };
          })
          .animate('enter', { type: 'fadeIn' });
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/style/pattern/demo/custom-pattern-with-g-api.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/style/pattern/demo/custom-pattern-with-g-api.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/style/pattern/demo/custom-pattern-with-g-api.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Custom Pattern with G API</CardTitle>
        <CardDescription>
          G2 Chart. Original example: style/pattern/demo/custom-pattern-with-g-api.ts
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
