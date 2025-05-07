// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';
import { ChangePoint } from '@antv/g2-extension-ava';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/intelligent/insight/demo/change-point.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  {
    date: '2000',
    discount_price: 43.37,
  },
  {
    date: '2001',
    discount_price: 29.34,
  },
  {
    date: '2002',
    discount_price: 49.12,
  },
  {
    date: '2003',
    discount_price: 56.99,
  },
  {
    date: '2004',
    discount_price: 61.23,
  },
  {
    date: '2005',
    discount_price: 781.99,
  },
  {
    date: '2006',
    discount_price: 895.71,
  },
  {
    date: '2007',
    discount_price: 789.24,
  },
  {
    date: '2008',
    discount_price: 793.51,
  },
  {
    date: '2009',
    discount_price: 783.98,
  },
  {
    date: '2010',
    discount_price: 782.78,
  },
  {
    date: '2011',
    discount_price: 797.05,
  },
  {
    date: '2012',
    discount_price: 785.12,
  },
  {
    date: '2013',
    discount_price: 798.85,
  },
  {
    date: '2014',
    discount_price: 734.49,
  },
  {
    date: '2015',
    discount_price: 708.74,
  },
  {
    date: '2016',
    discount_price: 730.55,
  },
];

export default function G2ChartComponent_intelligent_insight_change_point() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        chartRef.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        });
        
        
        chart.data(data).encode('x', 'date').encode('y', 'discount_price');
        
        chart.line();
        
        chart.mark(ChangePoint);
        
        chart.render();
        
        // TODO: Ensure 'chartRef.current.render()' is called appropriately.
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/intelligent/insight/demo/change-point.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/intelligent/insight/demo/change-point.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/intelligent/insight/demo/change-point.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Change Point</CardTitle>
        <CardDescription>
          G2 Chart. Original example: intelligent/insight/demo/change-point.ts
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
