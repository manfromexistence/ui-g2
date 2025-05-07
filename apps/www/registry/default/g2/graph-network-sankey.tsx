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

// Original G2 example path: integration/G2/site/examples/graph/network/demo/sankey.ts



export default function G2ChartComponent_graph_network_sankey() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 900,
          height: 600,
        });
        
        
        g2ChartInstance.current
          .sankey()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/energy.json',
            transform: [
              {
                type: 'custom',
                callback: (data) => ({ links: data }),
              },
            ],
          })
          .layout({
            nodeAlign: 'center',
            nodePadding: 0.03,
          })
          .scale('color', { range: schemeTableau10 })
          .style('labelSpacing', 3)
          .style('labelFontWeight', 'bold')
          .style('nodeLineWidth', 1.2)
          .style('linkFillOpacity', 0.4);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/graph/network/demo/sankey.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/graph/network/demo/sankey.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/graph/network/demo/sankey.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sankey</CardTitle>
        <CardDescription>
          G2 Chart. Original example: graph/network/demo/sankey.ts
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
