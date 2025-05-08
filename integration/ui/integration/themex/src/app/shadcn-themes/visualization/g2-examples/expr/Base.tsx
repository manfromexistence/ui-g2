'use client';

import React from 'react';
import { type G2Spec } from '@antv/g2';
import G2Chart from '../../../../../g2-wrapper';
// No A11yPlugin detected

/*
  Original G2 Example Code:
  Source: ../../G2/site/examples/expr/base/demo/expr.ts
  ================================================================================
  // import { Chart } from '@antv/g2';
  // 
  // const chart = new Chart({
  //   container: 'container',
  // });
  // 
  // const spec = {
  //   type: 'spaceLayer',
  //   height: 840,
  //   width: 640,
  //   data: {
  //     type: 'fetch',
  //     value:
  //       'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
  //     format: 'csv',
  //   },
  //   children: [
  //     {
  //       type: 'interval',
  //       height: 360,
  //       width: 360,
  //       legend: false,
  //       x: 280,
  //       transform: [{ type: 'stackY' }],
  //       coordinate: { type: 'theta' },
  //       scale: {
  //         color: { palette: 'spectral' },
  //       },
  //       encode: {
  //         y: 'value',
  //         color: 'name',
  //         enterDelay: '{a.value>10000000 ? a.value>20000000 ? 2000 : 1000 : 0}',
  //       },
  //       style: {
  //         stroke: '{ a.value>20000000 ? "purple" : null}',
  //       },
  //       labels: [
  //         {
  //           text: '{"*" + a.name}',
  //           radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
  //           style: {
  //             fontSize: '{a.value>15000000 ? a.value>20000000 ? 12 : 10 : 6}',
  //             fontWeight: 'bold',
  //           },
  //           transform: [{ type: 'contrastReverse' }],
  //         },
  //         {
  //           text: '{b < c.length - 3 ? a.value : ""}',
  //           radius: '{a.value>15000000 ? a.value>20000000 ? 0.6 : 0.75 : 0.9}',
  //           style: { fontSize: 9, dy: 12 },
  //           transform: [{ type: 'contrastReverse' }],
  //         },
  //       ],
  //       animate: { enter: { type: 'waveIn', duration: 600 } },
  //     },
  //     {
  //       type: 'view',
  //       height: 400,
  //       width: 540,
  //       y: 300,
  //       children: [
  //         {
  //           type: 'interval',
  //           height: 400,
  //           width: 540,
  //           legend: false,
  //           y: 300,
  //           scale: {
  //             color: { palette: 'spectral' },
  //           },
  //           encode: {
  //             y: 'value',
  //             x: 'name',
  //             color: 'name',
  //             enterDelay:
  //               '{a.value>10000000 ? a.value>20000000 ? 2000 : 1000 : 0}',
  //           },
  //         },
  //         {
  //           type: 'line',
  //           height: 400,
  //           width: 540,
  //           legend: false,
  //           y: 300,
  //           encode: { x: 'name', y: 'value' },
  //           scale: { y: { independent: true } },
  //           labels: [
  //             {
  //               text: '{a.value}',
  //               selector: '{a}',
  //             },
  //           ],
  //           axis: {
  //             y: {
  //               position: 'right',
  //               grid: null,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // };
  // 
  // chart.options(spec);
  // 
  // chart.render();
  // 
  ================================================================================
*/

// --- Auto-Generated G2 Spec (Needs Review) ---
// Note: Functions, complex expressions, and some options might require manual conversion.
// Check for '%%FUNCTION...' or '%%HELPER_FUNCTION...' placeholders and replace them manually.
const spec: G2Spec = {};

const Base: React.FC = () => {
  // Use the spec directly (data might be inline or handled elsewhere)
  // Ensure spec is defined before assigning
  const finalSpec: G2Spec = spec || {
    type: 'invalid',
    error: 'Spec generation failed',
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Spec Function Expression</h2>
      {/* TODO: Add description if available */}
      {/* Container size and overflow similar to TextSearch.tsx */}
      <div className="h-[600px] w-full overflow-auto border rounded p-2 bg-background">
        {' '}
        {/* Use bg-background or bg-muted/40 */}
        {/* Render chart only when spec is valid and ready */}
        {finalSpec && finalSpec.type !== 'invalid' ? (
          <G2Chart config={finalSpec} />
        ) : (
          <div className="p-4 text-center text-red-600">
            Chart specification is invalid or missing.
          </div>
        )}
      </div>
    </div>
  );
};

export default Base;
