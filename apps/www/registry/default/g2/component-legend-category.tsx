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

// Original G2 example path: integration/G2/site/examples/component/legend/demo/category.ts



export default function G2ChartComponent_component_legend_category() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
          insetTop: 30,
        });
        
        
        const logo = [
          [
            '抖音',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*8IXHQLvx9QkAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '快手',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*swueRrrKvbcAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '小米',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*79G3TIt3mBoAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '微信',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*_ELBTJLp0dQAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            'Keep',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JzbKRpFhR14AAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            'Chrome',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xLnYTaZfdh8AAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            'QQ',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*AbGNTpA5JLwAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '优酷',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*UL6lS4jw9lUAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '百度地图',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*I6nrTITAxcoAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '腾讯视频',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zwVvT5OFnuYAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '哔哩哔哩',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*6jkAQayTiMMAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            'Word',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*FbkXT6K6mVEAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            'Excel',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*CKb-R6ZAFpYAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            'PowerPoint',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K7-FT4RYRqIAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '腾讯会议',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xbPXR7snu44AAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '网易云音乐',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*upKlRJ9QB4cAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            'Safari',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*kjDHRbiW734AAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '地图',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tl-2QIB8LKIAAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            'Docker',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*iJ4dS49yrJ4AAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            'VSCode',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*rR6nRInEcz4AAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '百度网盘',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*futaTbIAkG4AAAAAAAAAAAAADmJ7AQ/original',
          ],
          [
            '印象笔记',
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Skh1S4BfL9oAAAAAAAAAAAAADmJ7AQ/original',
          ],
        ];
        
        g2ChartInstance.current
          .interval()
          .data(logo)
          .encode('x', (d) => d[0])
          .encode('y', () => Math.random())
          .encode('color', (d) => d[1])
          .scale('y', { nice: true })
          .legend({
            color: {
              itemMarker: (_, index) => () => {
                const { document } = g2ChartInstance.current.getContext().canvas;
                const image = document.createElement('image', {
                  style: {
                    width: 20,
                    height: 20,
                    transform: `translate(-10, -10)`,
                    src: logo[index][1],
                  },
                });
                return image;
              },
              itemMarkerSize: 40,
              itemLabelText: (_, index) => logo[index][0],
              maxRows: 1,
            },
          })
          .tooltip(false);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/legend/demo/category.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/legend/demo/category.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/legend/demo/category.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Category Legend</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/legend/demo/category.ts
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
