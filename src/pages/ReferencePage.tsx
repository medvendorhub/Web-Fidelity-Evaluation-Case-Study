import { useState } from 'react';
import { DeviceBar, DeviceViewport, DeviceWidth } from '@/components/standalone/DeviceBar';
import {
  Hospital, Phone, Mail, MapPin, Star, User, Calendar,
  Stethoscope, Search, ChevronRight, Clock, Shield, Heart, Menu, X
} from 'lucide-react';

const doctors = [
  { name: 'Dr. Sarah Jenkins',   specialty: 'Cardiology',      rating: '4.9', reviews: 312, availability: 'Available today' },
  { name: 'Dr. Michael Chen',    specialty: 'Pediatrics',       rating: '4.8', reviews: 271, availability: 'Next: Tomorrow 9 am' },
  { name: 'Dr. Emily Rodriguez', specialty: 'Neurology',        rating: '5.0', reviews: 198, availability: 'Available today' },
];

const testimonials = [
  { name: 'Rachel Moore',  initials: 'RM', text: 'Booking was seamless and Dr. Jenkins was incredibly thorough. I felt heard from the first visit.', rating: 5 },
  { name: 'David Park',   initials: 'DP', text: 'The online portal made it easy to manage appointments for my whole family. Highly recommend MediCare.', rating: 5 },
  { name: 'Laura Simms',  initials: 'LS', text: 'Responsive, caring staff. The facility is modern and clean. Best healthcare experience I have had.', rating: 5 },
];

const features = [
  { Icon: Clock,   title: 'Same-day appointments',  desc: 'Book and be seen within hours at most of our locations.' },
  { Icon: Shield,  title: 'Insurance accepted',      desc: 'We work with all major insurance providers nationwide.' },
  { Icon: Heart,   title: 'Patient-first care',      desc: 'Every care plan is tailored to the individual, not the average.' },
];

