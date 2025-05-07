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

// Original G2 example path: integration/G2/site/examples/analysis/regression/demo/logarithmic-regression.ts



export default function G2ChartComponent_analysis_regression_logarithmic_regression() {
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
        
        
        g2ChartInstance.current.data({
          type: 'fetch',
          value: 'https://assets.antv.antgroup.com/g2/logarithmic-regression.json',
        });
        
        g2ChartInstance.current
          .point()
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('shape', 'point')
          .scale('x', { domain: [0, 35] })
          .style('fillOpacity', 0.75)
          .axis('x', { title: false })
          .axis('y', { title: false });
        
        const logRegression = regressionLog()
          .x((d) => d.x)
          .y((d) => d.y)
          .domain([0.81, 35]);
        
        g2ChartInstance.current
          .line()
          .data({
            transform: [
              {
                type: 'custom',
                callback: logRegression,
              },
            ],
          })
          .encode('x', (d) => d[0])
          .encode('y', (d) => d[1])
          .encode('shape', 'smooth')
          .style('stroke', '#30BF78')
          .style('lineWidth', 2)
          .label({
            text: 'y = 0.881·ln(x) + 4.173\nThe coefficient of determination, or R^22, is 0.958',
            selector: 'last',
            textAlign: 'end',
          })
          .tooltip(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/analysis/regression/demo/logarithmic-regression.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/analysis/regression/demo/logarithmic-regression.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/analysis/regression/demo/logarithmic-regression.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Logarithmic Regression</CardTitle>
        <CardDescription>
          G2 Chart. Original example: analysis/regression/demo/logarithmic-regression.ts
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
