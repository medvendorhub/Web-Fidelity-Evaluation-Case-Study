import { cn } from '@/lib/utils';
import { Hospital, User, Calendar, Stethoscope, Search, Star, ChevronRight } from 'lucide-react';

type Device = 'desktop' | 'tablet' | 'mobile';
type Variant = 'reference' | 'candidateA' | 'candidateB';

interface PreviewFrameProps {
  device: Device;
  variant: Variant;
}

export function PreviewFrame({ device, variant }: PreviewFrameProps) {
  const widthClasses = {
    desktop: 'w-[1024px]',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };
  
  // Transform scale so it fits inside the pane
  const scale = device === 'desktop' ? 'scale-[0.35]' : device === 'tablet' ? 'scale-[0.5]' : 'scale-[0.8]';
  const heightWrapper = device === 'desktop' ? 'h-[400px]' : device === 'tablet' ? 'h-[550px]' : 'h-[750px]';

  return (
    <div className={cn("relative origin-top transition-all duration-300 ease-in-out bg-white text-slate-900 border border-slate-200 shadow-xl overflow-y-auto overflow-x-hidden", widthClasses[device])} style={{ height: '900px', transformOrigin: 'top center', zoom: device === 'desktop' ? 0.35 : device === 'tablet' ? 0.5 : 0.8 }}>
      <HealthcareMock variant={variant} />
    </div>
  );
}

