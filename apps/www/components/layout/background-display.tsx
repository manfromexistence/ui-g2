'use client';

import React from 'react';
import { useBackgroundStore } from '@/lib/backgroundStore';

export function BackgroundDisplay() {
  const { backgroundSrc, fileType } = useBackgroundStore();

  if (!backgroundSrc) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {fileType === 'image' && (
        <img
          src={backgroundSrc}
          alt="Background"
          className="h-full w-full object-cover"
        />
      )}
      {fileType === 'video' && (
        <video
          src={backgroundSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

