import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Membership } from "../types";

interface MembershipCardProps {
  key?: string | number;
  membership: Membership;
  onSelect: (membership: Membership) => void;
  isAnnual: boolean;
  index?: number;
}

export default function MembershipCard({
  membership,
  onSelect,
  isAnnual,
  index = 0
}: MembershipCardProps) {
  const isPremium = membership.popular;

  // Calculate annual price (20% off)
  const basePriceNum = membership.priceNum;
  const displayPriceNum = isAnnual ? Math.round(basePriceNum * 0.8) : basePriceNum;
  
  // Format price as Indonesian Rupiah string (e.g. 399.000)
  const displayPriceStr = displayPriceNum.toLocaleString("id-ID");

  return (
    <motion.div
      id={`membership-${membership.id}`}
      initial={{ opacity: 0, y: 140, rotateX: 22, rotateY: 4, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        y: -15, 
        scale: isPremium ? 1.05 : 1.03,
        transition: { duration: 0.3 }
      }}
      className={`glass-card p-10 rounded-2xl flex flex-col relative transition-colors duration-500 border group ${
        isPremium
          ? "border-nexus-red/90 red-glow shadow-[0_0_50px_rgba(229,57,53,0.25)] z-10 bg-gradient-to-b from-surface-container/95 via-surface-container/90 to-surface-container-low/95"
          : "border-white/5 bg-surface-container/65 hover:border-nexus-red/35"
      }`}
    >
      {/* Decorative moving gradient glow for Premium on hover */}
      {isPremium && (
        <div className="absolute -inset-1 bg-gradient-to-r from-nexus-red/35 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-2xl z-0" />
      )}

      {isPremium && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-nexus-red text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.25em] shadow-xl shadow-nexus-red/50 font-display flex items-center gap-1.5 z-20"
        >
          <Sparkles size={11} className="animate-spin text-white" style={{ animationDuration: '6s' }} />
          {membership.badge}
        </motion.div>
      )}

      <div className="mb-8 relative z-10">
        <h3 className="text-white text-xl font-black uppercase tracking-widest mb-2 font-display italic">
          {membership.name}
        </h3>
        
        {/* Animated Price display */}
        <div className="h-[60px] flex items-baseline gap-1.5 overflow-hidden">
          <span className="text-on-surface-variant text-sm font-semibold select-none">Rp</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={displayPriceStr}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-white text-4xl lg:text-5xl font-black font-display tracking-tight"
            >
              {displayPriceStr}
            </motion.span>
          </AnimatePresence>
          <span className="text-on-surface-variant text-xs font-medium">/ {membership.period}</span>
        </div>

        {isAnnual && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-nexus-red font-bold uppercase tracking-wider mt-1"
          >
            Ditagih Tahunan (Hemat 20%)
          </motion.p>
        )}
      </div>

      <ul className="space-y-4 mb-10 flex-grow relative z-10">
        {membership.features.map((feature, idx) => (
          <li
            key={idx}
            className={`flex items-start gap-3 text-sm transition-colors duration-300 ${
              isPremium ? "text-white font-medium" : "text-on-surface-variant"
            }`}
          >
            <span className={`shrink-0 mt-0.5 rounded-full flex items-center justify-center p-0.5 ${
              isPremium ? "text-white bg-nexus-red/30 border border-nexus-red/50 shadow-[0_0_10px_rgba(229,57,53,0.3)] animate-pulse" : "text-nexus-red"
            }`}>
              <Check size={13} strokeWidth={isPremium ? 4 : 3} />
            </span>
            <span className="leading-tight">{feature}</span>
          </li>
        ))}
      </ul>

      <motion.button
        onClick={() => onSelect(membership)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 cursor-pointer relative z-10 ${
          isPremium
            ? "bg-nexus-red text-white hover:bg-red-700 shadow-xl shadow-nexus-red/35 hover:shadow-nexus-red/50"
            : "border border-outline text-white hover:bg-white/5 hover:border-white/20"
        }`}
      >
        {isPremium ? "Go Premium" : `Start ${membership.name}`}
      </motion.button>
    </motion.div>
  );
}
