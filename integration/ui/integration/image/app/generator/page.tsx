"use client";

import { GlassmorphismGenerator } from "@/components/generators/GlassmorphismGenerator";
import { GradientGenerator } from "@/components/generators/GradientGenerator";
import { BoxShadowGenerator } from "@/components/generators/BoxShadowGenerator";
import { DropShadowGenerator } from "@/components/generators/DropShadowGenerator";
import { NeonEffectGenerator } from "@/components/generators/NeonEffectGenerator";
import { BackdropFilterCustomizer } from "@/components/generators/BackdropFilterCustomizer";
import { ClippingMaskingGenerator } from "@/components/generators/ClippingMaskingGenerator";
import { FilterGenerator } from "@/components/generators/FilterGenerator";
import { MeshGenerator } from "@/components/generators/MeshGenerator";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto flex flex-col items-center w-full max-w-4xl">
        <GlassmorphismGenerator />
        <GradientGenerator />
        <BoxShadowGenerator />
        <DropShadowGenerator />
        <NeonEffectGenerator />
        <BackdropFilterCustomizer />
        <ClippingMaskingGenerator />
        <FilterGenerator />
        <MeshGenerator />
      </div>
    </div>
  );
}
