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
} from "@/registry/new-york/ui/card"

// Original G2 example path: integration/G2/site/examples/general/radar/demo/complex-radial.ts

const FALLBACK_COLORS_JSON =
  '["#E57373","#81C784","#64B5F6","#FFD54F","#BA68C8"]'

export default function G2ChartComponent_general_radar_complex_radial() {
  // Helper functions and data extracted from the original G2 example.
  // These are defined within the component scope to be accessible by the G2 chart logic in useEffect.
  // Code from original script before chart initialization:
  const data = [
    { x: 0, y: 0 },
    { x: 1, y: 0.0785 },
    { x: 2, y: 0.1568 },
    { x: 3, y: 0.2347 },
    { x: 4, y: 0.3119 },
    { x: 5, y: 0.3882 },
    { x: 6, y: 0.4635 },
    { x: 7, y: 0.5376 },
    { x: 8, y: 0.6101 },
    { x: 9, y: 0.681 },
    { x: 10, y: 0.75 },
    { x: 11, y: 0.817 },
    { x: 12, y: 0.8817 },
    { x: 13, y: 0.944 },
    { x: 14, y: 1.0037 },
    { x: 15, y: 1.0607 },
    { x: 16, y: 1.1147 },
    { x: 17, y: 1.1657 },
    { x: 18, y: 1.2135 },
    { x: 19, y: 1.258 },
    { x: 20, y: 1.299 },
    { x: 21, y: 1.3365 },
    { x: 22, y: 1.3703 },
    { x: 23, y: 1.4004 },
    { x: 24, y: 1.4266 },
    { x: 25, y: 1.4489 },
    { x: 26, y: 1.4672 },
    { x: 27, y: 1.4815 },
    { x: 28, y: 1.4918 },
    { x: 29, y: 1.4979 },
    { x: 30, y: 1.5 },
    { x: 31, y: 1.4979 },
    { x: 32, y: 1.4918 },
    { x: 33, y: 1.4815 },
    { x: 34, y: 1.4672 },
    { x: 35, y: 1.4489 },
    { x: 36, y: 1.4266 },
    { x: 37, y: 1.4004 },
    { x: 38, y: 1.3703 },
    { x: 39, y: 1.3365 },
    { x: 40, y: 1.299 },
    { x: 41, y: 1.258 },
    { x: 42, y: 1.2135 },
    { x: 43, y: 1.1657 },
    { x: 44, y: 1.1147 },
    { x: 45, y: 1.0607 },
    { x: 46, y: 1.0037 },
    { x: 47, y: 0.944 },
    { x: 48, y: 0.8817 },
    { x: 49, y: 0.817 },
    { x: 50, y: 0.75 },
    { x: 51, y: 0.681 },
    { x: 52, y: 0.6101 },
    { x: 53, y: 0.5376 },
    { x: 54, y: 0.4635 },
    { x: 55, y: 0.3882 },
    { x: 56, y: 0.3119 },
    { x: 57, y: 0.2347 },
    { x: 58, y: 0.1568 },
    { x: 59, y: 0.0785 },
    { x: 60, y: 0 },
    { x: 61, y: 0.0785 },
    { x: 62, y: 0.1568 },
    { x: 63, y: 0.2347 },
    { x: 64, y: 0.3119 },
    { x: 65, y: 0.3882 },
    { x: 66, y: 0.4635 },
    { x: 67, y: 0.5376 },
    { x: 68, y: 0.6101 },
    { x: 69, y: 0.681 },
    { x: 70, y: 0.75 },
    { x: 71, y: 0.817 },
    { x: 72, y: 0.8817 },
    { x: 73, y: 0.944 },
    { x: 74, y: 1.0037 },
    { x: 75, y: 1.0607 },
    { x: 76, y: 1.1147 },
    { x: 77, y: 1.1657 },
    { x: 78, y: 1.2135 },
    { x: 79, y: 1.258 },
    { x: 80, y: 1.299 },
    { x: 81, y: 1.3365 },
    { x: 82, y: 1.3703 },
    { x: 83, y: 1.4004 },
    { x: 84, y: 1.4266 },
    { x: 85, y: 1.4489 },
    { x: 86, y: 1.4672 },
    { x: 87, y: 1.4815 },
    { x: 88, y: 1.4918 },
    { x: 89, y: 1.4979 },
    { x: 90, y: 1.5 },
    { x: 91, y: 1.4979 },
    { x: 92, y: 1.4918 },
    { x: 93, y: 1.4815 },
    { x: 94, y: 1.4672 },
    { x: 95, y: 1.4489 },
    { x: 96, y: 1.4266 },
    { x: 97, y: 1.4004 },
    { x: 98, y: 1.3703 },
    { x: 99, y: 1.3365 },
    { x: 100, y: 1.299 },
    { x: 101, y: 1.258 },
    { x: 102, y: 1.2135 },
    { x: 103, y: 1.1657 },
    { x: 104, y: 1.1147 },
    { x: 105, y: 1.0607 },
    { x: 106, y: 1.0037 },
    { x: 107, y: 0.944 },
    { x: 108, y: 0.8817 },
    { x: 109, y: 0.817 },
    { x: 110, y: 0.75 },
    { x: 111, y: 0.681 },
    { x: 112, y: 0.6101 },
    { x: 113, y: 0.5376 },
    { x: 114, y: 0.4635 },
    { x: 115, y: 0.3882 },
    { x: 116, y: 0.3119 },
    { x: 117, y: 0.2347 },
    { x: 118, y: 0.1568 },
    { x: 119, y: 0.0785 },
    { x: 120, y: 0 },
    { x: 121, y: 0.0785 },
    { x: 122, y: 0.1568 },
    { x: 123, y: 0.2347 },
    { x: 124, y: 0.3119 },
    { x: 125, y: 0.3882 },
    { x: 126, y: 0.4635 },
    { x: 127, y: 0.5376 },
    { x: 128, y: 0.6101 },
    { x: 129, y: 0.681 },
    { x: 130, y: 0.75 },
    { x: 131, y: 0.817 },
    { x: 132, y: 0.8817 },
    { x: 133, y: 0.944 },
    { x: 134, y: 1.0037 },
    { x: 135, y: 1.0607 },
    { x: 136, y: 1.1147 },
    { x: 137, y: 1.1657 },
    { x: 138, y: 1.2135 },
    { x: 139, y: 1.258 },
    { x: 140, y: 1.299 },
    { x: 141, y: 1.3365 },
    { x: 142, y: 1.3703 },
    { x: 143, y: 1.4004 },
    { x: 144, y: 1.4266 },
    { x: 145, y: 1.4489 },
    { x: 146, y: 1.4672 },
    { x: 147, y: 1.4815 },
    { x: 148, y: 1.4918 },
    { x: 149, y: 1.4979 },
    { x: 150, y: 1.5 },
    { x: 151, y: 1.4979 },
    { x: 152, y: 1.4918 },
    { x: 153, y: 1.4815 },
    { x: 154, y: 1.4672 },
    { x: 155, y: 1.4489 },
    { x: 156, y: 1.4266 },
    { x: 157, y: 1.4004 },
    { x: 158, y: 1.3703 },
    { x: 159, y: 1.3365 },
    { x: 160, y: 1.299 },
    { x: 161, y: 1.258 },
    { x: 162, y: 1.2135 },
    { x: 163, y: 1.1657 },
    { x: 164, y: 1.1147 },
    { x: 165, y: 1.0607 },
    { x: 166, y: 1.0037 },
    { x: 167, y: 0.944 },
    { x: 168, y: 0.8817 },
    { x: 169, y: 0.817 },
    { x: 170, y: 0.75 },
    { x: 171, y: 0.681 },
    { x: 172, y: 0.6101 },
    { x: 173, y: 0.5376 },
    { x: 174, y: 0.4635 },
    { x: 175, y: 0.3882 },
    { x: 176, y: 0.3119 },
    { x: 177, y: 0.2347 },
    { x: 178, y: 0.1568 },
    { x: 179, y: 0.0785 },
    { x: 180, y: 0 },
    { x: 181, y: 0.0785 },
    { x: 182, y: 0.1568 },
    { x: 183, y: 0.2347 },
    { x: 184, y: 0.3119 },
    { x: 185, y: 0.3882 },
    { x: 186, y: 0.4635 },
    { x: 187, y: 0.5376 },
    { x: 188, y: 0.6101 },
    { x: 189, y: 0.681 },
    { x: 190, y: 0.75 },
    { x: 191, y: 0.817 },
    { x: 192, y: 0.8817 },
    { x: 193, y: 0.944 },
    { x: 194, y: 1.0037 },
    { x: 195, y: 1.0607 },
    { x: 196, y: 1.1147 },
    { x: 197, y: 1.1657 },
    { x: 198, y: 1.2135 },
    { x: 199, y: 1.258 },
    { x: 200, y: 1.299 },
    { x: 201, y: 1.3365 },
    { x: 202, y: 1.3703 },
    { x: 203, y: 1.4004 },
    { x: 204, y: 1.4266 },
    { x: 205, y: 1.4489 },
    { x: 206, y: 1.4672 },
    { x: 207, y: 1.4815 },
    { x: 208, y: 1.4918 },
    { x: 209, y: 1.4979 },
    { x: 210, y: 1.5 },
    { x: 211, y: 1.4979 },
    { x: 212, y: 1.4918 },
    { x: 213, y: 1.4815 },
    { x: 214, y: 1.4672 },
    { x: 215, y: 1.4489 },
    { x: 216, y: 1.4266 },
    { x: 217, y: 1.4004 },
    { x: 218, y: 1.3703 },
    { x: 219, y: 1.3365 },
    { x: 220, y: 1.299 },
    { x: 221, y: 1.258 },
    { x: 222, y: 1.2135 },
    { x: 223, y: 1.1657 },
    { x: 224, y: 1.1147 },
    { x: 225, y: 1.0607 },
    { x: 226, y: 1.0037 },
    { x: 227, y: 0.944 },
    { x: 228, y: 0.8817 },
    { x: 229, y: 0.817 },
    { x: 230, y: 0.75 },
    { x: 231, y: 0.681 },
    { x: 232, y: 0.6101 },
    { x: 233, y: 0.5376 },
    { x: 234, y: 0.4635 },
    { x: 235, y: 0.3882 },
    { x: 236, y: 0.3119 },
    { x: 237, y: 0.2347 },
    { x: 238, y: 0.1568 },
    { x: 239, y: 0.0785 },
    { x: 240, y: 0 },
    { x: 241, y: 0.0785 },
    { x: 242, y: 0.1568 },
    { x: 243, y: 0.2347 },
    { x: 244, y: 0.3119 },
    { x: 245, y: 0.3882 },
    { x: 246, y: 0.4635 },
    { x: 247, y: 0.5376 },
    { x: 248, y: 0.6101 },
    { x: 249, y: 0.681 },
    { x: 250, y: 0.75 },
    { x: 251, y: 0.817 },
    { x: 252, y: 0.8817 },
    { x: 253, y: 0.944 },
    { x: 254, y: 1.0037 },
    { x: 255, y: 1.0607 },
    { x: 256, y: 1.1147 },
    { x: 257, y: 1.1657 },
    { x: 258, y: 1.2135 },
    { x: 259, y: 1.258 },
    { x: 260, y: 1.299 },
    { x: 261, y: 1.3365 },
    { x: 262, y: 1.3703 },
    { x: 263, y: 1.4004 },
    { x: 264, y: 1.4266 },
    { x: 265, y: 1.4489 },
    { x: 266, y: 1.4672 },
    { x: 267, y: 1.4815 },
    { x: 268, y: 1.4918 },
    { x: 269, y: 1.4979 },
    { x: 270, y: 1.5 },
    { x: 271, y: 1.4979 },
    { x: 272, y: 1.4918 },
    { x: 273, y: 1.4815 },
    { x: 274, y: 1.4672 },
    { x: 275, y: 1.4489 },
    { x: 276, y: 1.4266 },
    { x: 277, y: 1.4004 },
    { x: 278, y: 1.3703 },
    { x: 279, y: 1.3365 },
    { x: 280, y: 1.299 },
    { x: 281, y: 1.258 },
    { x: 282, y: 1.2135 },
    { x: 283, y: 1.1657 },
    { x: 284, y: 1.1147 },
    { x: 285, y: 1.0607 },
    { x: 286, y: 1.0037 },
    { x: 287, y: 0.944 },
    { x: 288, y: 0.8817 },
    { x: 289, y: 0.817 },
    { x: 290, y: 0.75 },
    { x: 291, y: 0.681 },
    { x: 292, y: 0.6101 },
    { x: 293, y: 0.5376 },
    { x: 294, y: 0.4635 },
    { x: 295, y: 0.3882 },
    { x: 296, y: 0.3119 },
    { x: 297, y: 0.2347 },
    { x: 298, y: 0.1568 },
    { x: 299, y: 0.0785 },
    { x: 300, y: 0 },
    { x: 301, y: 0.0785 },
    { x: 302, y: 0.1568 },
    { x: 303, y: 0.2347 },
    { x: 304, y: 0.3119 },
    { x: 305, y: 0.3882 },
    { x: 306, y: 0.4635 },
    { x: 307, y: 0.5376 },
    { x: 308, y: 0.6101 },
    { x: 309, y: 0.681 },
    { x: 310, y: 0.75 },
    { x: 311, y: 0.817 },
    { x: 312, y: 0.8817 },
    { x: 313, y: 0.944 },
    { x: 314, y: 1.0037 },
    { x: 315, y: 1.0607 },
    { x: 316, y: 1.1147 },
    { x: 317, y: 1.1657 },
    { x: 318, y: 1.2135 },
    { x: 319, y: 1.258 },
    { x: 320, y: 1.299 },
    { x: 321, y: 1.3365 },
    { x: 322, y: 1.3703 },
    { x: 323, y: 1.4004 },
    { x: 324, y: 1.4266 },
    { x: 325, y: 1.4489 },
    { x: 326, y: 1.4672 },
    { x: 327, y: 1.4815 },
    { x: 328, y: 1.4918 },
    { x: 329, y: 1.4979 },
    { x: 330, y: 1.5 },
    { x: 331, y: 1.4979 },
    { x: 332, y: 1.4918 },
    { x: 333, y: 1.4815 },
    { x: 334, y: 1.4672 },
    { x: 335, y: 1.4489 },
    { x: 336, y: 1.4266 },
    { x: 337, y: 1.4004 },
    { x: 338, y: 1.3703 },
    { x: 339, y: 1.3365 },
    { x: 340, y: 1.299 },
    { x: 341, y: 1.258 },
    { x: 342, y: 1.2135 },
    { x: 343, y: 1.1657 },
    { x: 344, y: 1.1147 },
    { x: 345, y: 1.0607 },
    { x: 346, y: 1.0037 },
    { x: 347, y: 0.944 },
    { x: 348, y: 0.8817 },
    { x: 349, y: 0.817 },
    { x: 350, y: 0.75 },
    { x: 351, y: 0.681 },
    { x: 352, y: 0.6101 },
    { x: 353, y: 0.5376 },
    { x: 354, y: 0.4635 },
    { x: 355, y: 0.3882 },
    { x: 356, y: 0.3119 },
    { x: 357, y: 0.2347 },
    { x: 358, y: 0.1568 },
    { x: 359, y: 0.0785 },
    { x: 360, y: 0 },
  ]

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
        const keyframe = g2ChartInstance.current.timingKeyframe({
          direction: "alternate",
          iterationCount: 4,
        })

        keyframe
          .line()
          .data(data)
          .coordinate({ type: "polar" })
          .axis("x", {
            grid: null,
            line: true,
            lineLineWidth: 1,
          })
          .axis("y", false)
          .scale("x", { tickCount: 12 })
          .interaction("tooltip", {
            crosshairs: false,
          })
          .encode("x", "x")
          .encode("y", "y")
          .encode("color", "#ff8800")
          .style("lineWidth", 2)

        keyframe
          .line()
          .data(data)
          .axis("x", {
            grid: null,
            line: true,
            lineLineWidth: 1,
          })
          .axis("y", false)
          .scale("x", { tickCount: 12 })
          .interaction("tooltip", {
            crosshairs: false,
          })
          .encode("x", "x")
          .encode("y", "y")
          .encode("color", "#ff8800")
          .style("lineWidth", 2)

        g2ChartInstance.current.render()
        // --- G2 Chart Logic End ---
      } catch (error) {
        console.error(
          "Error initializing G2 chart from integration/G2/site/examples/general/radar/demo/complex-radial.ts:",
          error
        )
        if (chartRef.current) {
          chartRef.current.innerHTML =
            '<div style="color: red; text-align: center; padding: 20px;">Failed to render G2 chart. Check console for errors. Source: integration/G2/site/examples/general/radar/demo/complex-radial.ts</div>'
        }
      }
    }

    return () => {
      if (g2ChartInstance.current) {
        try {
          g2ChartInstance.current.destroy()
        } catch (e) {
          console.error(
            "Error destroying G2 chart from integration/G2/site/examples/general/radar/demo/complex-radial.ts:",
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
        <CardTitle>Radar</CardTitle>
        <CardDescription>
          G2 Chart. Original example: general/radar/demo/complex-radial.ts
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
