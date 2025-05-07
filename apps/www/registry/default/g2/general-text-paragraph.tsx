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

// Original G2 example path: integration/G2/site/examples/general/text/demo/paragraph.ts



export default function G2ChartComponent_general_text_paragraph() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 640,
          height: 480,
        });
        
        
        g2ChartInstance.current.data(paragraph);
        
        chart
          .text()
          .encode('x', 'idx')
          .encode('y', 1)
          .encode('text', 'idx')
          .scale('x', { type: 'band' })
          .scale('y', { domain: [0, 1] })
          .style('wordWrap', true)
          .style('wordWrapWidth', 160)
          .style('dx', -75)
          .style('dy', 0)
          .style('textAlign', 'left')
          .style('textBaseline', 'top')
          .style('fontSize', 12)
          .style('background', true)
          .style('backgroundFill', '#416180')
          .style('backgroundFillOpacity', 0.05)
          .style('backgroundRadius', 3)
          .style('backgroundPadding', [2, 4])
          .axis(false)
          .legend(false);
        
        chart
          .text()
          .encode('x', 'idx')
          .encode('y', 1)
          .encode('text', 'text')
          .encode('color', 'text')
          .scale('x', { type: 'band' })
          .scale('y', { domain: [0, 1] })
          .style('wordWrap', true)
          .style('wordWrapWidth', 160)
          .style('dx', -80)
          .style('dy', 25)
          .style('textAlign', 'left')
          .style('textBaseline', 'top')
          .style('fontSize', 10)
          .style('lineWidth', 0)
          .axis(false)
          .legend(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/text/demo/paragraph.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/text/demo/paragraph.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/text/demo/paragraph.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Paragraph</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/text/demo/paragraph.ts
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
