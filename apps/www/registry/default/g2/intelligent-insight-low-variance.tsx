// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';
import { LowVariance } from '@antv/g2-extension-ava';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/intelligent/insight/demo/low-variance.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  {
    date: '2000',
    fertility: 743.37,
  },
  {
    date: '2001',
    fertility: 729.34,
  },
  {
    date: '2002',
    fertility: 769.12,
  },
  {
    date: '2003',
    fertility: 786.99,
  },
  {
    date: '2004',
    fertility: 791.23,
  },
  {
    date: '2005',
    fertility: 781.99,
  },
  {
    date: '2006',
    fertility: 795.71,
  },
  {
    date: '2007',
    fertility: 789.24,
  },
  {
    date: '2008',
    fertility: 793.51,
  },
  {
    date: '2009',
    fertility: 783.98,
  },
  {
    date: '2010',
    fertility: 782.78,
  },
  {
    date: '2011',
    fertility: 797.05,
  },
  {
    date: '2012',
    fertility: 785.12,
  },
  {
    date: '2013',
    fertility: 798.85,
  },
  {
    date: '2014',
    fertility: 734.49,
  },
  {
    date: '2015',
    fertility: 708.74,
  },
  {
    date: '2016',
    fertility: 730.55,
  },
  {
    date: '2017',
    fertility: 778.53,
  },
  {
    date: '2018',
    fertility: 731.47,
  },
  {
    date: '2019',
    fertility: 791,
  },
  {
    date: '2020',
    fertility: 896.41,
  },
];

export default function G2ChartComponent_intelligent_insight_low_variance() {
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
        
        
        chartRef.current.data(data).encode('x', 'date').encode('y', 'fertility');
        
        chartRef.current.interval();
        
        chartRef.current.mark(LowVariance);
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/intelligent/insight/demo/low-variance.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/intelligent/insight/demo/low-variance.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/intelligent/insight/demo/low-variance.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Low Variance</CardTitle>
        <CardDescription>
          G2 Chart. Original example: intelligent/insight/demo/low-variance.ts
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
