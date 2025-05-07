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

// Original G2 example path: integration/G2/site/examples/analysis/regression/demo/polynomial-regression.ts



export default function G2ChartComponent_analysis_regression_polynomial_regression() {
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
        
        
        const dataPolynomial = [
          { x: 0, y: 140 },
          { x: 1, y: 149 },
          { x: 2, y: 159.6 },
          { x: 3, y: 159 },
          { x: 4, y: 155.9 },
          { x: 5, y: 169 },
          { x: 6, y: 162.9 },
          { x: 7, y: 169 },
          { x: 8, y: 180 },
        ];
        
        g2ChartInstance.current.data(dataPolynomial);
        
        chart
          .point()
          .encode('x', 'x')
          .encode('y', 'y')
          .encode('shape', 'point')
          .style('fillOpacity', 0.75)
          .axis('x', { title: false })
          .axis('y', { title: false });
        
        const polyRegression = regressionPoly()
          .x((d) => d.x)
          .y((d) => d.y);
        
        chart
          .line()
          .data({
            transform: [
              {
                type: 'custom',
                callback: polyRegression,
              },
            ],
          })
          .encode('x', (d) => d[0])
          .encode('y', (d) => d[1])
          .encode('shape', 'smooth')
          .style('stroke', '#30BF78')
          .style('lineWidth', 2)
          .label({
            text: 'y=0.24x^3 + −3.00x^2 + 13.45x + 139.77\nThe coefficient of determination, or R^2, is 0.92',
            selector: 'last',
            textAlign: 'end',
            dx: -8,
          })
          .tooltip(null);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/analysis/regression/demo/polynomial-regression.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/analysis/regression/demo/polynomial-regression.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/analysis/regression/demo/polynomial-regression.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Polynomial Regression</CardTitle>
        <CardDescription>
          G2 Chart. Original example: analysis/regression/demo/polynomial-regression.ts
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
