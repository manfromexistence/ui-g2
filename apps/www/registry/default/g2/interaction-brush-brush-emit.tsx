// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart, MASK_CLASS_NAME } from '@antv/g2';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/interaction/brush/demo/brush-emit.ts

// Helper code extracted from original (review and adapt if necessary):
const data = [
  { date: '2007-04-23', close: 93.24 },
  { date: '2007-04-24', close: 95.35 },
  { date: '2007-04-25', close: 98.84 },
  { date: '2007-04-26', close: 99.92 },
  { date: '2007-04-29', close: 99.8 },
  { date: '2007-05-01', close: 99.47 },
  { date: '2007-05-02', close: 100.39 },
  { date: '2007-05-03', close: 100.4 },
  { date: '2007-05-04', close: 100.81 },
  { date: '2007-05-07', close: 103.92 },
];


function onStart() {
  chart.emit('tooltip:disable');

function onUpdate(e) {
  const { canvas } = chart.getContext();

function onRemove(e) {
  const { nativeEvent } = e;

function useTip({ container, onRemove = () => {}, offsetX = 20, offsetY = 0 }) {
  let div;



export default function G2ChartComponent_interaction_brush_brush_emit() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        const [render, remove] = useTip({
          container: document.getElementById('container'),
          onRemove: () => g2ChartInstance.current.emit('brush:remove', {}),
        });
        
        const data = [
          { date: '2007-04-23', close: 93.24 },
          { date: '2007-04-24', close: 95.35 },
          { date: '2007-04-25', close: 98.84 },
          { date: '2007-04-26', close: 99.92 },
          { date: '2007-04-29', close: 99.8 },
          { date: '2007-05-01', close: 99.47 },
          { date: '2007-05-02', close: 100.39 },
          { date: '2007-05-03', close: 100.4 },
          { date: '2007-05-04', close: 100.81 },
          { date: '2007-05-07', close: 103.92 },
        ];
        
        chart
          .line()
          .data(data)
          .encode('x', (d) => new Date(d.date))
          .encode('y', 'close')
          .scale('y', { nice: true })
          .interaction('brushXHighlight', true);
        
        g2ChartInstance.current.on('brush:start', onStart);
        g2ChartInstance.current.on('brush:end', onUpdate);
        g2ChartInstance.current.on('brush:remove', onRemove);
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/interaction/brush/demo/brush-emit.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/interaction/brush/demo/brush-emit.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/interaction/brush/demo/brush-emit.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Brush</CardTitle>
        <CardDescription>
          G2 Chart. Original example: interaction/brush/demo/brush-emit.ts
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
