"use client"

import { THEMES } from "@/lib/themes"
import { ChartDisplay } from "@/components/chart-display"
import { ThemesSwitcher } from "@/components/themes-selector"
import { ThemesStyle } from "@/components/themes-styles"
import { Separator } from "@/registry/new-york/ui/separator"
import * as G2Charts from "@/registry/default/g2" // Imports from the new index.ts

// Helper to generate a display name from the component key
function generateDisplayName(key: string): string {
  if (key.startsWith("G2ChartComponent_")) {
    return key.substring("G2ChartComponent_".length).replace(/_/g, " ").replace(/-/g, " ");
  }
  return key.replace(/_/g, " ").replace(/-/g, " ");
}

export default function G2ChartsPage() {
  const chartComponents = Object.entries(G2Charts);

  return (
    <div className="grid gap-4">
      <ThemesStyle />
      <div className="gap-6 md:flex md:flex-row-reverse md:items-start">
        <ThemesSwitcher
          themes={THEMES}
          className="fixed inset-x-0 bottom-0 z-40 flex bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:sticky lg:bottom-auto lg:top-20"
        />
        <div className="grid flex-1 gap-12">
          <h1 className="text-2xl font-bold">G2 Chart Examples</h1>
          <Separator />
          {chartComponents.length > 0 ? (
            <div
              id="g2-examples"
              className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
            >
              {chartComponents.map(([name, ChartComponent]) => {
                // Ensure ChartComponent is a valid React component (function or object, and not null)
                if (!((typeof ChartComponent === 'function' || typeof ChartComponent === 'object') && ChartComponent !== null)) {
                  console.warn(`Skipping ${name} as it's not a valid component (type: ${typeof ChartComponent}).`);
                  return null;
                }
                const displayName = generateDisplayName(name);
                const chartNameForDisplay = name.replace(/_/g, "-").toLowerCase();

                // Cast ChartComponent to React.ComponentType to satisfy TypeScript's JSX checking
                const ComponentToRender = ChartComponent as React.ComponentType;

                return (
                  <ChartDisplay key={name} name={chartNameForDisplay} title={displayName}>
                    <ComponentToRender />
                  </ChartDisplay>
                );
              })}
            </div>
          ) : (
            <p>No G2 chart components found. Please ensure they are exported from '@/registry/default/g2/index.ts'.</p>
          )}
        </div>
      </div>
    </div>
  )
}
