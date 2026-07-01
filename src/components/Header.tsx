import React, { useState, useEffect } from "react";
import { MapPin, Clock, Shield } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";

interface HeaderProps {
  onJoinClick: () => void;
}

export default function Header({ onJoinClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  // Block background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ["programs", "membership", "facilities", "trainers"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Stagger animation definitions
  const menuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 35,
        staggerChildren: 0.04,
        delayChildren: 0.08,
      }
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 38,
        staggerChildren: 0.02,
        staggerDirection: -1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.35, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      y: 8, 
      transition: { 
        duration: 0.2, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <header
      id="nexus-header"
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
        isMobileMenuOpen
          ? "border-white/5 bg-background py-4"
          : isScrolled
          ? "border-outline-variant/60 bg-background/95 shadow-2xl backdrop-blur-md py-2.5"
          : "border-transparent bg-background/10 backdrop-blur-xs py-5"
      }`}
    >
      {/* Scroll Progress Indicator */}
      {!isMobileMenuOpen && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-nexus-red origin-left z-50"
          style={{ scaleX }}
        />
      )}

      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group relative z-50">
          <div className="size-8 text-nexus-red transition-transform duration-500 group-hover:rotate-12">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h2 className="text-white text-xl font-black tracking-tight font-display transition-all duration-300 group-hover:text-nexus-red group-hover:tracking-wider">
            NEXUS FITNESS
          </h2>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { id: "programs", label: "Programs" },
            { id: "membership", label: "Membership" },
            { id: "facilities", label: "Facilities" },
            { id: "trainers", label: "Trainers" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative py-1 hover:text-white ${
                activeSection === item.id ? "text-white font-black" : "text-on-surface-variant"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-nexus-red"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.button
            id="btn-join-now"
            onClick={onJoinClick}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(229, 57, 53, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-nexus-red text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-all duration-200 shadow-md cursor-pointer"
          >
            Join Now
          </motion.button>
        </div>

        {/* Custom Morphing Hamburger Button */}
        <button
          id="btn-mobile-menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-[6px] text-white hover:text-nexus-red transition-colors focus:outline-none relative z-50 cursor-pointer"
          aria-label="Toggle Menu"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-6 h-[2px] bg-white rounded-full origin-center"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="w-6 h-[2px] bg-white rounded-full"
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-6 h-[2px] bg-white rounded-full origin-center"
          />
        </button>
      </div>

      {/* Full-screen Immersive Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Smooth Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-[2px] z-30 cursor-pointer"
            />

            {/* Premium Sliding Menu Drawer */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ willChange: "transform" }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-background z-40 flex flex-col pt-28 pb-10 px-8 overflow-y-auto hide-scrollbar border-l border-white/5 shadow-2xl"
            >
              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-1 relative z-10">
                {[
                  { id: "programs", label: "Programs", no: "01" },
                  { id: "membership", label: "Membership", no: "02" },
                  { id: "facilities", label: "Facilities", no: "03" },
                  { id: "trainers", label: "Trainers", no: "04" },
                ].map((item) => (
                  <motion.a
                    variants={itemVariants}
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="py-4 border-b border-white/5 flex items-baseline group"
                  >
                    <span className="text-nexus-red/60 text-xs font-mono font-bold tracking-widest mr-4">
                      {item.no} //
                    </span>
                    <span className={`text-2xl font-black uppercase tracking-wider font-display transition-colors duration-300 italic ${
                      activeSection === item.id ? "text-nexus-red" : "text-white group-hover:text-nexus-red"
                    }`}>
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Action Area & Quick Info Footer */}
              <div className="mt-12 relative z-10 flex flex-col gap-8">
                <motion.button
                  id="btn-mobile-join"
                  variants={itemVariants}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onJoinClick();
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-nexus-red text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.25em] shadow-xl shadow-nexus-red/35 hover:bg-red-700 transition-all duration-300 text-center flex items-center justify-center gap-2"
                >
                  Join Nexus Now
                </motion.button>

                {/* Gym operational details */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-1 gap-3 text-xs tracking-wider text-on-surface-variant font-medium pt-4 border-t border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-nexus-red shrink-0" />
                    <span>Epicentrum Kuningan, Jakarta Selatan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="text-nexus-red shrink-0" />
                    <span>Senin - Minggu: 06:00 - 22:00 WIB</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

