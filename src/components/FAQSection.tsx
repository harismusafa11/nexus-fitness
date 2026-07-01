import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQS_DATA } from "../data";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("faq1");

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-background border-t border-outline-variant" id="faq">
      <div className="max-w-[900px] mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 50, rotateX: 12, skewY: -1 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, skewY: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-black text-white italic mb-12 text-center uppercase tracking-widest font-display origin-center"
        >
          FREQUENTLY ASKED QUESTIONS
        </motion.h2>
        
        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                initial={{ opacity: 0, y: 40, skewY: 1 }}
                whileInView={{ opacity: 1, y: 0, skewY: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-outline-variant/60 pb-5 last:border-0 transition-colors duration-300"
              >
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center text-left py-3 text-white hover:text-nexus-red transition-colors focus:outline-none group cursor-pointer"
                >
                  <span className="font-bold text-base md:text-lg pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-nexus-red shrink-0"
                  >
                    <ChevronDown size={22} />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-on-surface-variant text-sm md:text-base leading-relaxed pt-2 pb-4 pr-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
