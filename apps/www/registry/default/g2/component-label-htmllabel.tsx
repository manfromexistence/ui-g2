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

// Original G2 example path: integration/G2/site/examples/component/label/demo/htmlLabel.ts



export default function G2ChartComponent_component_label_htmllabel() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        const data = [
          { repo: 'G', star: 918 },
          { repo: 'G2', star: 11688 },
          { repo: 'G6', star: 10045 },
          { repo: 'L7', star: 3125 },
          { repo: 'F2', star: 7820 },
          { repo: 'S2', star: 1231 },
          { repo: 'X6', star: 4755 },
        ];
        
        chart
          .interval()
          .data(data)
          .encode('x', 'repo')
          .encode('y', 'star')
          .encode('color', 'repo')
          .label({
            text: 'star',
            render: (text, datum) => {
              return `
                <div style="left:-50%;top:-20px;position:relative;font-size:14px;">
                  <span>${datum.repo}</span>
                  :
                  <a href="https://github.com/antvis/${datum.repo}" target="_blank">${datum.star}</a>
                </div>
              `;
            },
          })
          .legend(false);
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/label/demo/htmlLabel.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/label/demo/htmlLabel.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/label/demo/htmlLabel.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>HTML Label</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/label/demo/htmlLabel.ts
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
