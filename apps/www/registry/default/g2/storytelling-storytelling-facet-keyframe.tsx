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

// Original G2 example path: integration/G2/site/examples/storytelling/storytelling/demo/facet-keyframe.ts



export default function G2ChartComponent_storytelling_storytelling_facet_keyframe() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
              container: chartRef.current,
              width: 800,
            });
        
            const padding = (node) =>
              node.attr('paddingRight', 120).attr('paddingLeft', 70);
        
            const encode = (node) =>
              node
                .encode('shape', 'smooth')
                .encode('x', (d) => new Date(d.date))
                .encode('y', 'unemployed')
                .encode('color', 'industry')
                .encode('key', 'industry');
        
            const utcX = (node) => node.scale('x', { utc: true });
        
            const keyframe = chart
              .timingKeyframe()
              .attr('direction', 'alternate')
              .attr('iterationCount', 2);
        
            keyframe
              .facetRect()
              .call(padding)
              .attr('paddingBottom', 60)
              .data(data)
              .encode('y', 'industry')
              .area()
              .attr('class', 'area')
              .attr('frame', false)
              .call(encode)
              .call(utcX)
              .scale('y', { facet: false })
              .style('fillOpacity', 1)
              .animate('enter', { type: 'scaleInY' });
        
            keyframe
              .area()
              .call(padding)
              .data(data)
              .attr('class', 'area')
              .transform({ type: 'stackY', reverse: true })
              .call(encode)
              .call(utcX)
              .style('fillOpacity', 1);
        
            keyframe
              .area()
              .call(padding)
              .data(data)
              .attr('class', 'area')
              .call(encode)
              .call(utcX)
              .style('fillOpacity', 0.8);
        
            chartRef.current.render();
          });
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/storytelling/storytelling/demo/facet-keyframe.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/storytelling/storytelling/demo/facet-keyframe.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/storytelling/storytelling/demo/facet-keyframe.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Facet Keyframe</CardTitle>
        <CardDescription>
          G2 Chart. Original example: storytelling/storytelling/demo/facet-keyframe.ts
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
