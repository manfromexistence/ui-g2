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

// Original G2 example path: integration/G2/site/examples/storytelling/storytelling/demo/point-keyframe.ts



export default function G2ChartComponent_storytelling_storytelling_point_keyframe() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
              container: chartRef.current,
            });
        
        
            const keyframe = g2ChartInstance.current
              .timingKeyframe()
              .attr('direction', 'alternate')
              .attr('iterationCount', 4);
        
            keyframe
              .interval()
              .data(data)
              .transform({ type: 'groupX', y: 'mean' })
              .encode('x', 'gender')
              .encode('y', 'weight')
              .encode('color', 'gender')
              .encode('key', 'gender');
        
            keyframe
              .point()
              .data(data)
              .encode('x', 'height')
              .encode('y', 'weight')
              .encode('color', 'gender')
              .encode('groupKey', 'gender')
              .encode('shape', 'point');
        
            g2ChartInstance.current.render();
          });
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/storytelling/storytelling/demo/point-keyframe.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/storytelling/storytelling/demo/point-keyframe.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/storytelling/storytelling/demo/point-keyframe.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Point Keyframe</CardTitle>
        <CardDescription>
          G2 Chart. Original example: storytelling/storytelling/demo/point-keyframe.ts
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
