'use client';

import React from 'react';

const VideoComponent: React.FC = () => {
  return (
    <section className="relative -mt-12">
      <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl border-2 border-yellow-700">
          <img
            src="/images/placeholder-image.jpeg"
            alt="Video placeholder"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default VideoComponent;