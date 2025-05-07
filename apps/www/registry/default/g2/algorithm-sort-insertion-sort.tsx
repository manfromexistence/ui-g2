// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { Chart , register } from '@antv/g2';

import { useShadcnChartColors } from "@/hooks/use-shadcn-chart-colors"; // Import the hook
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";

// Original G2 example path: integration/G2/site/examples/algorithm/sort/demo/insertion-sort.ts

const FALLBACK_COLORS_JSON = '["#E57373","#81C784","#64B5F6","#FFD54F","#BA68C8"]';

// Helper functions and data defined in the G2 original example:
// Helper code extracted from original (review and adapt if necessary):
const data = [43, 2, 5, 24, 53, 78, 82, 63, 49, 6];

// Definition for insertionSort based on G2 examples
// It generates frames for visualizing the sorting process.
// Each frame is an array of objects { value: number, swap: string }.
// 'swap' indicates the state: 'default', 'highlight', 'swapping', 'sorted'.
function insertionSort(arr: number[]) {
  // Initialize array items with a 'state' property for visualization
  const étapes = arr.map((value, id) => ({ value, id, state: 'default' }));
  const frames: Array<Array<{ value: number; swap: string }>> = [];

  // Helper to capture the current state of the array as a frame
  function pushFrame(currentArray: typeof étapes) {
    frames.push(currentArray.map(item => ({ value: item.value, swap: item.state })));
  }

  pushFrame(étapes); // Initial frame

  for (let i = 1; i < étapes.length; i++) {
    let j = i;

    // Highlight the current element being inserted and the one it's compared against
    étapes[j].state = 'highlight';
    if (j > 0) étapes[j - 1].state = 'highlight';
    pushFrame(étapes);

    while (j > 0 && étapes[j].value < étapes[j - 1].value) {
      // Mark elements for swapping
      étapes[j].state = 'swapping';
      étapes[j - 1].state = 'swapping';
      pushFrame(étapes);

      // Perform the swap
      [étapes[j], étapes[j - 1]] = [étapes[j - 1], étapes[j]];

      // Update states after swap
      étapes[j].state = 'default'; // Element moved to the right is now default (or part of sorted portion)
      étapes[j - 1].state = 'highlight'; // Element moved to the left is still the one being inserted/focused
      pushFrame(étapes);
      
      j--;

      // If there's a next comparison, highlight those elements
      if (j > 0) {
        étapes[j].state = 'highlight'; // Current element (still being inserted)
        étapes[j - 1].state = 'highlight'; // Next element to compare against
        pushFrame(étapes);
      }
    }

    // After the inner loop, elements from index 0 to i are sorted.
    // Mark them as 'sorted' and reset others.
    for (let k = 0; k < étapes.length; k++) {
      if (k <= i) {
        étapes[k].state = 'sorted';
      } else {
        // Elements not yet processed in the outer loop should revert to 'default'
        // if they were highlighted but not part of the current sorted segment.
        étapes[k].state = 'default'; 
      }
    }
    // Specifically, the element at `j` (where the inserted element landed) is sorted.
    // And all elements before it are sorted.
    // Ensure correct states for the full array in this frame.
     for (let k = 0; k <=i; k++) étapes[k].state = 'sorted';
     for (let k = i+1; k < étapes.length; k++) étapes[k].state = 'default';

    pushFrame(étapes);
  }

  // Final frame: all elements are sorted
  étapes.forEach(d => (d.state = 'sorted'));
  pushFrame(étapes);

  return frames;
}


export default function G2ChartComponent_algorithm_sort_insertion_sort() {
  const chartRef = useRef<HTMLDivElement>(null);
  const g2ChartInstance = useRef<Chart | null>(null);
  const shadcnColors = useShadcnChartColors(chartRef); // Use the hook

  useEffect(() => {
    // Palette registration must happen before G2 chart initialization attempts to use it.
    // It also needs to happen after shadcnColors are resolved.
    // And chartRef.current must exist for getComputedStyle to work in the hook.
    
    // Register the palette once colors are resolved (or with fallback).
    // Check if shadcnColors are not the initial fallback to ensure hook has run or CSS vars are applied.
    // The hook itself returns FALLBACK_COLORS initially or if resolution fails.
    if (shadcnColors && shadcnColors.length === 5) {
        try {
            register('palette.shadcnPalette', () => shadcnColors);
        } catch (e) {
            console.error("Error registering shadcnPalette, G2 'register' might not be available or shadcnColors are invalid:", e, shadcnColors);
            // Fallback registration if the above fails for any reason
            register('palette.shadcnPalette', () => JSON.parse(FALLBACK_COLORS_JSON));
        }
    } else {
        // Fallback if shadcnColors is not yet ready or invalid
        console.warn("Shadcn colors not ready or invalid, using fallback palette for G2 chart.");
        register('palette.shadcnPalette', () => JSON.parse(FALLBACK_COLORS_JSON));
    }

    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
        });
        g2ChartInstance.current.theme({ defaultCategory10: 'shadcnPalette', defaultCategory20: 'shadcnPalette' });
        const keyframe = g2ChartInstance.current.timingKeyframe();
        
        for (const frame of insertionSort(data)) {
          keyframe
            .interval()
            .data(frame.map((datum, index) => ({ index, ...datum })))
            .encode('x', 'index')
            .encode('y', 'value')
            .encode('key', 'value')
            .encode('color', 'swap');
        }
        
        g2ChartInstance.current.render();
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error("Error initializing G2 chart from integration/G2/site/examples/algorithm/sort/demo/insertion-sort.ts:", error);
        if (chartRef.current) {
          chartRef.current.innerHTML = '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/algorithm/sort/demo/insertion-sort.ts</div>';
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy();
        } catch (e) {
          console.error("Error destroying G2 chart from integration/G2/site/examples/algorithm/sort/demo/insertion-sort.ts:", e);
        }
        g2ChartInstance.current = null;
      }
    };
  }, [shadcnColors]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Insertion Sort</CardTitle>
        <CardDescription>
          G2 Chart. Original example: algorithm/sort/demo/insertion-sort.ts
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
