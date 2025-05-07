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

// Original G2 example path: integration/G2/site/examples/graph/hierarchy/demo/treemap.ts



export default function G2ChartComponent_graph_hierarchy_treemap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          height: 900,
          width: 1100,
        });
        
        
        chart
          .treemap()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/flare-treemap.json',
          })
          .layout({
            path: (d) => d.name.replace(/\./g, '/'),
            tile: 'treemapBinary',
            paddingInner: 1,
          })
          .encode('value', 'size')
          .scale('color', { range: schemeTableau10 })
          .style(
            'labelText',
            (d) =>
              d.data.name
                .split('.')
                .pop()
                .split(/(?=[A-Z][a-z])/g)[0],
          )
          .style('labelFill', '#000')
          .style('labelPosition', 'top-left')
          .style('fillOpacity', 0.5);
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/graph/hierarchy/demo/treemap.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/graph/hierarchy/demo/treemap.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/graph/hierarchy/demo/treemap.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Treemap</CardTitle>
        <CardDescription>
          G2 Chart. Original example: graph/hierarchy/demo/treemap.ts
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
