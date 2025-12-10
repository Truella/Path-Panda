'use client';
import { useState } from 'react';

export default function EmbeddedDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f9f7fe]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#7a5e46] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#2d2d2f]/60 font-medium">Loading demo...</p>
          </div>
        </div>
      )}
      <iframe
        src="https://truella.github.io/fitness/"
        className="w-full h-full border-0"
        onLoad={() => setLoading(false)}
        title="Fitness App"
      />
    </div>
  );
}
