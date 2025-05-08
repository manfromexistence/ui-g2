// Formatting or Write failed for annotation/connector. Original content below:
// Source: /workspaces/shadcn-ui/G2/site/examples/annotation/connector/demo/revenue-flow-waterfall.ts
// Error: Expression expected. (91:3)
[0m [90m 89 |[39m   [90m// chart.render();[39m
 [90m 90 |[39m   [90m// [39m
[31m[1m>[22m[39m[90m 91 |[39m   [33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m===[39m[33m==[39m
 [90m    |[39m   [31m[1m^[22m[39m
 [90m 92 |[39m [33m*[39m[33m/[39m
 [90m 93 |[39m
 [90m 94 |[39m[0m

'use client';

import React from 'react';
import { type G2Spec } from '@antv/g2';
import G2Chart from '../../../../../g2-wrapper';
// No A11yPlugin detected



/*
  Original G2 Example Code:
  Source: ../../G2/site/examples/annotation/connector/demo/revenue-flow-waterfall.ts
  ================================================================================
  // /**
  //  * A recreation of this demo: https://www.anychart.com/zh/products/anychart/gallery/Waterfall_Charts/ACME_corp._Revenue_Flow_2017.php
  //  */
  // import { Chart } from '@antv/g2';
  // 
  // const linkData = (data) =>
  //   data.reduce((r, d, idx) => {
  //     if (idx > 0) {
  //       return r.concat({
  //         x1: data[idx - 1].x,
  //         x2: d.x,
  //         value: d.isTotal ? d.end : d.start,
  //       });
  //     }
  //     return r;
  //   }, []);
  // 
  // const chart = new Chart({
  //   container: 'container',
  //   autoFit: true,
  // });
  // 
  // chart
  //   .data([
  //     { x: 'Start', value: 23000000, start: 0, end: 23000000 },
  //     { x: 'Jan', value: 2200000, start: 23000000, end: 25200000 },
  //     { x: 'Feb', value: -4600000, start: 25200000, end: 20600000 },
  //     { x: 'Mar', value: -9100000, start: 20600000, end: 11500000 },
  //     { x: 'Apr', value: 3700000, start: 11500000, end: 15200000 },
  //     { x: 'May', value: -2100000, start: 15200000, end: 13100000 },
  //     { x: 'Jun', value: 5300000, start: 13100000, end: 18400000 },
  //     { x: 'Jul', value: 3100000, start: 18400000, end: 21500000 },
  //     { x: 'Aug', value: -1500000, start: 21500000, end: 20000000 },
  //     { x: 'Sep', value: 4200000, start: 20000000, end: 24200000 },
  //     { x: 'Oct', value: 5300000, start: 24200000, end: 29500000 },
  //     { x: 'Nov', value: -1500000, start: 29500000, end: 28000000 },
  //     { x: 'Dec', value: 5100000, start: 28000000, end: 33100000 },
  //     { x: 'End', isTotal: true, value: 33100000, start: 0, end: 33100000 },
  //   ])
  //   .axis('x', { title: false })
  //   .axis('y', { labelFormatter: '~s' })
  //   .legend(null);
  // 
  // chart
  //   .link()
  //   .data({ transform: [{ type: 'custom', callback: linkData }] })
  //   .encode('x', ['x1', 'x2'])
  //   .encode('y', 'value')
  //   .style('stroke', '#697474')
  //   .tooltip(false);
  // 
  // chart
  //   .interval()
  //   .encode('x', 'x')
  //   .encode('y', ['start', 'end'])
  //   .encode('color', (d, idx) =>
  //     idx === 0 || d.isTotal ? 'D' : d.value > 0 ? 'P' : 'N',
  //   )
  //   .scale('color', {
  //     domain: ['P', 'N', 'D'],
  //     range: ['#64b5f6', '#ef6c00', '#96a6a6'],
  //   })
  //   .encode('size', 24)
  //   .style('stroke', '#697474')
  //   .label({
  //     text: 'value',
  //     formatter: '~s',
  //     position: (d) => (d.value > 0 ? 'top' : 'bottom'),
  //     textBaseline: (d) => (d.value > 0 ? 'bottom' : 'top'),
  //     fontSize: 10,
  //     dy: (d) => (d.value > 0 ? -4 : 4),
  //   })
  //   .tooltip({ channel: 'y', valueFormatter: '~s' })
  //   .tooltip({ channel: 'y1', valueFormatter: '~s' });
  // 
  // chart.render();
  // 
  ================================================================================
*/



// --- Auto-Generated G2 Spec (Needs Review) ---
// Note: Functions, complex expressions, and some options might require manual conversion.
// Check for '%%FUNCTION...' or '%%HELPER_FUNCTION...' placeholders and replace them manually.
const spec: G2Spec = {
  type: 'link',
  data: [
    {
      x: 'Start',
      value: 23000000,
      start: 0,
      end: 23000000,
    },
    {
      x: 'Jan',
      value: 2200000,
      start: 23000000,
      end: 25200000,
    },
    {
      x: 'Feb',
      value: -4600000,
      start: 25200000,
      end: 20600000,
    },
    {
      x: 'Mar',
      value: -9100000,
      start: 20600000,
      end: 11500000,
    },
    {
      x: 'Apr',
      value: 3700000,
      start: 11500000,
      end: 15200000,
    },
    {
      x: 'May',
      value: -2100000,
      start: 15200000,
      end: 13100000,
    },
    {
      x: 'Jun',
      value: 5300000,
      start: 13100000,
      end: 18400000,
    },
    {
      x: 'Jul',
      value: 3100000,
      start: 18400000,
      end: 21500000,
    },
    {
      x: 'Aug',
      value: -1500000,
      start: 21500000,
      end: 20000000,
    },
    {
      x: 'Sep',
      value: 4200000,
      start: 20000000,
      end: 24200000,
    },
    {
      x: 'Oct',
      value: 5300000,
      start: 24200000,
      end: 29500000,
    },
    {
      x: 'Nov',
      value: -1500000,
      start: 29500000,
      end: 28000000,
    },
    {
      x: 'Dec',
      value: 5100000,
      start: 28000000,
      end: 33100000,
    },
    {
      x: 'End',
      isTotal: true,
      value: 33100000,
      start: 0,
      end: 33100000,
    },
  ],
  encode: {
    x: 'x',
    y: ['start', 'end'],
    color: '(d, idx',
    size: '24',
  },
  scale: {
    color: {
      domain: ['P', 'N', 'D'],
      range: ['#64b5f6', '#ef6c00', '#96a6a6'],
    },
  },
  axis: {
    x: {
      title: false,
    },
    y: {
      labelFormatter: '~s',
    },
  },
  legend: {
    null: true,
  },
  style: {
    stroke: '#697474',
  },
  labels: [null],
  tooltip: false,
};;

const Connector: React.FC = () => {
    
    // Use the spec directly (data might be inline or handled elsewhere)
    // Ensure spec is defined before assigning
    const finalSpec: G2Spec = spec || { type: 'invalid', error: 'Spec generation failed' };
  

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Connector</h2>
      {/* TODO: Add description if available */}
      {/* Container size and overflow similar to TextSearch.tsx */}
      <div className="h-[600px] w-full overflow-auto border rounded p-2 bg-background"> {/* Use bg-background or bg-muted/40 */}
        {/* Render chart only when spec is valid and ready */}
        {(finalSpec && finalSpec.type !== 'invalid') ? (
            <G2Chart config={finalSpec} />
        ) : (
            <div className="p-4 text-center text-red-600">Chart specification is invalid or missing.</div>
        )}
      </div>
    </div>
  );
};

export default Connector;
