// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart } from '@antv/g2';
import { loadAnimation } from '@antv/g-lottie-player';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/animation/lottie/demo/lottie.ts



export default function G2ChartComponent_animation_lottie_lottie() {
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
        
        
        g2ChartInstance.current
          .interval()
          .data([
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
          ])
          .encode('x', 'genre')
          .encode('y', 'sold')
          .encode('color', 'genre')
          .animate('enter', { type: 'fadeIn', duration: 1000 })
          .animate('exit', { type: 'fadeOut', duration: 2000 });
        
        g2ChartInstance.current.render();
        
        (async () => {
          const { canvas } = g2ChartInstance.current.getContext();
          await canvas.ready;
        
          const lottieJSON = await fetch(
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/file/A*C9f6TaadHikAAAAAAAAAAAAADmJ7AQ',
          ).then((res) => res.json());
          const animation = loadAnimation(lottieJSON, { loop: true, autoplay: true });
          const wrapper = animation.render(canvas);
          wrapper.scale(0.5);
          wrapper.translate(160, 100);
        })();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/animation/lottie/demo/lottie.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/animation/lottie/demo/lottie.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/animation/lottie/demo/lottie.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lottie</CardTitle>
        <CardDescription>
          G2 Chart. Original example: animation/lottie/demo/lottie.ts
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
