// @ts-nocheck
"use client"

import React, { useEffect, useRef } from "react"
import { Chart, register } from "@antv/g2"

import { useShadcnChartColors } from "@/hooks/use-shadcn-chart-colors"
// Import the hook
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"

// Original G2 example path: integration/G2/site/examples/general/line/demo/line-area-clip-path.ts

const FALLBACK_COLORS_JSON =
  '["#E57373","#81C784","#64B5F6","#FFD54F","#BA68C8"]'

export default function G2ChartComponent_general_line_line_area_clip_path() {
  // Helper functions and data extracted from the original G2 example.
  // These are defined within the component scope to be accessible by the G2 chart logic in useEffect.
  // Code from original script before chart initialization:
  const data = [
    {
      timestamp: 1705518060000,
      value: 60.143229166667,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: true,
    },
    {
      timestamp: 1705518120000,
      value: 38.229166666667005,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705518180000,
      value: 51.71875,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705518240000,
      value: 45.37109375,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705518420000,
      value: 45.397135416667,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705518540000,
      value: 0,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: true,
    },
    {
      timestamp: 1705518720000,
      value: 54.446614583332995,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705518900000,
      value: 57.180989583332995,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705518960000,
      value: 51.647135416667,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705519020000,
      value: 49.0234375,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705519140000,
      value: 47.447916666667,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705519200000,
      value: 49.3359375,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705519260000,
      value: 43.483072916667,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705519440000,
      value: 50.66406249999999,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705519500000,
      value: 44.329427083333,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705519620000,
      value: 52.46093750000001,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705519680000,
      value: 44.66796875,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705519800000,
      value: 43.359375,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705519920000,
      value: 0,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: true,
    },
    {
      timestamp: 1705520040000,
      value: 47.102864583333,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705520100000,
      value: 48.1640625,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705520220000,
      value: 55.201822916667,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705520340000,
      value: 49.856770833332995,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705520460000,
      value: 44.309895833333,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705520580000,
      value: 44.127604166667,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705520700000,
      value: 58.782552083332995,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705520820000,
      value: 46.03515625,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705520940000,
      value: 69.498697916667,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: true,
    },
    {
      timestamp: 1705521000000,
      value: 38.14453125,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705521060000,
      value: 58.177083333333,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705521360000,
      value: 56.516927083333,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705521480000,
      value: 54.036458333333,
      lowerValue: 27.1,
      upperValue: 59.6,
      isOut: false,
    },
    {
      timestamp: 1705521600000,
      value: 50.397135416667005,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705521720000,
      value: 45.091145833333,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705521780000,
      value: 49.1796875,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705521840000,
      value: 44.31640625,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705521900000,
      value: 49.576822916667,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705522080000,
      value: 45.865885416667,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705522260000,
      value: 44.986979166667,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705522320000,
      value: 47.3828125,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705522440000,
      value: 45.05859375,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705522560000,
      value: 0,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: true,
    },
    {
      timestamp: 1705522800000,
      value: 42.415364583333,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705522860000,
      value: 48.776041666667005,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705522920000,
      value: 50.084635416667,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705523040000,
      value: 45.76171875,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705523160000,
      value: 49.713541666667,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705523220000,
      value: 52.44140625,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705523280000,
      value: 38.743489583333,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705523340000,
      value: 50.904947916667,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705523400000,
      value: 39.505208333332995,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705523520000,
      value: 45.514322916667,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705523880000,
      value: 49.700520833333,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524000000,
      value: 46.62109375,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524120000,
      value: 45.4296875,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524180000,
      value: 49.00390625,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524240000,
      value: 43.287760416667,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524300000,
      value: 43.860677083333,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524360000,
      value: 55.95703125,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524420000,
      value: 40.930989583333,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524600000,
      value: 43.958333333333,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524660000,
      value: 47.421875,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524780000,
      value: 44.544270833333,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705524960000,
      value: 42.122395833333,
      lowerValue: 25.67,
      upperValue: 61.81,
      isOut: false,
    },
    {
      timestamp: 1705525140000,
      value: 66.97265625,
      lowerValue: 25.82,
      upperValue: 62,
      isOut: true,
    },
    {
      timestamp: 1705525200000,
      value: 46.744791666667,
      lowerValue: 25.82,
      upperValue: 62,
      isOut: false,
    },
    {
      timestamp: 1705525380000,
      value: 47.786458333333,
      lowerValue: 25.82,
      upperValue: 62,
      isOut: false,
    },
    {
      timestamp: 1705525440000,
      value: 45.540364583333,
      lowerValue: 25.82,
      upperValue: 62,
      isOut: false,
    },
    {
      timestamp: 1705525500000,
      value: 42.8515625,
      lowerValue: 25.82,
      upperValue: 62,
      isOut: false,
    },
    {
      timestamp: 1705525620000,
      value: 60.56640625000001,
      lowerValue: 25.82,
      upperValue: 62,
      isOut: false,
    },
  ]

  function clip(chartInstance) {
    const { canvas } = chartInstance.getContext()
    const document = canvas.document
    const [cloned] = document.getElementsByClassName("cloned-line")
    if (cloned) cloned.remove()
    const elements = Array.from(document.getElementsByClassName("element"))
    const line = elements.find((d) => d.markType === "line")
    const area = elements.find((d) => d.markType === "area")
    if (!line || !area) return
    const clonedLine = line.cloneNode(true)
    clonedLine.__data__ = line.__data__
    clonedLine.style.stroke = "orange"
    clonedLine.style.clipPath = null
    clonedLine.className = "cloned-line"
    line.parentNode.insertBefore(clonedLine, line)
    line.style.clipPath = area
  }

  const chartRef = useRef<HTMLDivElement>(null)
  const g2ChartInstance = useRef<Chart | null>(null)
  const shadcnColors = useShadcnChartColors(chartRef) // Use the hook

  useEffect(() => {
    // Palette registration must happen before G2 chart initialization attempts to use it.
    // It also needs to happen after shadcnColors are resolved.
    // And chartRef.current must exist for getComputedStyle to work in the hook.

    // Register the palette once colors are resolved (or with fallback).
    // Check if shadcnColors are not the initial fallback to ensure hook has run or CSS vars are applied.
    // The hook itself returns FALLBACK_COLORS initially or if resolution fails.
    if (shadcnColors && shadcnColors.length === 5) {
      try {
        register("palette.shadcnPalette", () => shadcnColors)
      } catch (e) {
        console.error(
          "Error registering shadcnPalette, G2 'register' might not be available or shadcnColors are invalid:",
          e,
          shadcnColors
        )
        // Fallback registration if the above fails for any reason
        register("palette.shadcnPalette", () =>
          JSON.parse(FALLBACK_COLORS_JSON)
        )
      }
    } else {
      // Fallback if shadcnColors is not yet ready or invalid
      console.warn(
        "Shadcn colors not ready or invalid, using fallback palette for G2 chart."
      )
      register("palette.shadcnPalette", () => JSON.parse(FALLBACK_COLORS_JSON))
    }

    if (chartRef.current && !g2ChartInstance.current) {
      try {
        // --- G2 Chart Logic Start ---
        g2ChartInstance.current = new Chart({
          container: chartRef.current,
          autoFit: true,
        })
        g2ChartInstance.current.theme({
          defaultCategory10: "shadcnPalette",
          defaultCategory20: "shadcnPalette",
        })
        g2ChartInstance.current.options({
          type: "view",
          data,
          encode: { x: "timestamp" },
          axis: { y: { title: "value" } },
          children: [
            {
              type: "area",
              encode: { y: ["lowerValue", "upperValue"] },
              style: {
                shape: "smooth",
                fillOpacity: 0.3,
                fill: "#85c5A6",
              },
              animate: false,
            },
            {
              type: "line",
              encode: { y: "value" },
              scale: { x: { type: "time", mask: "HH:mm" } },
              style: { shape: "hvh" },
              animate: false,
            },
          ],
        })

        g2ChartInstance.current.on("afterrender", () =>
          clip(g2ChartInstance.current)
        )

        g2ChartInstance.current.render()
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error(
          "Error initializing G2 chart from integration/G2/site/examples/general/line/demo/line-area-clip-path.ts:",
          error
        )
        if (chartRef.current) {
          chartRef.current.innerHTML =
            '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/line/demo/line-area-clip-path.ts</div>'
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy()
        } catch (e) {
          console.error(
            "Error destroying G2 chart from integration/G2/site/examples/general/line/demo/line-area-clip-path.ts:",
            e
          )
        }
        g2ChartInstance.current = null
      }
    }
  }, [shadcnColors])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line with Area Annotation</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/line/demo/line-area-clip-path.ts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} style={{ width: "100%", minHeight: "400px" }}>
          {/* G2 Chart will be rendered here by the useEffect hook */}
        </div>
      </CardContent>
    </Card>
  )
}