export default function ReferencePage() {
  const [device, setDevice] = useState<DeviceWidth>(1440);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <DeviceBar
        active={device}
        onChange={setDevice}
        label="Reference — Healthcare Appointment Form"
      />
      <DeviceViewport width={device}>
        <div className="font-sans text-slate-900 antialiased">

          {/* ── Header ──────────────────────────────────────────────────────── */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-40" role="banner">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2 text-indigo-700 font-bold text-xl tracking-tight" aria-label="MediCare home">
                <Hospital size={26} />
                MediCare
              </a>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600" aria-label="Primary">
                <a href="#" className="hover:text-indigo-600 transition-colors">Services</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Doctors</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Locations</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Patient Portal</a>
              </nav>

              <div className="flex items-center gap-3">
                <a href="tel:18005551234" className="hidden md:flex items-center gap-1.5 text-sm text-slate-600 hover:text-indigo-600 transition-colors" aria-label="Call us at 1-800-555-1234">
                  <Phone size={14} />
                  1-800-555-1234
                </a>
                <a href="#booking" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                  Book Appointment
                </a>
                {/* Mobile menu toggle */}
                <button
                  className="md:hidden p-2 rounded-md hover:bg-slate-100 transition-colors"
                  onClick={() => setMenuOpen(v => !v)}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-nav"
                  aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile nav */}
            {menuOpen && (
              <nav id="mobile-nav" className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3 text-sm font-medium text-slate-700" aria-label="Mobile primary">
                <a href="#" className="block hover:text-indigo-600">Services</a>
                <a href="#" className="block hover:text-indigo-600">Doctors</a>
                <a href="#" className="block hover:text-indigo-600">Locations</a>
                <a href="#" className="block hover:text-indigo-600">Patient Portal</a>
              </nav>
            )}
          </header>

          {/* ── Hero ────────────────────────────────────────────────────────── */}
          <section className="bg-indigo-900 text-white py-20 px-6" aria-labelledby="hero-heading">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-indigo-300 text-sm font-semibold uppercase tracking-widest">Trusted healthcare, closer than ever</p>
                <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                  Exceptional Care,<br />Close to Home
                </h1>
                <p className="text-indigo-200 text-lg leading-relaxed max-w-md">
                  Book your appointment today and experience healthcare that puts you first. Same-day availability at locations near you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#booking" className="bg-white text-indigo-900 px-6 py-3 rounded-md font-semibold hover:bg-indigo-50 transition-colors">
                    Find a Doctor
                  </a>
                  <a href="#doctors" className="border border-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-800 transition-colors">
                    Our Specialists
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-full aspect-square bg-indigo-800 rounded-2xl border-4 border-indigo-700/40 flex items-center justify-center">
                  <Stethoscope size={120} className="text-indigo-400 opacity-40" />
                </div>
              </div>
            </div>
          </section>

          {/* ── Feature strip ───────────────────────────────────────────────── */}
          <section className="bg-indigo-700 py-6 px-6" aria-label="Key features">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 text-white">
                  <div className="p-2 bg-indigo-600 rounded-md shrink-0"><Icon size={20} /></div>
                  <div>
                    <p className="font-semibold text-sm">{title}</p>
                    <p className="text-indigo-200 text-xs mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Booking form ────────────────────────────────────────────────── */}
          <section id="booking" className="py-16 px-6 bg-slate-50" aria-labelledby="booking-heading">
            <div className="max-w-4xl mx-auto">
              <h2 id="booking-heading" className="text-2xl font-bold text-slate-900 mb-2">Quick Appointment Booking</h2>
              <p className="text-slate-500 text-sm mb-8">Find an available slot and confirm your visit in under two minutes.</p>
              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                <form onSubmit={e => e.preventDefault()} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="ref-name" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Name</label>
                      <div className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2.5 bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
                        <User size={15} className="text-slate-400 shrink-0" />
                        <input id="ref-name" type="text" placeholder="Full name" className="bg-transparent outline-none w-full text-sm text-slate-900 placeholder:text-slate-400" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="ref-date" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Preferred Date</label>
                      <div className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2.5 bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
                        <Calendar size={15} className="text-slate-400 shrink-0" />
                        <input id="ref-date" type="date" className="bg-transparent outline-none w-full text-sm text-slate-900" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="ref-dept" className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</label>
                      <div className="flex items-center gap-2 border border-slate-300 rounded-md px-3 py-2.5 bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
                        <Stethoscope size={15} className="text-slate-400 shrink-0" />
                        <select id="ref-dept" className="bg-transparent outline-none w-full text-sm text-slate-900 appearance-none">
                          <option value="">Select department</option>
                          <option>Cardiology</option>
                          <option>Pediatrics</option>
                          <option>Neurology</option>
                          <option>General Practice</option>
                          <option>Orthopedics</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider opacity-0 select-none" aria-hidden="true">Search</label>
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2.5 font-semibold text-sm transition-colors w-full"
                        aria-label="Search available appointments"
                      >
                        <Search size={16} />
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* ── Doctors ─────────────────────────────────────────────────────── */}
          <section id="doctors" className="py-16 px-6 bg-white" aria-labelledby="doctors-heading">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 id="doctors-heading" className="text-3xl font-bold text-slate-900 tracking-tight">Our Top Specialists</h2>
                  <p className="text-slate-500 mt-2">Book directly with our most highly rated clinicians.</p>
                </div>
                <a href="#" className="hidden md:flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:underline">
                  View all doctors <ChevronRight size={16} />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {doctors.map((doc) => (
                  <article key={doc.name} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 bg-slate-100 flex items-center justify-center" aria-hidden="true">
                      <User size={64} className="text-slate-300" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-base font-bold text-slate-900">{doc.name}</h3>
                        <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold shrink-0 ml-2" aria-label={`Rating: ${doc.rating} out of 5`}>
                          <Star size={14} className="fill-amber-500" />
                          {doc.rating}
                        </div>
                      </div>
                      <p className="text-indigo-600 font-semibold text-sm mb-1">{doc.specialty}</p>
                      <p className="text-xs text-slate-500 mb-4">{doc.reviews} reviews · {doc.availability}</p>
                      <button className="w-full border border-slate-300 text-slate-700 rounded-md py-2 text-sm font-semibold hover:bg-slate-50 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── Testimonials ────────────────────────────────────────────────── */}
          <section className="py-16 px-6 bg-slate-50" aria-labelledby="testimonials-heading">
            <div className="max-w-6xl mx-auto">
              <h2 id="testimonials-heading" className="text-3xl font-bold text-slate-900 tracking-tight mb-10">What our patients say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <blockquote key={t.name} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-1 text-amber-500 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-500" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                    <footer className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0" aria-hidden="true">
                        {t.initials}
                      </div>
                      <cite className="not-italic text-sm font-semibold text-slate-900">{t.name}</cite>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>

          {/* ── Footer ──────────────────────────────────────────────────────── */}
          <footer className="bg-slate-900 text-slate-400 py-14 px-6" role="contentinfo">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 text-white mb-4">
                  <Hospital size={22} aria-hidden="true" />
                  <span className="text-lg font-bold tracking-tight">MediCare</span>
                </div>
                <p className="text-sm leading-relaxed max-w-xs">Providing exceptional healthcare with state-of-the-art facilities and experienced medical professionals since 1998.</p>
              </div>
              <nav aria-label="Footer quick links">
                <h3 className="text-white font-semibold mb-4 text-sm">Quick Links</h3>
                <ul className="space-y-2.5 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Find a Doctor</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Locations</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Patient Portal</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                </ul>
              </nav>
              <address className="not-italic">
                <h3 className="text-white font-semibold mb-4 text-sm">Contact</h3>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex items-center gap-2"><Phone size={13} aria-hidden="true" /> 1-800-555-1234</li>
                  <li className="flex items-center gap-2"><Mail size={13} aria-hidden="true" /> contact@medicare.example</li>
                  <li className="flex items-center gap-2"><MapPin size={13} aria-hidden="true" /> 123 Health Ave, Medical City</li>
                </ul>
              </address>
            </div>
            <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-800 text-xs text-slate-600">
              © 2025 MediCare. Demonstration material — not real medical services.
            </div>
          </footer>

        </div>
      </DeviceViewport>
    </>
  );
}
