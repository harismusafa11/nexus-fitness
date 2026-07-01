import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Calendar, User, Phone, Mail, Dumbbell, Sparkles } from "lucide-react";
import { Membership, Trainer, Program } from "../types";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "membership" | "trainer" | "program";
  selectedItem?: Membership | Trainer | Program | null;
  memberships: Membership[];
  trainers: Trainer[];
  programs: Program[];
}

export default function ActionModal({
  isOpen,
  onClose,
  type,
  selectedItem,
  memberships,
  trainers,
  programs
}: ActionModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    itemId: selectedItem ? selectedItem.id : "",
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    note: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync state if selected item changes
  useEffect(() => {
    if (selectedItem) {
      setFormData((prev) => ({ ...prev, itemId: selectedItem.id }));
    }
  }, [selectedItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API registration call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      itemId: selectedItem ? selectedItem.id : "",
      date: new Date().toISOString().split("T")[0],
      time: "10:00",
      note: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-lg glass-card rounded-xl overflow-hidden shadow-2xl border border-outline-variant/40 z-10"
        >
          {/* Close button */}
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors p-2 rounded-lg bg-white/5 hover:bg-white/10"
          >
            <X size={18} />
          </button>

          {!isSubmitted ? (
            <div className="p-8">
              {/* Header */}
              <div className="mb-6">
                <span className="text-nexus-red text-xs font-bold uppercase tracking-wider block mb-1">
                  Nexus Interactive Portal
                </span>
                <h3 className="text-2xl font-black italic text-white uppercase font-display">
                  {type === "membership" && "Join Membership"}
                  {type === "trainer" && "Book Elite Coach"}
                  {type === "program" && "Book Free Program Pass"}
                </h3>
                <p className="text-on-surface-variant text-sm mt-1">
                  {type === "membership" && "Pilih paket keanggotaan premium Anda untuk memulai."}
                  {type === "trainer" && "Mulai sesi bimbingan pribadi dengan pelatih internasional kami."}
                  {type === "program" && "Dapatkan 1-Day Free Pass untuk mencoba program pilihan Anda."}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-nexus-red focus:border-nexus-red transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@anda.com"
                        className="w-full bg-surface-container border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-nexus-red focus:border-nexus-red transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                      No. Telepon / WhatsApp
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                        <Phone size={16} />
                      </span>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+62 8..."
                        className="w-full bg-surface-container border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-nexus-red focus:border-nexus-red transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                    {type === "membership" && "Pilih Kategori Paket"}
                    {type === "trainer" && "Pilih Pelatih Pribadi"}
                    {type === "program" && "Pilih Target Program"}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                      <Dumbbell size={16} />
                    </span>
                    <select
                      value={formData.itemId}
                      onChange={(e) => setFormData({ ...formData, itemId: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-nexus-red focus:border-nexus-red transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Pilih salah satu...</option>
                      {type === "membership" &&
                        memberships.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name} — Rp {m.price}/bulan
                          </option>
                        ))}
                      {type === "trainer" &&
                        trainers.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} ({t.role})
                          </option>
                        ))}
                      {type === "program" &&
                        programs.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Date & Time (Needed for Trainer booking or Program Trial) */}
                {type !== "membership" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                        Pilih Tanggal
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                          <Calendar size={16} />
                        </span>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-surface-container border border-outline-variant/30 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-nexus-red focus:border-nexus-red transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                        Pilih Jam
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-surface-container border border-outline-variant/30 rounded-lg py-2.5 px-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-nexus-red focus:border-nexus-red transition-all cursor-pointer"
                      >
                        <option value="08:00">08:00 WIB</option>
                        <option value="10:00">10:00 WIB</option>
                        <option value="13:00">13:00 WIB</option>
                        <option value="15:00">15:00 WIB</option>
                        <option value="17:00">17:00 WIB</option>
                        <option value="19:00">19:00 WIB</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                    Catatan Tambahan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Contoh: memiliki riwayat cedera lutut, target menurunkan lemak..."
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-nexus-red focus:border-nexus-red transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-nexus-red text-white py-3.5 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg hover:shadow-nexus-red/20 active:scale-[0.98] mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span className="border-2 border-white/30 border-t-white rounded-full size-4 animate-spin" />
                  ) : (
                    "Kirim Pendaftaran"
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center flex flex-col items-center justify-center min-h-[350px]"
            >
              <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mb-6 animate-bounce">
                <Check size={32} />
              </div>
              <h4 className="text-2xl font-black italic text-white uppercase mb-2 font-display">
                PENDAFTARAN BERHASIL!
              </h4>
              <p className="text-on-surface-variant text-sm max-w-sm mb-6 leading-relaxed">
                Halo <span className="text-white font-bold">{formData.name}</span>, tim penasihat kebugaran kami akan menghubungi Anda melalui WhatsApp/Telepon ke nomor{" "}
                <span className="text-white font-bold">{formData.phone}</span> dalam kurun waktu 1x24 jam untuk verifikasi akhir.
              </p>
              
              {type !== "membership" && (
                <div className="bg-surface-container border border-outline-variant/30 p-4 rounded-lg w-full mb-8 text-left text-xs space-y-1">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Calendar size={14} className="text-nexus-red" />
                    <span>Jadwal: <strong className="text-white">{formData.date} pukul {formData.time} WIB</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <Sparkles size={14} className="text-nexus-red" />
                    <span>Konfirmasi digital dikirimkan ke <strong className="text-white">{formData.email}</strong></span>
                  </div>
                </div>
              )}

              <button
                onClick={resetAndClose}
                className="bg-white/10 text-white px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10"
              >
                Tutup Jendela
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