function HealthcareMock({ variant }: { variant: Variant }) {
  // Apply conditional defects based on variant
  
  const isA = variant === 'candidateA';
  const isB = variant === 'candidateB';
  const isRef = variant === 'reference';

  // Defects for Candidate A
  const sectionSpacingA = isA ? "py-2 mb-20" : "py-16";
  const roundedClassA = isA ? "rounded-full" : "rounded-lg";
  const headingSizeA = isA ? "text-xl leading-tight" : "text-4xl leading-tight md:text-5xl";
  const cardRatioA = isA ? "h-[600px]" : "h-auto";
  const mobileOverflowA = isA ? "min-w-[600px]" : "w-full"; // Forces horizontal overflow
  
  // Defects for Candidate B
  const headingWeightB = isB ? "font-normal" : "font-semibold";
  const gridGapB = isB ? "gap-3" : "gap-6";
  
  // Buggy tablet layout for B
  const tabletWrapB = isB ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-md:flex max-md:flex-wrap" : "grid-cols-1 md:grid-cols-3";

  return (
    <div className="font-sans min-h-full flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 text-indigo-600">
          <Hospital size={28} className={isA ? roundedClassA : ""} />
          <span className={`text-xl ${isB ? "font-normal" : "font-bold"} tracking-tight`}>MediCare</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-indigo-600">Services</a>
          <a href="#" className="hover:text-indigo-600">Doctors</a>
          <a href="#" className="hover:text-indigo-600">Locations</a>
          <a href="#" className="hover:text-indigo-600">Patient Portal</a>
        </nav>
        <button className={cn("bg-indigo-600 text-white px-5 py-2 text-sm font-medium hover:bg-indigo-700 transition-colors", isA ? roundedClassA : "rounded-md")}>
          Book Appointment
        </button>
      </header>

      {/* Hero Section */}
      <section className={cn("bg-indigo-900 text-white px-6 flex items-center", sectionSpacingA)}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className={cn(headingSizeA, isB ? headingWeightB : "font-bold", "tracking-tight")}>
              Exceptional Care, <br />Close to Home
            </h1>
            <p className={cn("text-indigo-100", isA ? "text-2xl" : "text-lg")}>
              Book your appointment today and experience healthcare that puts you first.
            </p>
            <div className="flex gap-4">
              <button className={cn("bg-white text-indigo-900 px-6 py-3 font-semibold hover:bg-slate-100 transition-colors", isA ? roundedClassA : "rounded-md")}>
                Find a Doctor
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Abstract representation of hero image */}
            <div className={cn("w-full aspect-square bg-indigo-800 border-4 border-indigo-700/50 flex items-center justify-center", isA ? roundedClassA : "rounded-2xl")}>
              <Stethoscope size={120} className="text-indigo-400 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="px-6 -mt-12 mb-16 relative z-10">
        <div className={cn("max-w-4xl mx-auto bg-white p-6 shadow-lg border border-slate-200", isA ? roundedClassA : "rounded-xl", mobileOverflowA)}>
          <h2 className={cn("text-xl mb-6 text-slate-800", isB ? headingWeightB : "font-semibold")}>Quick Booking</h2>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={e => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase">Patient Name</label>
              <div className={cn("flex items-center border border-slate-300 px-3 py-2 bg-slate-50", isA ? roundedClassA : "rounded-md")}>
                <User size={16} className="text-slate-400 mr-2" />
                <input type="text" placeholder="John Doe" className="bg-transparent border-none outline-none w-full text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase">Date</label>
              <div className={cn("flex items-center border border-slate-300 px-3 py-2 bg-slate-50", isA ? roundedClassA : "rounded-md")}>
                <Calendar size={16} className="text-slate-400 mr-2" />
                <input type="date" className="bg-transparent border-none outline-none w-full text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase">Department</label>
              <div className={cn("flex items-center border border-slate-300 px-3 py-2 bg-slate-50", isA ? roundedClassA : "rounded-md")}>
                <Stethoscope size={16} className="text-slate-400 mr-2" />
                <select className="bg-transparent border-none outline-none w-full text-sm appearance-none">
                  <option>Cardiology</option>
                  <option>Pediatrics</option>
                  <option>General Practice</option>
                </select>
              </div>
            </div>
            <div className="flex items-end">
              {/* Candidate B defect: missing aria-label */}
              <button 
                className={cn("w-full bg-indigo-600 text-white h-[42px] flex items-center justify-center hover:bg-indigo-700 transition-colors", isA ? roundedClassA : "rounded-md")}
                aria-label={isB ? undefined : "Search for appointments"}
                title={isB ? undefined : "Search for appointments"}
              >
                {isB ? <Search size={18} /> : (
                  <span className="flex items-center gap-2"><Search size={16} /> Search</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className={cn("px-6 bg-slate-50", sectionSpacingA)}>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className={cn("text-3xl text-slate-900 tracking-tight", isB ? headingWeightB : "font-bold")}>Top Specialists</h2>
              <p className="text-slate-500 mt-2">Book with our highest rated doctors.</p>
            </div>
            <a href="#" className="hidden md:flex items-center text-indigo-600 font-medium text-sm hover:underline">
              View All <ChevronRight size={16} />
            </a>
          </div>

          <div className={cn("grid", tabletWrapB, gridGapB)}>
            {[
              { name: "Dr. Sarah Jenkins", spec: "Cardiology", rating: "4.9" },
              { name: "Dr. Michael Chen", spec: "Pediatrics", rating: "4.8" },
              { name: "Dr. Emily Rodriguez", spec: "Neurology", rating: "5.0" }
            ].map((doc, i) => (
              <div key={i} className={cn("bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow", isA ? roundedClassA : "rounded-xl", cardRatioA, isB && i === 2 ? "max-md:w-full" : "")}>
                <div className="h-48 bg-slate-200 relative">
                  {/* Photo placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <User size={64} opacity={0.5} />
                  </div>
                </div>
                <div className={cn("p-5", isA ? "mt-12" : "")}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={cn("text-lg text-slate-900", isB ? headingWeightB : "font-bold")}>{doc.name}</h3>
                    <div className="flex items-center text-amber-500 text-sm font-medium">
                      <Star size={14} className="fill-amber-500 mr-1" />
                      {doc.rating}
                    </div>
                  </div>
                  <p className="text-indigo-600 font-medium text-sm mb-4">{doc.spec}</p>
                  <button className={cn("w-full py-2 border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm", isA ? roundedClassA : "rounded-md")}>
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-auto">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-white mb-4">
              <Hospital size={24} />
              <span className="text-lg font-bold tracking-tight">MediCare</span>
            </div>
            <p className="text-sm max-w-sm">Providing exceptional healthcare services with state-of-the-art facilities and experienced medical professionals.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Find a Doctor</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Locations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Patient Portal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>1-800-MEDICARE</li>
              <li>contact@medicare.example.com</li>
              <li>123 Health Ave, Medical City</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
