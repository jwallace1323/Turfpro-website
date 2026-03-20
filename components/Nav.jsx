'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about',    label: 'About'    },
  { href: '#contact',  label: 'Contact'  },
];

export default function Nav({ phone }) {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = scrolled
    ? 'text-gray-700 hover:text-brand-blue'
    : 'text-white/90 hover:text-white';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="section-container flex items-center justify-between">

        {/* ── Logo ── */}
        <a href="#" className="flex items-center gap-3 group" aria-label="Turf Pros home">
          {/* Icon mark */}
          <div className="w-10 h-10 flex-shrink-0">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Water drop */}
              <path
                d="M14 4 C14 4 6 16 6 22 C6 26.4 9.6 30 14 30 C18.4 30 22 26.4 22 22 C22 16 14 4 14 4Z"
                fill="#1565C0"
              />
              {/* Highlight on drop */}
              <path
                d="M10 22 C10 19 11.5 16 13 14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* Grass blades */}
              <path d="M22 30 Q21 24 23 20" stroke="#2E7D32" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M26 30 Q25 22 27 18" stroke="#2E7D32" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M30 30 Q29 25 31 22" stroke="#2E7D32" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* Ground */}
              <line x1="20" y1="30" x2="36" y2="30" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          {/* Wordmark */}
          <div className="leading-none">
            <span className={`text-xl font-extrabold tracking-tight transition-colors ${
              scrolled ? 'text-brand-dark' : 'text-white'
            }`}>
              TURF{' '}
              <span className="text-brand-red">PROS</span>
            </span>
            <p className={`text-[10px] font-medium tracking-widest uppercase transition-colors ${
              scrolled ? 'text-gray-500' : 'text-white/60'
            }`}>
              Irrigation &amp; Turf
            </p>
          </div>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors ${linkClass}`}
            >
              {label}
            </a>
          ))}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="btn-primary text-sm py-2 px-5"
            >
              {phone}
            </a>
          )}
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile menu drawer ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
          <nav className="section-container py-5 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="block py-3 px-4 text-gray-700 font-semibold rounded-lg hover:bg-brand-gray-bg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="btn-primary mt-3 text-center"
                onClick={() => setMenuOpen(false)}
              >
                {phone}
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
