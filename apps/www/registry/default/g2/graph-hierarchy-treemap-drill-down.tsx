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

// Original G2 example path: integration/G2/site/examples/graph/hierarchy/demo/treemap-drill-down.ts



export default function G2ChartComponent_graph_hierarchy_treemap_drill_down() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 600,
          height: 400,
        });
        
        
        const data = {
          name: '商品',
          children: [
            {
              name: '文具',
              children: [
                {
                  name: '笔',
                  children: [
                    { name: '铅笔', value: 430 },
                    { name: '圆珠笔', value: 530 },
                    { name: '钢笔', value: 80 },
                    { name: '水彩', value: 130 },
                  ],
                },
                { name: '铅笔盒', value: 30 },
                { name: '直尺', value: 60 },
                { name: '笔记本', value: 160 },
                { name: '其他', value: 80 },
              ],
            },
            {
              name: '零食',
              children: [
                { name: '饼干', value: 280 },
                { name: '辣条', value: 150 },
                { name: '牛奶糖', value: 210 },
                { name: '泡泡糖', value: 80 },
                {
                  name: '饮品',
                  children: [
                    { name: '可乐', value: 122 },
                    { name: '矿泉水', value: 244 },
                    { name: '果汁', value: 49 },
                    { name: '牛奶', value: 82 },
                  ],
                },
                { name: '其他', value: 40 },
              ],
            },
            { name: '其他', value: 450 },
          ],
        };
        
        g2ChartInstance.current
          .treemap()
          .data({
            value: data,
          })
          .layout({
            tile: 'treemapBinary',
            paddingInner: 5,
          })
          .encode('value', 'value')
          .interaction({
            treemapDrillDown: {
              breadCrumbY: 12,
              activeFill: '#873bf4',
            },
          })
          .style({
            labelFill: '#000',
            labelStroke: '#fff',
            labelLineWidth: 1.5,
            labelFontSize: 14,
            labelPosition: 'top-left',
            labelDx: 5,
            labelDy: 5,
          });
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/graph/hierarchy/demo/treemap-drill-down.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/graph/hierarchy/demo/treemap-drill-down.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/graph/hierarchy/demo/treemap-drill-down.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Treemap DrillDown</CardTitle>
        <CardDescription>
          G2 Chart. Original example: graph/hierarchy/demo/treemap-drill-down.ts
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
