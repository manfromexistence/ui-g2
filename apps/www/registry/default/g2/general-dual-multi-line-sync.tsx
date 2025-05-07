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

// Original G2 example path: integration/G2/site/examples/general/dual/demo/multi-line-sync.ts

// Helper code extracted from original (review and adapt if necessary):
function syncTicksOfDomainsFromZero(scales) {
  scales.forEach((scale) => scale.update({ nice: true }));

const data = [
  {
    Month: 'Jan',
    Evaporation: 2,
    Precipitation: 2.6,
    Temperature: 2,
  },
  {
    Month: 'Feb',
    Evaporation: 4.9,
    Precipitation: 5.9,
    Temperature: 2.2,
  },
  {
    Month: 'Mar',
    Evaporation: 7,
    Precipitation: 9,
    Temperature: 3.3,
  },
  {
    Month: 'Apr',
    Evaporation: 23.2,
    Precipitation: 26.4,
    Temperature: 4.5,
  },
  {
    Month: 'May',
    Evaporation: 25.6,
    Precipitation: 28.7,
    Temperature: 6.3,
  },
  {
    Month: 'Jun',
    Evaporation: 76.7,
    Precipitation: 70.7,
    Temperature: 10.2,
  },
  {
    Month: 'Jul',
    Evaporation: 135.6,
    Precipitation: 175.6,
    Temperature: 20.3,
  },
  {
    Month: 'Aug',
    Evaporation: 162.2,
    Precipitation: 182.2,
    Temperature: 23.4,
  },
  {
    Month: 'Sep',
    Evaporation: 32.6,
    Precipitation: 48.7,
    Temperature: 23,
  },
  {
    Month: 'Oct',
    Evaporation: 20,
    Precipitation: 18.8,
    Temperature: 16.5,
  },
  {
    Month: 'Nov',
    Evaporation: 6.4,
    Precipitation: 6,
    Temperature: 12,
  },
  {
    Month: 'Dec',
    Evaporation: 3.3,
    Precipitation: 2.3,
    Temperature: 6.2,
  },
];

export default function G2ChartComponent_general_dual_multi_line_sync() {
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
        
        
        chartRef.current.data(data);
        
        chart
          .line()
          .encode('x', 'Month')
          .encode('y', 'Temperature')
          .encode('color', '#EE6666')
          .encode('shape', 'smooth')
          .scale('y', {
            independent: true,
            groupTransform: syncTicksOfDomainsFromZero,
          })
          .axis('y', {
            title: 'Temperature (°C)',
            grid: null,
            titleFill: '#EE6666',
          });
        
        chart
          .interval()
          .encode('x', 'Month')
          .encode('y', 'Evaporation')
          .encode('color', '#5470C6')
          .scale('y', { independent: true })
          .style('fillOpacity', 0.8)
          .axis('y', {
            position: 'right',
            title: 'Evaporation (ml)',
            titleFill: '#5470C6',
          });
        
        chart
          .line()
          .encode('x', 'Month')
          .encode('y', 'Precipitation')
          .encode('color', '#91CC75')
          .scale('y', { independent: true })
          .style('lineWidth', 2)
          .style('lineDash', [2, 2])
          .axis('y', {
            position: 'right',
            title: 'Precipitation (ml)',
            grid: null,
            titleFill: '#91CC75',
          });
        
        chartRef.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/general/dual/demo/multi-line-sync.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/dual/demo/multi-line-sync.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/general/dual/demo/multi-line-sync.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sync Multi Axis Chart</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/dual/demo/multi-line-sync.ts
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
