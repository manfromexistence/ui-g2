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

// Original G2 example path: integration/G2/site/examples/graph/hierarchy/demo/tree.ts



export default function G2ChartComponent_graph_hierarchy_tree() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          height: 1500,
          width: 800,
          insetRight: 80,
          insetLeft: 15,
        });
        
        
        chartRef.current.coordinate({ transform: [{ type: 'transpose' }] });
        
        chart
          .tree()
          .data({
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/flare.json',
          })
          .layout({
            sortBy: (a, b) => a.value - b.value,
          })
          .style('nodeFill', (d) => (d.height === 0 ? '#999' : '#000'))
          .style('linkStroke', '#999')
          .style('labelText', (d) => d.data.name || '-')
          .style('labelFontSize', (d) => (d.height === 0 ? 7 : 12))
          .style('labelTextAlign', (d) => (d.height === 0 ? 'start' : 'end'))
          .style('labelPosition', (d) => (d.height !== 0 ? 'left' : 'right'))
          .style('labelDx', (d) => (d.height === 0 ? 5 : -5))
          .style('labelBackground', true)
          .style('labelBackgroundFill', '#fff');
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/graph/hierarchy/demo/tree.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/graph/hierarchy/demo/tree.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/graph/hierarchy/demo/tree.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tree</CardTitle>
        <CardDescription>
          G2 Chart. Original example: graph/hierarchy/demo/tree.ts
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
