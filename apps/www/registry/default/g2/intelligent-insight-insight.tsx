// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';
import { Insight } from '@antv/g2-extension-ava';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/intelligent/insight/demo/insight.ts



export default function G2ChartComponent_intelligent_insight_insight() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        g2ChartInstance.current.options({
          children: [
            {
              type: 'line',
              data: {
                type: 'fetch',
                value:
                  'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
              },
              encode: {
                x: 'date',
                y: 'close',
              },
            },
            // insight mark
            {
              type: Insight,
              data: {
                type: 'fetch',
                value:
                  'https://gw.alipayobjects.com/os/bmw-prod/551d80c6-a6be-4f3c-a82a-abd739e12977.csv',
              },
              // Specify to add marks of type 'trend'
              insightType: 'trend',
              // If the value of dimensions or measures is not specified, it will be obtained from the encode information by default.
              dimensions: [{ fieldName: 'date' }],
              measures: [{ fieldName: 'close', method: 'SUM' }],
              options: {
                // Filter out not significant insights
                filterInsight: true,
                // Verify whether the input meets the algorithm requirements
                dataValidation: true,
                // Adjust the significance test threshold
                algorithmParameter: {
                  // Parameter for trend mark
                  trend: {
                    threshold: 0.05,
                  },
                },
                // Generate Chinese spec
                visualizationOptions: {
                  lang: 'zh-CN',
                },
              },
            },
          ],
        });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/intelligent/insight/demo/insight.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/intelligent/insight/demo/insight.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/intelligent/insight/demo/insight.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Detailed Parameters of Insight Mark</CardTitle>
        <CardDescription>
          G2 Chart. Original example: intelligent/insight/demo/insight.ts
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
