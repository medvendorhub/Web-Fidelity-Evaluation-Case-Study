/**
 * Candidate A — deliberately defective replication.
 *
 * Visible defects (intentional, documented in assessment findings):
 * 1. Two-column booking form with no responsive breakpoint → horizontal overflow at tablet/mobile.
 * 2. Extreme border-radius (9999px) applied globally to cards, buttons, inputs.
 * 3. Inconsistent section spacing (some sections cramped, others excessive).
 * 4. Incorrect font sizing — headings undersized, body text oversized.
 * 5. Fixed-height doctor cards causing awkward layout.
 * 6. Incorrect card widths — no max-width constraint, content stretches.
 */
import { useState } from 'react';
import { DeviceBar, DeviceViewport, DeviceWidth } from '@/components/standalone/DeviceBar';
import { Hospital, Phone, Star, User, Calendar, Stethoscope, Search, ChevronRight, Clock, Shield, Heart, Menu } from 'lucide-react';

const doctors = [
  { name: 'Dr. Sarah Jenkins',   specialty: 'Cardiology',  rating: '4.9', reviews: 312 },
  { name: 'Dr. Michael Chen',    specialty: 'Pediatrics',  rating: '4.8', reviews: 271 },
  { name: 'Dr. Emily Rodriguez', specialty: 'Neurology',   rating: '5.0', reviews: 198 },
];

const testimonials = [
  { name: 'Rachel Moore', initials: 'RM', text: 'Booking was seamless and Dr. Jenkins was incredibly thorough. I felt heard from the first visit.' },
  { name: 'David Park',   initials: 'DP', text: 'The online portal made it easy to manage appointments for my whole family.' },
  { name: 'Laura Simms',  initials: 'LS', text: 'Responsive, caring staff. The facility is modern and clean.' },
];

