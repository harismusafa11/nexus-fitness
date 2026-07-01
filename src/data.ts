import { Program, Membership, Trainer, Testimonial, FAQItem } from "./types";

export const PROGRAMS_DATA: Program[] = [
  {
    id: "muscle-building",
    title: "Muscle Building",
    description: "Build lean muscle mass with science-based hypertrophy training.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7cGj1NNAKW1a_P6DwqasM7ipfY2Hx9936Xiud2zovJNJuXEUqvlRTRWSAsoFyt3VHbWqczvWoNqG0jdjSYmHciqXGfPu-hNQKjMTdYVm_EGLxpLV76Ap6snNAVJEsGAbexc9MB_ghVYmsWnGBUhduau-qP9FqP4kmkBtFvemMf70KAG0xUDL8_sEUWZomFlrNQ9lTII7H8pAtC4xmj6OmwpcZ76qBJYeuPI-kJz5iGLsEgLjKb9XpX-spKY-aTF4e98PzW26qY9yn",
    details: "Latihan beban terstruktur untuk memicu pertumbuhan serat otot dengan volume optimal dan progressive overload. Dilengkapi dengan konsultasi nutrisi berkala.",
    duration: "60 - 90 Menit per sesi",
    target: "Peningkatan massa otot murni (Hypertrophy)"
  },
  {
    id: "fat-loss",
    title: "Fat Loss",
    description: "High-intensity metabolic conditioning to burn calories and shed fat.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1SOS4NDBiLhVeiTBmGZXa7py_SN7jWBiypwHs_jngA22xDalv9zG-IBk0CJJizW9j_SIP-g2aGEWcZaYPkVHDW94wMKjCH3ULA1Ogg6Rlg-HM6o_CTVjv-OghS9S9AupXpQ2o2CenL9VuHqRO_4Bnj1VTJilRnc7xgDeuR37TKAE0wwGn12QmWvFo4TdcdvBFSGMd2l3EUctCq65ad42XQSo5gOu4SaCapKTm8_FN7_POCDtyajn0TIzl4mfE8X425V1QWOHCPHrY",
    details: "Gabungan latihan sirkuit berintensitas tinggi (HIIT) dan penguatan metabolisme untuk membakar lemak bahkan setelah latihan selesai (EPOC effect).",
    duration: "45 - 60 Menit per sesi",
    target: "Pembakaran lemak maksimal dan pengencangan tubuh"
  },
  {
    id: "strength-training",
    title: "Strength Training",
    description: "Master the big lifts and increase your absolute power and performance.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA72rdsYmo-YkoOciYY_H-wOycv4Ik_yPjdlKfoIjWz32b2JO_hKwV0CjY9DqfBTiz1xI-5PKKhS2Fnj3tgFs1U447Sguby5xqzJV3pfKDqdi6P2MYFptgd5zBjQM1JZxhP_p10HvndHuugA-blwesrqkhkoiDimtmsN2Y0bPccn2MurA4aPII4PpkX9srqfQloHX2DzJSEXf60pDJpvnamw2S29NabBb54oW7w9TSnFTQ4yw70rpTIXi7ZTXExReKe9xGfAJUzFKte",
    details: "Fokus pada penguasaan teknik angkatan utama (Squat, Bench Press, Deadlift) dan peningkatan koordinasi neuromuskular untuk mencapai rekor personal baru.",
    duration: "75 - 90 Menit per sesi",
    target: "Peningkatan kekuatan absolut dan kepadatan tulang"
  },
  {
    id: "functional-training",
    title: "Functional Training",
    description: "Real-world strength, mobility, and agility for everyday life excellence.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOOc2Wwc3NsZiGcSXR6PFAqOkaZix3UdlLN9BjXka8yXlABvnrC7-FqwZV5EoeWEQ_ThzLG486Kv9mm6fIPfSMrW5pJatLglh4Grt718qqB9cBctJ-2C8RevyMgYvFGm4daQpNJV4LVs0aY9Se_meW3XZJ53BmM1ZDQG0Es8BUnGRujoe5HS5lLgqyvsKHeV3aEicQEE57SIBTQKMlzjOwOfb2Xh9g8RoekCmaO7vq1H_6S4YVcasW24xptsrGkkozhG41EBAG_d5r",
    details: "Latihan multi-planar yang meniru gerakan aktivitas harian Anda. Memperbaiki kelenturan, stabilitas sendi, keseimbangan, serta stamina fungsional.",
    duration: "50 - 60 Menit per sesi",
    target: "Mobilitas fungsional, atletisisme, dan pencegahan cedera"
  }
];

