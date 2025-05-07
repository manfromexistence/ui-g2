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

// Original G2 example path: integration/G2/site/examples/storytelling/storytelling/demo/stocks-keyframe.ts



export default function G2ChartComponent_storytelling_storytelling_stocks_keyframe() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({ container: chartRef.current });
        
        
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