export default function CandidateAPage() {
  const [device, setDevice] = useState<DeviceWidth>(1440);

  return (
    <>
      <DeviceBar
        active={device}
        onChange={setDevice}
        label="Candidate A — Healthcare Appointment Form"
      />
      <DeviceViewport width={device}>
        {/* DEFECT: font-size is set too large on body via inline style */}
        <div className="font-sans text-slate-900 antialiased" style={{ fontSize: '18px' }}>

          {/* ── Header ── */}
          {/* DEFECT: header padding is inconsistent (too much vertical padding) */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-40" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* DEFECT: logo text uses font-weight: 400 (normal) instead of bold */}
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4f46e5', fontWeight: 400, fontSize: '22px', textDecoration: 'none' }}>
                <Hospital size={30} />
                MediCare
              </a>
              <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#475569' }}>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Doctors</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Locations</a>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Patient Portal</a>
              </nav>
              {/* DEFECT: button uses border-radius: 9999px instead of the reference's 6px */}
              <button style={{ background: '#4f46e5', color: '#fff', padding: '10px 20px', borderRadius: '9999px', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>
                Book Appointment
              </button>
            </div>
          </header>

          {/* ── Hero ── */}
          {/* DEFECT: very little vertical padding — section feels cramped */}
          <section style={{ background: '#1e1b4b', color: '#fff', padding: '16px 24px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
              <div>
                {/* DEFECT: heading is too small (text-xl instead of text-4xl/5xl) */}
                <h1 style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.2, marginBottom: '16px' }}>
                  Exceptional Care, Close to Home
                </h1>
                {/* DEFECT: body paragraph is too large and loose */}
                <p style={{ fontSize: '22px', color: '#a5b4fc', lineHeight: 1.8, marginBottom: '20px' }}>
                  Book your appointment today and experience healthcare that puts you first.
                </p>
                {/* DEFECT: buttons use rounded-full */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <a href="#booking" style={{ background: '#fff', color: '#1e1b4b', padding: '12px 24px', borderRadius: '9999px', fontWeight: 600, textDecoration: 'none', fontSize: '14px' }}>Find a Doctor</a>
                  <a href="#doctors" style={{ border: '1px solid #4f46e5', color: '#fff', padding: '12px 24px', borderRadius: '9999px', fontWeight: 500, textDecoration: 'none', fontSize: '14px' }}>Our Specialists</a>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* DEFECT: hero image placeholder also uses border-radius: 9999px — looks like an egg */}
                <div style={{ width: '320px', height: '320px', background: '#312e81', borderRadius: '9999px', border: '4px solid #4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Stethoscope size={100} color="#818cf8" opacity={0.5} />
                </div>
              </div>
            </div>
          </section>

          {/* ── Feature strip ── */}
          {/* DEFECT: excessive top margin creates a visual gap */}
          <section style={{ background: '#4338ca', padding: '12px 24px', marginTop: '40px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {[
                { Icon: Clock,  title: 'Same-day appointments', desc: 'Book and be seen within hours.' },
                { Icon: Shield, title: 'Insurance accepted',     desc: 'We work with all major providers.' },
                { Icon: Heart,  title: 'Patient-first care',     desc: 'Tailored care for every patient.' },
              ].map(({ Icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#fff' }}>
                  {/* DEFECT: icon container also rounded-full */}
                  <div style={{ padding: '8px', background: '#3730a3', borderRadius: '9999px', flexShrink: 0 }}><Icon size={20} /></div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '13px' }}>{title}</p>
                    <p style={{ color: '#c7d2fe', fontSize: '12px', marginTop: '2px' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Booking form ── */}
          {/* DEFECT: section has excessive bottom margin and asymmetric vertical padding */}
          <section id="booking" style={{ padding: '8px 24px 80px', background: '#f8fafc' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Quick Appointment Booking</h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>Find and confirm in under two minutes.</p>
              {/* DEFECT: booking form container uses min-width: 800px — causes overflow at tablet */}
              <div style={{ minWidth: '800px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '24px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
                <form onSubmit={e => e.preventDefault()}>
                  {/* DEFECT: always 2 columns — no responsive breakpoint */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Patient Name</label>
                      {/* DEFECT: input also fully rounded */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #cbd5e1', borderRadius: '9999px', padding: '10px 16px', background: '#f8fafc' }}>
                        <User size={15} color="#94a3b8" />
                        <input type="text" placeholder="Full name" style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '14px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferred Date</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #cbd5e1', borderRadius: '9999px', padding: '10px 16px', background: '#f8fafc' }}>
                        <Calendar size={15} color="#94a3b8" />
                        <input type="date" style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '14px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Department</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #cbd5e1', borderRadius: '9999px', padding: '10px 16px', background: '#f8fafc' }}>
                        <Stethoscope size={15} color="#94a3b8" />
                        <select style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '14px', appearance: 'none' }}>
                          <option value="">Select department</option>
                          <option>Cardiology</option>
                          <option>Pediatrics</option>
                          <option>Neurology</option>
                          <option>General Practice</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#4f46e5', color: '#fff', borderRadius: '9999px', padding: '10px 20px', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer', width: '100%' }}>
                        <Search size={16} /> Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* ── Doctors ── */}
          {/* DEFECT: padding is excessive (too much top padding, too little bottom) */}
          <section id="doctors" style={{ padding: '60px 24px 8px', background: '#fff' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  {/* DEFECT: heading is also undersized */}
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Our Top Specialists</h2>
                  <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '16px' }}>Book directly with our most highly rated clinicians.</p>
                </div>
                <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#4f46e5', textDecoration: 'none' }}>
                  View all <ChevronRight size={14} />
                </a>
              </div>

              {/* DEFECT: grid uses gap-2 (too tight) and cards have a large fixed height */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {doctors.map((doc) => (
                  <div key={doc.name} style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    // DEFECT: border-radius: 9999px on cards — looks like a pill/oval
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    // DEFECT: fixed height — content gets clipped or leaves awkward empty space
                    height: '520px',
                  }}>
                    <div style={{ height: '200px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={64} color="#cbd5e1" />
                    </div>
                    {/* DEFECT: padding inside card is too large, pushing content out of the fixed height */}
                    <div style={{ padding: '40px 28px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{doc.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '13px', fontWeight: 600 }}>
                          <Star size={13} fill="#f59e0b" color="#f59e0b" />
                          {doc.rating}
                        </div>
                      </div>
                      <p style={{ color: '#4f46e5', fontSize: '13px', fontWeight: 600, marginBottom: '16px' }}>{doc.specialty}</p>
                      <button style={{ width: '100%', border: '1px solid #e2e8f0', color: '#334155', borderRadius: '9999px', padding: '8px 16px', fontSize: '13px', fontWeight: 600, background: '#fff', cursor: 'pointer' }}>
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Testimonials ── */}
          {/* DEFECT: excessive top margin + cramped bottom */}
          <section style={{ padding: '80px 24px 12px', background: '#f8fafc' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '28px' }}>What our patients say</h2>
              {/* DEFECT: 2-column grid instead of 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {testimonials.map((t) => (
                  <div key={t.name} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '9999px', padding: '24px', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />)}
                    </div>
                    <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>"{t.text}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '9999px', background: '#e0e7ff', color: '#4338ca', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.initials}</div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{t.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '48px 24px', marginTop: '80px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '40px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', marginBottom: '12px' }}>
                  <Hospital size={22} />
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>MediCare</span>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.6 }}>Providing exceptional healthcare with experienced professionals since 1998.</p>
              </div>
              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '16px', fontSize: '13px' }}>Quick Links</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Find a Doctor</a></li>
                  <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Locations</a></li>
                  <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Patient Portal</a></li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '16px', fontSize: '13px' }}>Contact</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <li>1-800-555-1234</li>
                  <li>contact@medicare.example</li>
                  <li>123 Health Ave, Medical City</li>
                </ul>
              </div>
            </div>
            <div style={{ maxWidth: '1100px', margin: '32px auto 0', paddingTop: '20px', borderTop: '1px solid #1e293b', fontSize: '11px', color: '#475569' }}>
              © 2025 MediCare. Demonstration material.
            </div>
          </footer>

        </div>
      </DeviceViewport>
    </>
  );
}