export const MEMBERSHIPS_DATA: Membership[] = [
  {
    id: "basic",
    name: "Basic",
    price: "499.000",
    priceNum: 499000,
    period: "bulan",
    features: [
      "Access Gym 08:00 - 17:00",
      "Standard Locker & Shower",
      "Free Initial Assessment"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "899.000",
    priceNum: 899000,
    period: "bulan",
    popular: true,
    badge: "Most Popular",
    features: [
      "Unlimited 24/7 Access",
      "Premium Locker & Private Shower",
      "Unlimited Group Classes",
      "2 Personal Trainer Sessions"
    ]
  },
  {
    id: "elite",
    name: "Elite",
    price: "1.899.000",
    priceNum: 1899000,
    period: "bulan",
    features: [
      "All Premium Features",
      "Dedicated VIP Recovery Lounge",
      "Custom Nutrition Planning",
      "Unlimited Personal Training"
    ]
  }
];

export const TRAINERS_DATA: Trainer[] = [
  {
    id: "sharena-william",
    name: "Sharena William",
    role: "Master Trainer",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4EdroYnLR-uOkJ8GMv3w9CIAsK09G5pYlgbJCM78SpGrhHpqBT6hji3--3Zc1IB8w6gDV9uE_N9wLxltmYSY_hHu2wyMXL6LEBx9myX8wdCvdyjLZXaCwAkBRo3t_mWXgl4g9tllxUjA5t_UObaKovyGcoz72lJr1OSU7gF_yg0oFNoh65IxKo6fBPewlLD43QIAiBSgVYpLTfhKtpnPOML1Y_Y-ZRgDs_Bf4_Gby9H43yIXPvVjFbEJUVuSVOJOD17ETPpAHWDOl",
    bio: "Berpengalaman lebih dari 8 tahun dalam membimbing ratusan wanita mencapai bentuk tubuh ideal yang sehat dan bugar secara berkelanjutan.",
    specialties: ["Weight Management", "Female Fitness", "Post-Natal Rehab"],
    certification: "NASM Certified Personal Trainer, ACE Health Coach"
  },
  {
    id: "reza-wijaya",
    name: "Reza Wijaya",
    role: "Transformation Specialist",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1200&q=80",
    bio: "Spesialis dalam membimbing perubahan postur tubuh ekstrem, penguatan core, serta pemulihan kebugaran dari kondisi overweight berat.",
    specialties: ["Body Composition Analysis", "High Intensity Circuit", "Kettlebell"],
    certification: "ISSA Specialist in Fitness Nutrition, Certified Strength Specialist"
  },
  {
    id: "steve-wilson",
    name: "Steve Wilson",
    role: "Strength Lead",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZHCdTBS3V9HxZmnbc4lWjTqV7QXmHh7B3MR9iVYpldjm7of-nanMtlqqjy3iSf2Si8ngvOtozXK4_zYKavjrXcCG1Y396KPcxsovJUEISARGwJ9wJUhYuhJMb1tLgUaBhciJdPBJublPDc4jUmbTU9PfvTxJDPyipT7nvzddV38tg1dsFwHu1XyRgylx_u6-np1EpXa36HPzaZzk0wsUZwFFiBkU2bMeWU3jxbDXngue1VTEDEuo8ngLjFGhw-xqmbS99e_yeQkLG",
    bio: "Mantan atlet angkat berat nasional yang mendedikasikan ilmunya untuk membantu Anda menguasai teknik angkatan utama secara aman dan bertenaga.",
    specialties: ["Powerlifting", "Olympic Weightlifting", "Functional Mobility"],
    certification: "CSCS (Certified Strength and Conditioning Specialist)"
  },
  {
    id: "sarah-tan",
    name: "Sarah Tan",
    role: "Mobility Expert",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwXrLHVby5Sw9HE2EnuStw_uMO9WTlu70NkF_CFfzYTPFH0HNi30zFzKYewEWscZ9hmaUGQi8lfT8kQeoEFtVXvmYQdg7OzACy-Es96YxGSl9JtTI-yrzXfHuO7f-QtO_hORbb_2ep3JEyO6dnnrJp6VJcpWGlCPK0DpmAPHfDqVbYs2AoPZtS_pX-a-uqg3kQBk4yhLFPS1lRLl-HXf56M_2cNeRFs76HZzVmuqnnUbmdlqGMjJRqLnrppu-Dn8zdRhJjuR-WPXcw",
    bio: "Ahli dalam perbaikan mobilitas sendi, fleksibilitas fungsional, dan terapi pelepasan myofascial pasca latihan berat.",
    specialties: ["Yoga Therapy", "Flexibility Coaching", "Posture Alignment"],
    certification: "RYT 500 Certified Yoga Teacher, Certified Mobility Specialist"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Adrian Pratama",
    date: "Member sejak 2022",
    rating: 5,
    comment: "Fasilitas terbaik yang pernah saya temukan di Jakarta. Komunitasnya sangat mendukung dan pelatihnya benar-benar tahu apa yang mereka lakukan."
  },
  {
    id: "t2",
    name: "Dewi Sasmita",
    date: "Member sejak 2023",
    rating: 5,
    comment: "Program Fat Loss mereka mengubah hidup saya. Dalam 6 bulan saya berhasil menurunkan 15kg lemak dan membangun otot yang kuat."
  },
  {
    id: "t3",
    name: "Kevin Chandra",
    date: "Member sejak 2021",
    rating: 5,
    comment: "Ketenangan di Recovery Lounge adalah alasan saya betah di sini. Nexus benar-benar mengerti konsep holistic fitness."
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq1",
    question: "Apakah saya bisa mencoba sebelum bergabung?",
    answer: "Ya, kami menawarkan 1-Day Free Pass untuk mencoba seluruh fasilitas dan mengikuti satu kelas grup secara gratis. Anda dapat mendaftar dengan mengisi formulir hubungi kami atau langsung datang ke lokasi kami."
  },
  {
    id: "faq2",
    question: "Berapa biaya untuk Personal Trainer?",
    answer: "Biaya Personal Trainer bervariasi tergantung paket sesi yang diambil, berkisar mulai dari Rp 250.000 per sesi untuk paket bulk (pembelian sesi banyak) hingga sesi satuan yang disesuaikan dengan kebutuhan Anda."
  },
  {
    id: "faq3",
    question: "Apakah ada biaya pendaftaran?",
    answer: "Kami mengenakan biaya administrasi sekali saja sebesar Rp 250.000 untuk pengurusan akses kartu pintar (keycard), pendaftaran sidik jari, dan starter kit eksklusif Nexus Fitness."
  },
  {
    id: "faq4",
    question: "Jam operasional Nexus Fitness?",
    answer: "Kami beroperasi 24 jam sehari, 7 hari seminggu (24/7) khusus untuk member dengan kategori Premium dan Elite. Untuk kategori Basic dan pengunjung umum, jam operasional adalah pukul 06:00 - 22:00."
  }
];
