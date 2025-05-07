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

// Original G2 example path: integration/G2/site/examples/component/axis/demo/axis.ts



export default function G2ChartComponent_component_axis_axis() {
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
        
        
        chart.data([
          {
            pos: 1,
            no: 1,
            driver: 'Max Verstappen',
            car: 'RED BULL RACING HONDA RBPT',
            laps: 57,
            time: '1:33:56.736',
            pts: 25,
          },
          {
            pos: 2,
            no: 11,
            driver: 'Sergio Perez',
            car: 'RED BULL RACING HONDA RBPT',
            laps: 57,
            time: '+11.987s',
            pts: 18,
          },
          {
            pos: 3,
            no: 14,
            driver: 'Fernando Alonso',
            car: 'ASTON MARTIN ARAMCO MERCEDES',
            laps: 57,
            time: '+38.637s',
            pts: 15,
          },
          {
            pos: 4,
            no: 55,
            driver: 'Carlos Sainz',
            car: 'FERRARI',
            laps: 57,
            time: '+48.052s',
            pts: 12,
          },
          {
            pos: 5,
            no: 44,
            driver: 'Lewis Hamilton',
            car: 'MERCEDES',
            laps: 57,
            time: '+50.977s',
            pts: 10,
          },
        ]);
        
        function medal(ranking) {
          if (ranking > 2) return `第${ranking + 1}名`;
          const { document } = chart.getContext().canvas!;
          const group = document.createElement('g', {});
          const size = ranking === 0 ? 20 : 15;
          const icon = document.createElement('image', {
            style: {
              src: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1NiMRKb2sfMAAAAAAAAAAAAADmJ7AQ/original',
              width: size,
              height: size,
              transform: `translate(-${size / 2}, -${size / 2})`,
            },
          });
          const text = ['冠军🏆', '亚军🥈', '季军🥉'][ranking];
          const label = document.createElement('text', {
            style: {
              text,
              fill: 'gray',
              textAlign: 'center',
              transform: `translate(0, 35)`,
            },
          });
        
          group.appendChild(icon);
          group.appendChild(label);
          return group;
        }
        
        g2ChartInstance.current
          .interval()
          .encode('x', 'pos')
          .encode('y', 'pts')
          .encode('color', 'pts')
          .axis({
            x: {
              title: 'FORMULA 1 GULF AIR BAHRAIN GRAND PRIX 2023 - RACE RESULT',
              size: 80,
              labelFormatter: (datum, index) => medal(index),
            },
            y: false,
          })
          .label({
            text: 'driver',
            transform: [{ type: 'contrastReverse' }],
          })
          .label({
            text: 'time',
            transform: [{ type: 'contrastReverse' }],
            dy: 20,
            fontStyle: 'italic',
          })
          .tooltip({ title: 'car' })
          .legend(false);
        
        chart.render();
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/axis/demo/axis.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/axis/demo/axis.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/axis/demo/axis.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Axis</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/axis/demo/axis.ts
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
