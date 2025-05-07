import { THEMES } from "@/lib/themes"
import { ChartDisplay } from "@/components/chart-display"
import { ThemesSwitcher } from "@/components/themes-selector"
import { ThemesStyle } from "@/components/themes-styles"
import * as Charts from "@/registry/default/g2"

export default function ChartsPage() {
  return (
    <div className="grid gap-4">
      <ThemesStyle />
      <div className="gap-6 md:flex md:flex-row-reverse md:items-start">
        <ThemesSwitcher
          themes={THEMES}
          className="bg-background/95 supports-[backdrop-filter]:bg-background/60 fixed inset-x-0 bottom-0 z-40 flex backdrop-blur lg:sticky lg:bottom-auto lg:top-20"
        />
        <div className="grid flex-1 gap-12">


          <div>
            <h3>G2ChartComponent_general_pie_point_jitter_radial</h3>
            <Charts.G2ChartComponent_general_pie_point_jitter_radial />
          </div>
          <div>
            <h3>G2ChartComponent_general_polygon_treemap</h3>
            <Charts.G2ChartComponent_general_polygon_treemap />
          </div>
          <div>
            <h3>G2ChartComponent_style_graphic_radial_gradient</h3>
            <Charts.G2ChartComponent_style_graphic_radial_gradient />
          </div>
        </div>
      </div>
    </div>
  )
}
