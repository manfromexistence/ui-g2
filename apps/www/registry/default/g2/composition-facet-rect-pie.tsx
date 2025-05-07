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

// Original G2 example path: integration/G2/site/examples/composition/facet/demo/rect-pie.ts



export default function G2ChartComponent_composition_facet_rect_pie() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          width: 800,
        });
        
        
        const days = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
        const mockData = () => {
          const names = ['Eat', 'Play', 'Sleep'];
          const week = (date) => {
            const currentDate = date.getDate();
            const newDate = new Date(date);
            const firstDay = new Date(newDate.setDate(1)).getDay();
            return Math.ceil((currentDate + firstDay) / 7);
          };
          const day = (date) => date.getDay();
          return Array.from({ length: 30 }, (_, i) => {
            const date = new Date(2022, 5, i + 1);
            return names.map((name) => ({
              activity: name,
              value: Math.random(),
              week: `${week(date)}`,
              day: days[day(date)],
            }));
          }).flat(Infinity);
        };
        
        const facetRect = chart
          .facetRect()
          .data(mockData())
          .encode('x', 'day')
          .encode('y', 'week')
          .scale('x', { domain: days })
          .legend('color', { position: 'right', size: 50 })
          .attr('paddingRight', 100);
        
        facetRect
          .view()
          .coordinate({ type: 'theta' })
          .interval()
          .transform({ type: 'stackY' })
          .scale('y', { facet: false })
          .encode('y', 'value')
          .encode('color', 'activity');
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/composition/facet/demo/rect-pie.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/composition/facet/demo/rect-pie.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/composition/facet/demo/rect-pie.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Calendar Pie Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: composition/facet/demo/rect-pie.ts
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
