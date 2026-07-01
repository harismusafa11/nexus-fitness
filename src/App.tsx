import React, { useState, useEffect, useRef } from "react";
import { Shield, Sparkles, MapPin, Award, Check, Star, ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FAQSection from "./components/FAQSection";
import ProgramCard from "./components/ProgramCard";
import MembershipCard from "./components/MembershipCard";
import TrainerCard from "./components/TrainerCard";
import ActionModal from "./components/ActionModal";

import {
  PROGRAMS_DATA,
  MEMBERSHIPS_DATA,
  TRAINERS_DATA,
  TESTIMONIALS_DATA
} from "./data";
import { Program, Membership, Trainer } from "./types";

// Animated Counter helper component
interface CounterProps {
  value: number;
  suffix?: string;
}

function Counter({ value, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    const duration = 1500; // 1.5s
    const steps = 60;
    const stepValue = Math.ceil(end / steps);
    const incrementTime = duration / steps;
    
    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref} className="tabular-nums font-black">
      {count.toLocaleString("id-ID")}{suffix}
    </span>
  );
}

export default function App() {
  // Scroll Parallax Hooks for Hero Section
  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 800], [0, 220]);
  const heroScale = useTransform(scrollY, [0, 800], [1.02, 1.25]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0.15]);
  const heroContentY = useTransform(scrollY, [0, 700], [0, 160]);
  const heroContentOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Modal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"membership" | "trainer" | "program">("membership");
  const [selectedItem, setSelectedItem] = useState<Membership | Trainer | Program | null>(null);

  // Billing Period state (Annual switcher)
  const [isAnnual, setIsAnnual] = useState(false);

  // Floating back to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Facility detail zoom states
  const [activeFacility, setActiveFacility] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMembershipModal = (membership: Membership) => {
    setModalType("membership");
    setSelectedItem(membership);
    setIsModalOpen(true);
  };

  const openTrainerModal = (trainer: Trainer) => {
    setModalType("trainer");
    setSelectedItem(trainer);
    setIsModalOpen(true);
  };

  const openProgramModal = (program: Program) => {
    setModalType("program");
    setSelectedItem(program);
    setIsModalOpen(true);
  };

  const handleGeneralJoin = () => {
    const defaultPremium = MEMBERSHIPS_DATA.find((m) => m.id === "premium") || MEMBERSHIPS_DATA[0];
    openMembershipModal(defaultPremium);
  };

  const handleExplorePrograms = () => {
    const el = document.getElementById("programs");
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="bg-background text-on-background font-sans selection:bg-nexus-red selection:text-white min-h-screen relative overflow-x-hidden">
      
      {/* Header */}
      <Header onJoinClick={handleGeneralJoin} />

      {/* Main Content */}
      <main className="relative">

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
          {/* Subtle background decorative moving glow elements */}
          <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-nexus-red/5 rounded-full blur-[100px] animate-[pulse_10s_infinite_ease-in-out] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] animate-[pulse_12s_infinite_ease-in-out] pointer-events-none" />

          {/* Background image & gradient overlay with cinematic parallax */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/15 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none" />
            <motion.img
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ y: heroBgY, scale: heroScale, opacity: heroOpacity }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="w-full h-full object-cover select-none"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEkwegT1HHFpPs7OAe-zdWdvqec_ap_PKkmlSpZ4u3yv2BRwJVqaHUOsND3uIPubeIJbgOIo-XbJsAs60nwKEDDRYcdZJEql5x1TOidvs8ZkwVUYCGTeAeSb1imC3u-K6YKBHtvFpZAWQoF07aB3gYCEjIvDJTBCaNnZjlSluphULwY4SmCOVlRIqr7sXTWIuzl7Pf4SofiKKBCrRog_BDWulMhtU4pA70gb6ymMitkwkMwxlYWb9d9FUrcrA_GLy75B9L6bhd3JoF"
              alt="Elite Luxury Gym Interior"
              referrerPolicy="no-referrer"
            />
          </div>

          <motion.div 
            style={{ y: heroContentY, opacity: heroContentOpacity }}
            className="relative z-20 max-w-[1200px] mx-auto px-6 text-center pt-10"
          >
            {/* Tagline Entrance */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-nexus-red/30 bg-nexus-red/10 text-nexus-red text-xs font-bold uppercase tracking-[0.2em]">
                <Sparkles size={12} className="animate-pulse" /> Elite Training Facility
              </span>
            </motion.div>

            {/* Title Cinematic Entrance */}
            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-none tracking-tighter mb-8 italic font-display uppercase"
            >
              WUJUDKAN VERSI<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-on-background to-nexus-red">
                TERBAIK DIRIMU.
              </span>
            </motion.h1>

            {/* Description Fade In */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="max-w-2xl mx-auto text-on-surface-variant text-base sm:text-lg lg:text-xl leading-relaxed mb-10"
            >
              Latihan bersama pelatih profesional, fasilitas premium, dan lingkungan yang mendukung setiap langkah menuju tubuh yang lebih sehat, kuat, dan percaya diri.
            </motion.p>

            {/* Staggered Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none"
            >
              <motion.button
                id="btn-hero-join"
                onClick={handleGeneralJoin}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(229, 57, 53, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-nexus-red text-white px-10 py-4 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-red-700 transition-colors duration-200 shadow-lg cursor-pointer"
              >
                Join Membership
              </motion.button>
              <motion.button
                id="btn-hero-explore"
                onClick={handleExplorePrograms}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-colors duration-200 cursor-pointer"
              >
                Explore Programs
              </motion.button>
            </motion.div>

            {/* Animated Staggered Statistics cards */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { countValue: 5000, label: "Active Members", suffix: "+" },
                { countValue: 15, label: "Certified Trainers", suffix: "+" },
                { countValue: 50, label: "Modern Equipment", suffix: "+" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, borderColor: "rgba(229, 57, 53, 0.4)", transition: { duration: 0.2 } }}
                  className="glass-card p-6 rounded-xl hover:border-nexus-red/40 transition-colors duration-300"
                >
                  <p className="text-nexus-red text-4xl font-black mb-1 font-display tracking-tight">
                    <Counter value={stat.countValue} suffix={stat.suffix} />
                  </p>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>


        {/* Programs Section */}
        <section className="py-24 bg-surface-container-lowest" id="programs">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <motion.div 
              initial={{ opacity: 0, y: 80, rotateX: -15, skewY: 3 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, skewY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 origin-left"
            >
              <div>
                <p className="text-nexus-red font-bold uppercase tracking-widest text-xs mb-2">Our Programs</p>
                <h2 className="text-4xl lg:text-5xl font-black text-white italic font-display uppercase">
                  TRAIN WITH PURPOSE.
                </h2>
              </div>
              <p className="max-w-md text-on-surface-variant text-sm md:text-base leading-relaxed">
                Program latihan terkurasi yang dirancang untuk mencapai target spesifik Anda dengan metodologi sains terbaru.
              </p>
            </motion.div>

            {/* Program Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROGRAMS_DATA.map((program, idx) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  onSelect={openProgramModal}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>


        {/* Membership Section */}
        <section className="py-24 relative overflow-hidden" id="membership">
          {/* Ambient red blob glow background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-nexus-red/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 80, rotateX: 15, skewY: -2 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, skewY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-10 origin-center"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-white italic mb-4 uppercase font-display">
                CHOOSE YOUR NEXUS LEVEL
              </h2>
              <p className="text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base">
                Satu keanggotaan, kemungkinan tanpa batas. Pilih paket yang sesuai dengan gaya hidup Anda.
              </p>
            </motion.div>

            {/* Premium Billing Switcher Toggle */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-4 mb-16"
            >
              <span className={`text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-300 ${!isAnnual ? "text-white" : "text-on-surface-variant"}`}>
                Bulanan
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-8 bg-surface-container rounded-full p-1 relative transition-colors duration-300 border border-white/5 cursor-pointer flex items-center"
              >
                <motion.div
                  className="w-6 h-6 bg-nexus-red rounded-full"
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{ x: isAnnual ? "22px" : "0px" }}
                />
              </button>
              <span className={`text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 transition-colors duration-300 ${isAnnual ? "text-white" : "text-on-surface-variant"}`}>
                Tahunan <span className="text-[9px] bg-nexus-red text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider font-display">Hemat 20%</span>
              </span>
            </motion.div>

            {/* Memberships Cards Grid with Staggered Viewport Reveals */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-2">
              {MEMBERSHIPS_DATA.map((membership, idx) => (
                <MembershipCard
                  key={membership.id}
                  membership={membership}
                  onSelect={openMembershipModal}
                  isAnnual={isAnnual}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>


        {/* Facilities Gallery Section */}
        <section className="py-24 bg-surface" id="facilities">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <motion.div 
              initial={{ opacity: 0, y: 80, rotateX: -15, skewY: 3 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, skewY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16 origin-left"
            >
              <p className="text-nexus-red font-bold uppercase tracking-widest text-xs mb-2">The Facility</p>
              <h2 className="text-4xl lg:text-5xl font-black text-white italic font-display">
                LIMITLESS LUXURY.
              </h2>
            </motion.div>

            {/* Grid Layout conforming to pristine visual aesthetics with viewport entry */}
            <div className="grid grid-cols-12 gap-6 h-auto lg:h-[750px]">
              
              {/* Main Cardio Zone (Left block) */}
              <motion.div
                onClick={() => setActiveFacility("cardio")}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-12 lg:col-span-8 h-[350px] lg:h-full relative group overflow-hidden rounded-2xl cursor-pointer border border-white/5 hover:border-nexus-red/30 transition-all duration-500 shadow-xl"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeK6kv4N6X_k5D8NSw-jhMmicXIc_XO6pCEhlX7Ma4RHPVA1uZJtIkTmDQVPDMjjEzY5O40NL4MTYOoNaSZr-GOMzIgDUvMzI3D0EA4y8pZXZLZ2lOOp6RohN2-lpC_YLZ2OCbXtv9bZY3-3ROzToKODLDMOY6e6kRmDBOsUzr8dmh1v3VCTglS5zNOZ27983uQ2-_KfgFcAzyerSMM6OaS0i6BQMdsxFms-cr1mYyJIGZFvO7Ogvz7JpPt5NZp4FkBE7yiuRnYiIs"
                  alt="Main Cardio Zone"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-[10px] text-nexus-red font-black tracking-widest uppercase block mb-1">Area Kardiologi</span>
                  <h4 className="text-white text-2xl font-black uppercase italic font-display">Main Cardio Zone</h4>
                </div>
              </motion.div>

              {/* Right Stack (Free weights & Recovery lounge) */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 h-auto lg:h-full">
                
                {/* Free Weights */}
                <motion.div
                  onClick={() => setActiveFacility("weights")}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group overflow-hidden rounded-2xl cursor-pointer border border-white/5 hover:border-nexus-red/30 transition-all duration-500 h-[250px] lg:h-1/2 shadow-xl"
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoNpsDih0-W6TDDM1TZEzsDgw6wrLsB-E8gRp2XljCvjdb9zSOdIRTjgvK8sUMbwkKrQhj4Iu0K25QMOEs6WdXeH-THXgHBolL0I_bMZA4AuKrfT364ujngNrwRGsV7CPGc5tYCUSfeYHrkokCA7roB54giW25eJ78EyYaWbc2ajnuxm4qlJUIOOwhZWfL5dUzOvAGkJ-WZl-Nt__ejrKrY-uHiqu_lxYE0QMJnjsDRfGNyEMbRR2db48aWL0l6yefHd60VJ1E_my0"
                    alt="Free Weights Zone"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />
                  <div className="absolute bottom-6 left-6 z-10">
                    <span className="text-[10px] text-nexus-red font-black tracking-widest uppercase block mb-1">Angkat Beban</span>
                    <h4 className="text-white text-xl font-black uppercase italic font-display">Free Weights</h4>
                  </div>
                </motion.div>

                {/* Recovery Lounge */}
                <motion.div
                  onClick={() => setActiveFacility("recovery")}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group overflow-hidden rounded-2xl cursor-pointer border border-white/5 hover:border-nexus-red/30 transition-all duration-500 h-[250px] lg:h-1/2 shadow-xl"
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmTuttgBZXeVJ39QpDZX6qrMqM5dGv6Im_vFlWDlqzTMpcDaslRnNpswSYQ1f5SA6mET5rvMmmqQSMEDP-QV1MW04spsX8lgog5Tpw7Ghumse8bHzXSovsH9OV6B_cIHfmCXpp04iskach3W0z4yMMPYGQhJYUIhDaLbLnAYiJ9k67m7Ga7n0lxfo7PfnPGPtTX4K-pD3glgDewBfff7Z4uRqGhPZKibVGPCpCOL4k6ciWjL859ZGH0z0g8AwWJ_1qJZWU32L95cky"
                    alt="Recovery Lounge Zone"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />
                  <div className="absolute bottom-6 left-6 z-10">
                    <span className="text-[10px] text-nexus-red font-black tracking-widest uppercase block mb-1">Terapi & Spa</span>
                    <h4 className="text-white text-xl font-black uppercase italic font-display">Recovery Lounge</h4>
                  </div>
                </motion.div>

              </div>

            </div>
          </div>
        </section>


        {/* Expert Coaching Section */}
        <section className="py-24 bg-surface-container-low" id="trainers">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Context Text Block */}
              <motion.div 
                initial={{ opacity: 0, x: -80, rotateY: 15, skewX: -2 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, skewX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 origin-left"
              >
                <p className="text-nexus-red font-bold uppercase tracking-widest text-xs mb-2">Expert Coaching</p>
                <h2 className="text-4xl lg:text-5xl font-black text-white italic mb-6 font-display uppercase leading-tight">
                  ELITE TRAINING<br />EXPERIENCE.
                </h2>
                <p className="text-on-surface-variant text-base leading-relaxed mb-8">
                  Kami percaya bahwa kunci dari transformasi fisik yang berkelanjutan adalah bimbingan yang tepat. Pelatih kami bukan sekadar instruktur, melainkan mentor yang bersertifikat internasional dan ahli dalam biomekanik tubuh.
                </p>

                {/* Features list */}
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="size-12 rounded-lg bg-nexus-red/10 border border-nexus-red/20 flex items-center justify-center text-nexus-red shrink-0">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg font-display">International Certification</h4>
                      <p className="text-on-surface-variant text-sm mt-0.5">Pelatih dengan sertifikasi NASM, ACE, dan ISSA.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="size-12 rounded-lg bg-nexus-red/10 border border-nexus-red/20 flex items-center justify-center text-nexus-red shrink-0">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg font-display">Data-Driven Approach</h4>
                      <p className="text-on-surface-variant text-sm mt-0.5">Pelacakan progress mingguan menggunakan InBody analysis.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Trainers Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TRAINERS_DATA.map((trainer, idx) => (
                  <TrainerCard
                    key={trainer.id}
                    trainer={trainer}
                    onBook={openTrainerModal}
                    index={idx}
                  />
                ))}
              </div>

            </div>
          </div>
        </section>


        {/* Member Testimonials */}
        <section className="py-24 border-y border-outline-variant bg-surface-container-lowest">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
            <motion.h2 
              initial={{ opacity: 0, y: 60, rotateX: 15, skewY: 2 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, skewY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-black text-white italic mb-12 text-center uppercase tracking-widest font-display origin-center"
            >
              MEMBER SUCCESS STORIES
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS_DATA.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 110, rotateX: 18, rotateY: -6, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="glass-card p-10 rounded-2xl hover:border-nexus-red/30 transition-colors duration-300 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 text-nexus-red mb-6">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>

                    <p className="text-on-surface text-base italic mb-8 leading-relaxed">
                      "{t.comment}"
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-5 flex items-center justify-between">
                    <div>
                      <p className="text-white font-black uppercase tracking-wider text-sm font-display italic">{t.name}</p>
                      <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mt-0.5">{t.date}</p>
                    </div>
                    <div className="text-nexus-red/30 text-4xl font-black font-display leading-none select-none italic">
                      ”
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <FAQSection />

      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Form Dialog Portal */}
      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        selectedItem={selectedItem}
        memberships={MEMBERSHIPS_DATA}
        trainers={TRAINERS_DATA}
        programs={PROGRAMS_DATA}
      />

      {/* Image zoom modal for Facilities with spring scaling animation */}
      <AnimatePresence>
        {activeFacility && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl bg-surface border border-white/5"
            >
              <button
                onClick={() => setActiveFacility(null)}
                className="absolute top-4 right-4 bg-black/60 text-white hover:text-nexus-red p-2.5 rounded-full z-10 transition-colors cursor-pointer"
              >
                ✕
              </button>
              <img
                className="w-full max-h-[80vh] object-cover"
                src={
                  activeFacility === "cardio"
                    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBeK6kv4N6X_k5D8NSw-jhMmicXIc_XO6pCEhlX7Ma4RHPVA1uZJtIkTmDQVPDMjjEzY5O40NL4MTYOoNaSZr-GOMzIgDUvMzI3D0EA4y8pZXZLZ2lOOp6RohN2-lpC_YLZ2OCbXtv9bZY3-3ROzToKODLDMOY6e6kRmDBOsUzr8dmh1v3VCTglS5zNOZ27983uQ2-_KfgFcAzyerSMM6OaS0i6BQMdsxFms-cr1mYyJIGZFvO7Ogvz7JpPt5NZp4FkBE7yiuRnYiIs"
                    : activeFacility === "weights"
                    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAoNpsDih0-W6TDDM1TZEzsDgw6wrLsB-E8gRp2XljCvjdb9zSOdIRTjgvK8sUMbwkKrQhj4Iu0K25QMOEs6WdXeH-THXgHBolL0I_bMZA4AuKrfT364ujngNrwRGsV7CPGc5tYCUSfeYHrkokCA7roB54giW25eJ78EyYaWbc2ajnuxm4qlJUIOOwhZWfL5dUzOvAGkJ-WZl-Nt__ejrKrY-uHiqu_lxYE0QMJnjsDRfGNyEMbRR2db48aWL0l6yefHd60VJ1E_my0"
                    : "https://lh3.googleusercontent.com/aida-public/AB6AXuAmTuttgBZXeVJ39QpDZX6qrMqM5dGv6Im_vFlWDlqzTMpcDaslRnNpswSYQ1f5SA6mET5rvMmmqQSMEDP-QV1MW04spsX8lgog5Tpw7Ghumse8bHzXSovsH9OV6B_cIHfmCXpp04iskach3W0z4yMMPYGQhJYUIhDaLbLnAYiJ9k67m7Ga7n0lxfo7PfnPGPtTX4K-pD3glgDewBfff7Z4uRqGhPZKibVGPCpCOL4k6ciWjL859ZGH0z0g8AwWJ_1qJZWU32L95cky"
                }
                alt="Detailed Zone"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 bg-surface-container border-t border-white/5">
                <h4 className="text-xl font-black text-white uppercase italic font-display">
                  {activeFacility === "cardio" && "Main Cardio Zone — Ruang Kardiologi Mewah"}
                  {activeFacility === "weights" && "Free Weights — Area Angkat Beban Profesional"}
                  {activeFacility === "recovery" && "Recovery Lounge — Ruang Pemulihan & Spa"}
                </h4>
                <p className="text-on-surface-variant text-sm mt-1.5 leading-relaxed">
                  {activeFacility === "cardio" && "Lengkapi target pembakaran kalori Anda dengan jajaran treadmill berteknologi mutakhir yang menghadap pemandangan lanskap kota Jakarta yang mempesona."}
                  {activeFacility === "weights" && "Lantai karet pelindung bising berstandar tinggi yang menampung ribuan kilogram angkatan beban dumbbell khromium, barbel, angkatan besi, dan bangku beban kokoh."}
                  {activeFacility === "recovery" && "Tenangkan ketegangan otot Anda setelah berolahraga berat dengan kursi pijat kulit premium, sauna inframerah, terapi cryotherapy, dan jus bar segar."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-40 bg-nexus-red text-white p-3.5 rounded-full hover:bg-red-700 active:scale-95 transition-colors duration-200 shadow-xl shadow-nexus-red/20 hover:shadow-nexus-red/40 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
