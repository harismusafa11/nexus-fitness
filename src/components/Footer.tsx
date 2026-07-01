import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, Compass, Film, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    
    // Simulate API newsletter signup
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      setEmail("");
    }, 1000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-surface-container-lowest pt-20 pb-10 border-t border-outline-variant">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-8 text-nexus-red">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    clipRule="evenodd"
                    d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h2 className="text-white text-xl font-black tracking-tight font-display">NEXUS FITNESS</h2>
            </div>
            
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
              Pusat kebugaran premium di Jakarta yang menggabungkan teknologi modern, pelatih elit, dan fasilitas mewah untuk transformasi tubuh total secara holistik.
            </p>
            
            <div className="flex gap-4">
              <a
                href="#"
                className="size-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-nexus-red transition-all duration-300"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                className="size-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-nexus-red transition-all duration-300"
                aria-label="Instagram"
              >
                <Compass size={18} />
              </a>
              <a
                href="#"
                className="size-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-nexus-red transition-all duration-300"
                aria-label="YouTube"
              >
                <Film size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h5 className="text-white font-black uppercase text-sm mb-6 tracking-widest font-display">
              Navigation
            </h5>
            <ul className="space-y-4">
              {["programs", "membership", "facilities", "trainers"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-on-surface-variant hover:text-white transition-colors text-sm uppercase tracking-wider text-left font-semibold cursor-pointer"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h5 className="text-white font-black uppercase text-sm mb-6 tracking-widest font-display">
              Contact
            </h5>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-on-surface-variant">
                <MapPin size={18} className="text-nexus-red shrink-0" />
                <span>Jl. Senopati No. 45, Kebayoran Baru, Jakarta Selatan</span>
              </li>
              <li className="flex gap-3 text-sm text-on-surface-variant">
                <Phone size={18} className="text-nexus-red shrink-0" />
                <a href="tel:+622155558888" className="hover:text-white transition-colors">
                  +62 21 5555 8888
                </a>
              </li>
              <li className="flex gap-3 text-sm text-on-surface-variant">
                <Mail size={18} className="text-nexus-red shrink-0" />
                <a href="mailto:hello@nexusfitness.id" className="hover:text-white transition-colors">
                  hello@nexusfitness.id
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h5 className="text-white font-black uppercase text-sm mb-6 tracking-widest font-display">
              Join Our Newsletter
            </h5>
            <p className="text-on-surface-variant text-sm mb-4">
              Dapatkan tips fitness eksklusif, analisis nutrisi, dan promo bulanan langsung di inbox Anda.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-nexus-red focus:border-nexus-red transition-all"
                  placeholder="Alamat email anda"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-nexus-red text-white py-3 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="border-2 border-white/30 border-t-white rounded-full size-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center text-emerald-500 gap-2 mb-1.5">
                  <CheckCircle2 size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Subscribed!</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Terima kasih! Cek email Anda secara berkala untuk info premium terbaru.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-outline-variant/50 flex flex-col md:flex-row justify-between items-center gap-4 text-on-surface-variant text-[10px] uppercase font-bold tracking-[0.2em] font-display">
          <p>© {new Date().getFullYear()} NEXUS FITNESS INDONESIA. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
