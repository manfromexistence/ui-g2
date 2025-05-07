import { useEffect, useState, RefObject } from 'react';

// Fallback colors if CSS variables cannot be resolved
const FALLBACK_COLORS = ['#E57373', '#81C784', '#64B5F6', '#FFD54F', '#BA68C8'];
const CHART_COLOR_VARIABLES = ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5'];

export function useShadcnChartColors(chartRef: RefObject<HTMLElement | null>): string[] {
  const [resolvedColors, setResolvedColors] = useState<string[]>(FALLBACK_COLORS);

  useEffect(() => {
    if (chartRef.current && typeof getComputedStyle === 'function') {
      try {
        const computedStyles = getComputedStyle(chartRef.current);
        const colors = CHART_COLOR_VARIABLES.map(cssVar => {
          const hslRaw = computedStyles.getPropertyValue(cssVar.trim()).trim();
          if (hslRaw) {
            // CSS variables for HSL might be in the format "H S% L%" (e.g., "12 76% 61%")
            // G2/CSS expect "hsl(H, S%, L%)"
            const parts = hslRaw.split(' ').map(p => p.trim());
            if (parts.length === 3) {
              const h = parts[0];
              // Ensure saturation and lightness have '%'
              const s = parts[1].endsWith('%') ? parts[1] : parts[1] + '%';
              const l = parts[2].endsWith('%') ? parts[2] : parts[2] + '%';
              return `hsl(${h}, ${s}, ${l})`;
            }
            return hslRaw; // Return as is if not in the expected "H S% L%" format (e.g., already a valid color string)
          }
          // Fallback for a single unresolved variable to avoid breaking the array structure
          console.warn(`CSS variable ${cssVar} not found. Using fallback for this color.`);
          return '#CCCCCC'; 
        });
        
        // Only update if the resolved colors are different from the current state to avoid infinite loops
        if (JSON.stringify(colors) !== JSON.stringify(resolvedColors)) {
          setResolvedColors(colors);
        }

      } catch (error) {
        console.error("Error resolving CSS chart colors:", error);
        if (JSON.stringify(FALLBACK_COLORS) !== JSON.stringify(resolvedColors)) {
          setResolvedColors(FALLBACK_COLORS);
        }
      }
    }
    // Not including resolvedColors in dependency array to prevent potential loops if stringify check fails.
    // Effect should re-run when chartRef becomes available or if its underlying element changes in a way that affects styles (less common).
  }, [chartRef, chartRef.current]); 

  return resolvedColors;
}
