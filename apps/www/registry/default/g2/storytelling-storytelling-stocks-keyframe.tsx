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

// Original G2 example path: integration/G2/site/examples/storytelling/storytelling/demo/stocks-keyframe.ts



export default function G2ChartComponent_storytelling_storytelling_stocks_keyframe() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({ container: chartRef.current });
        
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        
        
            g2ChartInstance.current.options({
              type: 'timingKeyframe',
              width: 800,
              children: keyframes.map((plot) => {
                const { children, ...options } = plot(data);
                return {
                  theme: 'dark',
                  paddingLeft: 40,
                  paddingBottom: 50,
                  paddingRight: 50,
                  ...options,
                  ...(children && {
                    children: children.map((d) => ({ ...d, theme: 'dark' })),
                  }),
                };
              }),
            });
        
            g2ChartInstance.current.render();
          });
        
        function facetLine(data) {
          return {
            type: 'facetRect',
            data,
            encode: { y: 'symbol' },
            axis: { y: { title: false } },
            children: [
              {
                type: 'line',
                key: 'line',
                encode: {
                  x: (d) => new Date(d.date),
                  y: 'price',
                  color: 'symbol',
                  key: 'symbol',
                },
                frame: false,
                scale: { y: { zero: true, tickCount: 3 } },
                axis: { x: { title: false }, y: { title: false } },
                animate: { enter: { type: 'pathIn' } },
                style: { shape: 'smooth' },
              },
            ],
          };
        }
        
        function facetArea(data) {
          return {
            type: 'facetRect',
            data,
            encode: { y: 'symbol' },
            axis: { y: { title: false } },
            children: [
              {
                type: 'line',
                key: 'line',
                frame: false,
                encode: {
                  x: (d) => new Date(d.date),
                  y: 'price',
                  color: 'symbol',
                  key: 'symbol',
                },
                style: { shape: 'smooth' },
                axis: { x: { title: false }, y: { title: false } },
                scale: { y: { zero: true, facet: false, tickCount: 3 } },
              },
              {
                type: 'area',
                key: 'area',
                class: 'area',
                frame: false,
                encode: {
                  x: (d) => new Date(d.date),
                  y: 'price',
                  color: 'symbol',
                  key: 'symbol',
                },
                style: { shape: 'smooth' },
                scale: { y: { facet: false, zero: true, tickCount: 3 } },
                axis: { x: { title: false }, y: { title: false } },
                animate: { exit: { type: 'fadeOut' } },
              },
            ],
          };
        }
        
        function stackArea(data) {
          return {
            type: 'area',
            data,
            key: 'area',
            class: 'area',
            transform: [{ type: 'stackY', reverse: true }],
            axis: { y: { title: false } },
            encode: {
              x: (d) => new Date(d.date),
              y: 'price',
              color: 'symbol',
              key: 'symbol',
            },
            style: { shape: 'smooth' },
          };
        }
        
        function layerArea(data) {
          return {
            type: 'area',
            key: 'area',
            class: 'area',
            data,
            axis: { y: { title: false } },
            encode: {
              x: (d) => new Date(d.date),
              y: 'price',
              color: 'symbol',
              key: 'symbol',
            },
            style: { fillOpacity: 0.5, shape: 'smooth' },
          };
        }
        
        function streamgraph(data) {
          return {
            type: 'area',
            key: 'area',
            class: 'area',
            data,
            axis: { y: { title: false } },
            transform: [{ type: 'stackY', reverse: true }, { type: 'symmetryY' }],
            encode: {
              x: (d) => new Date(d.date),
              y: 'price',
              color: 'symbol',
              key: 'symbol',
            },
            style: { fillOpacity: 1, shape: 'smooth' },
          };
        }
        
        function normalizeArea(data) {
          return {
            type: 'area',
            key: 'area',
            class: 'area',
            data,
            axis: { y: { title: false } },
            transform: [{ type: 'stackY', reverse: true }, { type: 'normalizeY' }],
            encode: {
              x: (d) => new Date(d.date),
              y: 'price',
              color: 'symbol',
              key: 'symbol',
            },
            style: { fillOpacity: 1, shape: 'smooth' },
          };
        }
        
        function normalizeBar(data) {
          return {
            type: 'interval',
            data,
            encode: {
              y: 'price',
              color: 'symbol',
              key: 'symbol',
            },
            transform: [
              { type: 'groupColor', y: 'sum' },
              { type: 'stackY', reverse: true },
              { type: 'normalizeY' },
            ],
            scale: { x: { padding: 0 } },
            axis: { y: { title: false }, x: { title: false } },
          };
        }
        
        function groupBar(data) {
          return {
            type: 'interval',
            data,
            transform: [{ type: 'dodgeX' }],
            encode: {
              x: 'date',
              y: 'price',
              color: 'symbol',
              groupKey: 'symbol',
              key: (_, i) => i,
            },
            scale: { y: { nice: true } },
            axis: { x: false, y: { title: false } },
          };
        }
        
        function stackBar(data) {
          return {
            type: 'interval',
            data,
            transform: [{ type: 'stackY' }],
            encode: {
              x: 'date',
              y: 'price',
              color: 'symbol',
              groupKey: 'symbol',
              key: (_, i) => i,
            },
            axis: { x: false, y: { title: false } },
          };
        }
        
        function bar(data) {
          return {
            type: 'interval',
            data,
            transform: [{ type: 'groupX', y: 'sum' }],
            encode: {
              x: 'symbol',
              y: 'price',
              color: 'symbol',
              key: 'symbol',
            },
            axis: {
              y: { labelFormatter: '~s', title: false },
              x: { title: false },
            },
          };
        }
        
        function pie(data) {
          return {
            type: 'interval',
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            data,
            transform: [{ type: 'groupX', y: 'sum' }, { type: 'stackY' }],
            coordinate: { type: 'theta' },
            encode: {
              y: 'price',
              color: 'symbol',
              key: 'symbol',
            },
            legend: { color: { layout: { justifyContent: 'center' } } },
            style: { radius: 10 },
          };
        }
        
        function rose(data) {
          return {
            type: 'interval',
            data,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            transform: [{ type: 'groupX', y: 'sum' }],
            coordinate: { type: 'polar' },
            encode: {
              x: 'symbol',
              y: 'price',
              color: 'symbol',
              key: 'symbol',
            },
            scale: { x: { padding: 0 } },
            style: { radius: 10 },
            legend: { color: { layout: { justifyContent: 'center' } } },
            axis: { y: false },
          };
        }
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/storytelling/storytelling/demo/stocks-keyframe.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/storytelling/storytelling/demo/stocks-keyframe.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/storytelling/storytelling/demo/stocks-keyframe.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Composite Keyframe</CardTitle>
        <CardDescription>
          G2 Chart. Original example: storytelling/storytelling/demo/stocks-keyframe.ts
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
