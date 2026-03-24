'use client';

import { useState, useEffect, useCallback } from 'react';

// Placeholder slides — swap in real images via the `images` prop (array of { src, alt })
const PLACEHOLDERS = [
  {
    label:    'Irrigation Pump Systems',
    sublabel: 'Our flagship service',
    gradient: 'from-[#0D2E6E] to-[#1565C0]',
  },
  {
    label:    'Sprinkler Installation',
    sublabel: 'Precision coverage for every lawn',
    gradient: 'from-[#1B5E20] to-[#2E7D32]',
  },
  {
    label:    'Sod Roller Installation',
    sublabel: 'Lush results from day one',
    gradient: 'from-[#1B4332] to-[#2D6A4F]',
  },
  {
    label:    'Commercial Properties',
    sublabel: 'Large-scale irrigation solutions',
    gradient: 'from-[#0D1B2A] to-[#1565C0]',
  },
  {
    label:    'Residential Lawn Care',
    sublabel: 'Beautiful yards, happy homeowners',
    gradient: 'from-[#14532D] to-[#166534]',
  },
];

const CameraIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function ImageCarousel({ images = [] }) {
  const slides   = images.length ? images : PLACEHOLDERS;
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length],
  );
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: '420px' }}>

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {slide.src ? (
            /* Real image from Wix CMS */
            <img
              src={slide.src}
              alt={slide.alt || ''}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Styled placeholder */
            <div className={`w-full h-full bg-gradient-to-br ${slide.gradient} flex flex-col items-center justify-center gap-4 select-none`}>
              {/* Diagonal texture */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative z-10 flex flex-col items-center gap-3 text-white">
                <div className="opacity-40">
                  <CameraIcon />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold opacity-70">{slide.label}</p>
                  <p className="text-sm opacity-40 mt-1">{slide.sublabel}</p>
                  <p className="text-xs opacity-30 mt-3 tracking-widest uppercase">Photo coming soon</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Prev button */}
      <button
        onClick={prev}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={next}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide counter label */}
      <div className="absolute top-4 left-4 z-20 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold">
        {current + 1} / {slides.length}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
