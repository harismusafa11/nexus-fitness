import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Program } from "../types";

interface ProgramCardProps {
  key?: string | number;
  program: Program;
  onSelect: (program: Program) => void;
  index?: number;
}

export default function ProgramCard({ program, onSelect, index = 0 }: ProgramCardProps) {
  return (
    <motion.div
      onClick={() => onSelect(program)}
      initial={{ opacity: 0, y: 120, rotateX: 18, rotateY: -8, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.1, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
      className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer bg-surface-container border border-white/5 hover:border-nexus-red/35 transition-colors duration-500 shadow-xl"
    >
      <motion.img
        className="absolute inset-0 w-full h-full object-cover origin-center"
        src={program.image}
        alt={program.title}
        referrerPolicy="no-referrer"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
      
      {/* Light border reflection glow on hover */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-nexus-red/25 rounded-xl transition-colors duration-500 pointer-events-none" />

      <div className="absolute bottom-0 left-0 p-8 w-full z-10">
        <span className="text-[10px] text-nexus-red font-bold uppercase tracking-[0.2em] block mb-1 font-display">
          Nexus Curated
        </span>
        <h3 className="text-2xl font-black text-white mb-2 uppercase font-display italic tracking-wide">
          {program.title}
        </h3>
        <p className="text-on-surface-variant text-sm mb-5 line-clamp-2 group-hover:text-white transition-colors duration-300">
          {program.description}
        </p>
        <div className="inline-flex items-center gap-2 text-nexus-red font-bold text-xs uppercase tracking-widest group-hover:text-white transition-all duration-300">
          Learn More <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    </motion.div>
  );
}
