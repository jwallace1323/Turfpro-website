import Nav from '@/components/Nav';
import ContactForm from '@/components/ContactForm';
import ImageCarousel from '@/components/ImageCarousel';
import { getSingleItem, getCollection, getWixImageUrl } from '@/lib/wix-client';

// ─────────────────────────────────────────────────────────────
// Default content (shown while Wix CMS is not yet configured,
// or as fallback if a field is empty).
// ─────────────────────────────────────────────────────────────
const DEFAULTS = {
  hero: {
    headline:       'Expert Irrigation &\nTurf Solutions',
    subheadline:    'Professional sprinkler systems, sod roller installation, and high-performance irrigation pumps — built to last.',
    ctaPrimary:     'Get a Free Quote',
    ctaSecondary:   'Our Services',
    backgroundImage: null,
  },
  services: [
    {
      _id: 'sprinkler',
      data: {
        title:       'Sprinkler Systems',
        description: 'From design to installation, we engineer custom sprinkler systems that deliver precise, even coverage across any size property. We also handle repairs, winterization, and seasonal tune-ups.',
        icon:        'sprinkler',
        featured:    false,
      },
    },
    {
      _id: 'pump',
      data: {
        title:       'Irrigation Pumps',
        description: 'Our flagship service. We design, install, and maintain irrigation pump systems engineered for efficiency and reliability — from small residential setups to large-scale agricultural systems.',
        icon:        'pump',
        featured:    true,
      },
    },
    {
      _id: 'sod',
      data: {
        title:       'Sod Roller Installation',
        description: 'Transform bare ground into a lush, established lawn fast. Our team handles precision grading, sod selection, installation, and rolling for a smooth, professional finish every time.',
        icon:        'sod',
        featured:    false,
      },
    },
  ],
  about: {
    heading:  'Built on Trust. Proven in the Field.',
    body:     'Turf Pros was founded with one mission: deliver irrigation and turf solutions that actually work — and stand behind every job we do. Our team of certified technicians brings precision craftsmanship and honest service to every project, whether it\'s a small backyard sprinkler install or a large-scale commercial pump system.',
    image:    null,
  },
  siteSettings: {
    phone:   '(555) 000-0000',
    email:   'info@turfpros.com',
    address: '123 Main St, Your City, ST 00000',
    hours:   'Mon–Fri: 7am–5pm  |  Sat: 8am–2pm',
  },
};

