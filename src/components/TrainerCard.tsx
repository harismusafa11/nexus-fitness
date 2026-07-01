import React from "react";
import { motion } from "motion/react";
import { CalendarDays, ShieldCheck } from "lucide-react";
import { Trainer } from "../types";

interface TrainerCardProps {
  key?: string | number;
  trainer: Trainer;
  onBook: (trainer: Trainer) => void;
  index?: number;
}

export default function TrainerCard({ trainer, onBook, index = 0 }: TrainerCardProps) {
  return (
    <motion.div
      id={`trainer-${trainer.id}`}
      initial={{ opacity: 0, y: 130, rotateY: -15, skewY: 4, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0, skewY: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group aspect-[4/5] rounded-xl overflow-hidden relative border border-white/5 hover:border-nexus-red/30 transition-all duration-500 bg-surface-container-low flex flex-col justify-end shadow-xl"
    >
      <motion.img
        className="absolute inset-0 w-full h-full object-cover origin-center"
        src={trainer.image}
        alt={trainer.name}
        referrerPolicy="no-referrer"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      
      {/* Dark persistent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 group-hover:via-black/60" />

      {/* Persistent Content */}
      <div className="absolute bottom-0 left-0 p-6 w-full z-10 transition-transform duration-500 transform translate-y-2 group-hover:translate-y-0">
        <span className="text-nexus-red text-[10px] uppercase font-black tracking-[0.2em] block mb-1 font-display">
          {trainer.role}
        </span>
        <h4 className="text-white text-xl font-black font-display mb-1">
          {trainer.name}
        </h4>

        {/* Hidden content revealed on hover with clean heights */}
        <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden mt-2 space-y-3">
          <p className="text-on-surface-variant text-xs leading-relaxed">
            {trainer.bio}
          </p>

          <div className="flex items-center gap-1.5 text-[11px] text-white/90">
            <ShieldCheck size={14} className="text-nexus-red" />
            <span className="font-semibold truncate">{trainer.certification}</span>
          </div>

          <div className="flex flex-wrap gap-1 pt-1">
            {trainer.specialties.map((spec, i) => (
              <span
                key={i}
                className="text-[9px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-on-surface-variant px-2 py-0.5 rounded"
              >
                {spec}
              </span>
            ))}
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onBook(trainer);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-nexus-red hover:bg-red-700 text-white py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <CalendarDays size={12} />
            Book Training
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
