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

// Original G2 example path: integration/G2/site/examples/component/legend/demo/custom.ts



export default function G2ChartComponent_component_legend_custom() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        
        
        const data = [
          { genre: 'Sports', sold: 275 },
          { genre: 'Strategy', sold: 115 },
          { genre: 'Action', sold: 120 },
          { genre: 'Shooter', sold: 350 },
          { genre: 'Other', sold: 150 },
        ];
        
        const colorField = 'genre';
        
        g2ChartInstance.current
          .interval()
          .data(data)
          .encode('x', 'genre')
          .encode('y', 'sold')
          .encode('color', colorField)
          .legend(false); // Hide built-in legends.
        
        g2ChartInstance.current.render().then(renderCustomLegend);
        
        function renderCustomLegend(g2ChartInstance.current) {
          // Get color scale.
          const scale = g2ChartInstance.current.getScaleByChannel('color');
          const { domain, range } = scale.getOptions();
          const excludedValues = [];
        
          // Create items from scale domain.
          const items = domain.map((text, i) => {
            const span = document.createElement('span');
            const color = range[i];
        
            // Items' style.
            span.innerText = text;
            span.style.display = 'inline-block';
            span.style.padding = '0.5em';
            span.style.color = color;
            span.style.cursor = 'pointer';
        
            span.onclick = () => {
              const index = excludedValues.findIndex((d) => d === text);
              if (index === -1) {
                excludedValues.push(text);
                span.style.color = '#aaa';
              } else {
                excludedValues.splice(index, 1);
                span.style.color = color;
              }
              onChange(excludedValues);
            };
        
            return span;
          });
        
          // Mount legend items.
          const container = document.getElementById('container');
          const canvas = container.getElementsByTagName('canvas')[0];
          const legend = document.createElement('legend');
          container.insertBefore(legend, canvas);
          for (const item of items) legend.append(item);
        
          // Emit legendFilter event.
          function onChange(values) {
            const selectedValues = domain.filter((d) => !values.includes(d));
            const selectedData = data.filter((d) =>
              selectedValues.includes(d[colorField]),
            );
            g2ChartInstance.current.changeData(selectedData);
          }
        }
        
        // TODO: Ensure 'g2ChartInstance.current.render()' is called appropriately.
        // Original G2 script operations after 'new Chart(...)' did not appear to include a render call for 'chart'.
        // Review original script and adapt necessary logic, including the render call.
        // Original script content after initialization (partial for reference):
        // const data = [
        //   { genre: 'Sports', sold: 275 },
        //   { genre: 'Strategy', sold: 115 },
        //   { genre: 'Action', sold: 120 },
        //   { genre: 'Shooter', sold: 350 },
        //   { genre: 'Other', sold: 150 },
        // ];
        // 
        // const colorField = 'genre';
        // 
        // chart
        //   .interval()
        //   .data(data)
        //   .encode('x', 'genre')
        //   .encode('y', 'sold')
        //   .encode('color', colorField)
        //   .legend(false); // Hide built-in legends.
        // 
        // chart.render().then(renderCustomLegend);
        // 
        // function renderCustomLegend(chart) {
        //   // Get color scale.
        //   const scale = chart.
        // // ... (code truncated)
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/component/legend/demo/custom.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = <div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/component/legend/demo/custom.ts</div>;
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/component/legend/demo/custom.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Custom Legend</CardTitle>
        <CardDescription>
          G2 Chart. Original example: component/legend/demo/custom.ts
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