// ─────────────────────────────────────────────────────────────
// SVG Icon Components
// ─────────────────────────────────────────────────────────────
function SprinklerIcon({ className = 'w-8 h-8' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Head */}
      <circle cx="12" cy="14" r="2" fill="currentColor" stroke="none" />
      {/* Stem */}
      <line x1="12" y1="16" x2="12" y2="22" strokeWidth="2" strokeLinecap="round" />
      {/* Horizontal base */}
      <line x1="9" y1="22" x2="15" y2="22" strokeWidth="2" strokeLinecap="round" />
      {/* Water arcs */}
      <path d="M4 9 Q6 5 12 4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M20 9 Q18 5 12 4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <line x1="12" y1="4" x2="12" y2="12" strokeWidth="1.5" strokeLinecap="round" />
      {/* Droplets at ends of arcs */}
      <circle cx="4"  cy="9"  r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="3"  r="1" fill="currentColor" stroke="none" />
      <circle cx="20" cy="9"  r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SodIcon({ className = 'w-8 h-8' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Ground / sod layer */}
      <rect x="2" y="18" width="20" height="4" rx="1" fill="currentColor" stroke="none" opacity="0.3" />
      <line x1="2" y1="18" x2="22" y2="18" strokeWidth="2" strokeLinecap="round" />
      {/* Grass blades */}
      <path d="M6 18 Q5 13 7 9"  strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M10 18 Q9 11 11 7" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M14 18 Q13 11 15 7" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M18 18 Q17 13 19 9" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Blade tips */}
      <circle cx="7"  cy="9"  r="1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7"  r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="7"  r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="9"  r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PumpIcon({ className = 'w-8 h-8' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Pump body */}
      <rect x="3" y="8" width="13" height="9" rx="1.5" strokeWidth="2" />
      {/* Motor housing (circle right) */}
      <circle cx="19" cy="12.5" r="3" strokeWidth="2" />
      <circle cx="19" cy="12.5" r="1" fill="currentColor" stroke="none" />
      {/* Inlet pipe (left) */}
      <line x1="1" y1="12.5" x2="3" y2="12.5" strokeWidth="2" strokeLinecap="round" />
      {/* Outlet pipe (bottom) */}
      <line x1="9" y1="17" x2="9" y2="22" strokeWidth="2" strokeLinecap="round" />
      {/* Flow arrow inside */}
      <path d="M5.5 12.5 H11.5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 10.5 L11.5 12.5 L9.5 14.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ServiceIcon({ icon, className }) {
  if (icon === 'pump')     return <PumpIcon className={className} />;
  if (icon === 'sod')      return <SodIcon className={className} />;
  return <SprinklerIcon className={className} />;
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default async function HomePage() {
  // Attempt to pull from Wix; fall back to defaults gracefully.
  const [heroRaw, servicesRaw, aboutRaw, settingsRaw] = await Promise.all([
    getSingleItem('hero'),
    getCollection('services'),
    getSingleItem('about'),
    getSingleItem('site-settings'),
  ]);

  const hero         = heroRaw     ? { ...DEFAULTS.hero,         ...heroRaw }     : DEFAULTS.hero;
  const services     = servicesRaw?.length ? servicesRaw                           : DEFAULTS.services;
  const about        = aboutRaw    ? { ...DEFAULTS.about,        ...aboutRaw }    : DEFAULTS.about;
  const siteSettings = settingsRaw ? { ...DEFAULTS.siteSettings, ...settingsRaw } : DEFAULTS.siteSettings;

  const heroBg = getWixImageUrl(hero.backgroundImage, 1600, 900);

  return (
    <>
      {/* ──────────────────────────────── NAV ──────────────────────────────── */}
      <Nav phone={siteSettings.phone} />

      <main>
        {/* ──────────────────────────── HERO ──────────────────────────────── */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={heroBg ? { backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          {/* Gradient overlay — always present, extra dark without a CMS image */}
          <div
            className="absolute inset-0"
            style={{
              background: heroBg
                ? 'linear-gradient(135deg, rgba(13,46,110,0.88) 0%, rgba(13,71,161,0.80) 50%, rgba(27,94,32,0.70) 100%)'
                : 'linear-gradient(135deg, #0D2E6E 0%, #0D47A1 45%, #1B5E20 100%)',
            }}
          />

          {/* Subtle geometric texture */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 section-container text-center text-white py-32 md:py-40">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-green-light animate-pulse" />
              <span className="text-sm font-semibold tracking-wide">Serving Residential &amp; Commercial</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
              {hero.headline.split('\n').map((line, i) => (
                <span key={i}>
                  {i === 1 ? <span className="text-brand-green-light">{line}</span> : line}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              {hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary text-base py-4 px-10">
                {hero.ctaPrimary}
              </a>
              <a href="#services" className="btn-outline-white text-base py-4 px-10">
                {hero.ctaSecondary}
              </a>
            </div>

            {/* Quick trust indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-white/60 text-sm font-medium">
              {['Licensed & Insured', 'Free Estimates', '10+ Years Experience', '500+ Projects'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckIcon />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 inset-x-0">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white">
              <path d="M0,80 C360,20 1080,20 1440,80 L1440,80 L0,80 Z" />
            </svg>
          </div>
        </section>

        {/* ──────────────────────────── SERVICES ──────────────────────────────── */}
        <section id="services" className="py-24 bg-white">
          <div className="section-container">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="section-eyebrow mb-3">What We Do</p>
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle max-w-xl mx-auto">
                From sprinkler installation to pump engineering, we handle every aspect of your
                irrigation and turf needs.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((item) => {
                const s = item.data;
                const img = getWixImageUrl(s.image, 600, 400);
                return (
                  <div
                    key={item._id}
                    className={`relative rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${
                      s.featured
                        ? 'border-brand-blue shadow-lg shadow-brand-blue/10'
                        : 'border-gray-100 shadow-sm'
                    }`}
                  >
                    {/* Photo area */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      {img ? (
                        <img
                          src={img}
                          alt={s.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gray-50">
                          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                              />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-400 font-medium">Photo Coming Soon</p>
                        </div>
                      )}
                      {/* Featured badge — overlaid on photo */}
                      {s.featured && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow">
                            Main Service
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-7">
                      <h3 className={`text-xl font-bold mb-3 ${s.featured ? 'text-brand-blue' : 'text-brand-dark'}`}>
                        {s.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
                      <a
                        href="#contact"
                        className={`inline-flex items-center gap-1.5 mt-5 text-sm font-semibold transition-colors ${
                          s.featured ? 'text-brand-blue hover:text-brand-blue-dark' : 'text-brand-green hover:text-brand-green-dark'
                        }`}
                      >
                        Get a Free Estimate
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ──────────────────────────── STATS BAR ──────────────────────────────── */}
        <section className="bg-stats-gradient py-16">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { value: '10+',  label: 'Years of Experience' },
                { value: '500+', label: 'Projects Completed'  },
                { value: '100%', label: 'Satisfaction Rate'   },
                { value: '24/7', label: 'Emergency Support'   },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <span className="text-4xl md:text-5xl font-extrabold text-white leading-none">
                    {value}
                  </span>
                  <span className="text-sm font-semibold text-white/60 uppercase tracking-widest">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────── ABOUT ──────────────────────────────── */}
        <section id="about" className="py-24 bg-brand-gray-bg">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Image */}
              <div className="order-2 lg:order-1">
                {getWixImageUrl(about.image, 700, 500) ? (
                  <img
                    src={getWixImageUrl(about.image, 700, 500)}
                    alt="Turf Pros team"
                    className="rounded-2xl shadow-xl w-full object-cover"
                  />
                ) : (
                  /* Placeholder graphic */
                  <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-brand-blue to-brand-blue-dark aspect-[4/3] flex items-center justify-center relative">
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    {/* Illustration */}
                    <svg viewBox="0 0 200 150" className="w-48 text-white opacity-80" fill="none">
                      {/* House/property */}
                      <rect x="60" y="60" width="80" height="60" rx="3" fill="currentColor" opacity="0.3"/>
                      <path d="M50 65 L100 30 L150 65" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" fill="none"/>
                      {/* Sprinkler heads */}
                      <circle cx="30"  cy="118" r="4" fill="currentColor"/>
                      <circle cx="170" cy="118" r="4" fill="currentColor"/>
                      {/* Spray arcs */}
                      <path d="M30 114 Q30 95 50 90"  stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 3"/>
                      <path d="M170 114 Q170 95 150 90" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 3"/>
                      {/* Grass base */}
                      <line x1="10" y1="122" x2="190" y2="122" stroke="currentColor" strokeWidth="3"/>
                    </svg>
                    <p className="absolute bottom-6 text-white/50 text-sm font-medium tracking-wide">
                      Photo from Wix CMS
                    </p>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="order-1 lg:order-2">
                <p className="section-eyebrow mb-3">About Turf Pros</p>
                <h2 className="section-title mb-6">{about.heading}</h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">{about.body}</p>

                {/* Feature list */}
                <ul className="space-y-4 mb-10">
                  {[
                    'Certified irrigation technicians on every job',
                    'Residential and commercial property expertise',
                    'Transparent pricing — no hidden fees',
                    'Fully licensed, bonded, and insured',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-brand-green/15 text-brand-green rounded-full flex items-center justify-center mt-0.5">
                        <CheckIcon />
                      </span>
                      <span className="text-gray-700 font-medium">{point}</span>
                    </li>
                  ))}
                </ul>

                <a href="#contact" className="btn-blue">
                  Schedule a Free Consultation
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ──────────────────────────── CONTACT ──────────────────────────────── */}
        <section id="contact" className="py-24 bg-white">
          <div className="section-container">
            {/* Header */}
            <div className="text-center mb-16">
              <p className="section-eyebrow mb-3">Contact Us</p>
              <h2 className="section-title">Request a Free Estimate</h2>
              <p className="section-subtitle max-w-xl mx-auto">
                Tell us about your project and we&apos;ll get back to you with a no-obligation quote.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Form */}
              <div>
                <h3 className="text-2xl font-bold text-brand-dark mb-1">Send Us a Message</h3>
                <p className="text-gray-500 mb-8">We respond within one business day.</p>
                <ContactForm formspreeId={process.env.NEXT_PUBLIC_FORMSPREE_ID} />
              </div>

              {/* Photo carousel */}
              <div className="lg:sticky lg:top-28">
                <h3 className="text-2xl font-bold text-brand-dark mb-1">Our Work</h3>
                <p className="text-gray-500 mb-8">Photos coming soon — check back after your project.</p>
                <ImageCarousel />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ──────────────────────────── FOOTER ──────────────────────────────── */}
      <footer className="bg-brand-dark text-white">
        <div className="section-container py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 4 C14 4 6 16 6 22 C6 26.4 9.6 30 14 30 C18.4 30 22 26.4 22 22 C22 16 14 4 14 4Z" fill="#1565C0"/>
                    <path d="M22 30 Q21 24 23 20" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M26 30 Q25 22 27 18" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M30 30 Q29 25 31 22" stroke="#4CAF50" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <line x1="20" y1="30" x2="36" y2="30" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-extrabold tracking-tight">
                    TURF <span className="text-brand-red">PROS</span>
                  </span>
                  <p className="text-[10px] text-white/40 font-medium tracking-widest uppercase">Irrigation &amp; Turf</p>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Professional irrigation systems and turf solutions for residential and commercial properties.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5">Quick Links</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { href: '#services', label: 'Our Services' },
                  { href: '#about',    label: 'About Us'     },
                  { href: '#contact',  label: 'Contact'      },
                  { href: '#contact',  label: 'Free Estimate' },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-white/60 hover:text-white text-sm font-medium transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5">Contact</h4>
              <div className="flex flex-col gap-3 text-sm text-white/60">
                {siteSettings.phone && (
                  <a href={`tel:${siteSettings.phone}`} className="hover:text-white transition-colors font-medium">
                    {siteSettings.phone}
                  </a>
                )}
                {siteSettings.email && (
                  <a href={`mailto:${siteSettings.email}`} className="hover:text-white transition-colors font-medium">
                    {siteSettings.email}
                  </a>
                )}
                {siteSettings.address && (
                  <p>{siteSettings.address}</p>
                )}
                {siteSettings.hours && (
                  <p className="mt-1">{siteSettings.hours}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
            <p>© {new Date().getFullYear()} Turf Pros. All rights reserved.</p>
            <p>
              Site by{' '}
              <span className="text-white/50 font-medium">Redeemed Digital</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
