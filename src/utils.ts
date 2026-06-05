/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppLanguage } from './types';

export function calculateBmi(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(2));
}

export function getBmiCategory(bmi: number, lang: AppLanguage): { 
  label: string; 
  color: string; 
  bgColor: string; 
  textColor: string;
  badgeBg: string;
  dotColor: string;
  positionPercent: number; // Percent on slider gauge
} {
  if (bmi < 18.5) {
    return {
      label: lang === 'id' ? 'Kurus (Kelebihan Beban Kurang)' : 'Underweight',
      color: '#64a8fe', // Pale Cool Blue
      bgColor: 'rgba(100, 168, 254, 0.1)',
      textColor: 'text-secondary',
      badgeBg: 'bg-secondary/10 text-secondary',
      dotColor: 'bg-secondary',
      positionPercent: 15,
    };
  } else if (bmi < 25) {
    return {
      label: lang === 'id' ? 'Normal (Ideal)' : 'Normal Weight',
      color: '#006d36', // Vitality Green
      bgColor: 'rgba(74, 222, 128, 0.1)',
      textColor: 'text-primary',
      badgeBg: 'bg-primary/10 text-primary',
      dotColor: 'bg-primary',
      positionPercent: 50,
    };
  } else if (bmi < 30) {
    return {
      label: lang === 'id' ? 'Kelebihan Berat Badan' : 'Overweight',
      color: '#f6bb1f', // Amber/Orange
      bgColor: 'rgba(246, 187, 31, 0.1)',
      textColor: 'text-tertiary',
      badgeBg: 'bg-tertiary/10 text-tertiary',
      dotColor: 'bg-tertiary',
      positionPercent: 75,
    };
  } else {
    return {
      label: lang === 'id' ? 'Obesitas' : 'Obese',
      color: '#ba1a1a', // Muted Red
      bgColor: 'rgba(186, 26, 26, 0.1)',
      textColor: 'text-error',
      badgeBg: 'bg-error/10 text-error',
      dotColor: 'bg-error',
      positionPercent: 95,
    };
  }
}

export function getIdealWeightRange(heightCm: number): { min: number; max: number } {
  if (heightCm <= 0) return { min: 0, max: 0 };
  const heightM = heightCm / 100;
  const min = Math.round(18.5 * heightM * heightM);
  const max = Math.round(24.9 * heightM * heightM);
  return { min, max };
}

// Translations dictionary
export const translations = {
  en: {
    appName: 'BMI Check',
    welcomeBack: 'Welcome Back',
    welcomeSubtitle: 'Your journey to a healthier you starts with a single step.',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    login: 'Login',
    trustDisclaimer: 'Your health data (height, weight, BMI) is stored locally and never shared. Only your name and email are used for account management.',
    welcomeUser: 'Welcome, {name}!',
    readyTrack: 'Ready to track your health progress today?',
    newEntry: 'New Entry',
    calculateBmi: 'Calculate BMI',
    bentoSubtitle: 'Get your health score in less than 30 seconds.',
    startCalc: 'Start Calculation',
    lastRecordedBmi: 'Last Recorded BMI',
    recordedOn: 'Recorded on {date}',
    under: 'Under',
    normal: 'Normal',
    over: 'Over',
    viewHistory: 'View History',
    viewHistorySub: 'Track your weight trends',
    settings: 'Settings',
    settingsSub: 'Profile & units preferences',
    dailyHealthTip: 'Daily Health Tip',
    home: 'Home',
    calculatorLabel: 'Calculator',
    historyLabel: 'History',
    settingsLabel: 'Settings',
    changeLang: 'Change Language',
    aboutApp: 'About Application',
    privacyPolicy: 'Privacy Policy',
    logout: 'Logout',
    calcYourBmi: 'Calculate Your BMI',
    calcBmiSub: 'Instant, accurate biometric analysis.',
    heightCm: 'Height (cm)',
    weightKg: 'Weight (kg)',
    clearData: 'Clear Data',
    yourResult: 'Your Result',
    yourCurrentBmi: 'YOUR CURRENT BMI',
    healthyRange: 'Healthy',
    healthInsight: 'Health Insight',
    insightNormal: 'Maintain a balanced diet and exercise regularly to keep your score in this healthy range.',
    insightHigh: 'Consider speaking to a nutrition expert or increasing daily exercises to reach a healthier weight.',
    insightLow: 'Adding nutrient-dense meals and tracking calorie intake can help boost your weight to normal.',
    idealRange: 'Ideal Weight Range',
    difference: 'Difference',
    saveToHistory: 'Save to History',
    shareResult: 'Share Result',
    historyTitle: 'History',
    clearAll: 'Clear All',
    bmiTrend: 'BMI TREND',
    recentEntries: 'Recent Entries',
    noEntriesYet: 'No entries yet',
    noEntriesSub: 'Start tracking your BMI to see your health progress here.',
    aboutTitle: 'About BMI Check',
    aboutParagraph1: 'BMI Check is a premium, offline-first personal wellness tool engineered to track and analyze Body Mass Index seamlessly with high privacy standards.',
    aboutParagraph2: 'All calculations are performed locally on your device. We never transmit your weight or biometric tracking data to external databases, giving you full control over your private information.',
    privacyTitle: 'Privacy Policy & Terms',
    privacyParagraph1: 'We deeply value your trust. Your health metrics are encrypted and safely stored using browser sandbox storage (localStorage) in compliance with general medical storage hygiene.',
    privacyParagraph2: 'No third parties are ever integrated with this product, and security audits conform to modern sandbox patterns. We do not use trackers or advertising cookies.',
    version: 'Version 2.4.0 • Encrypted Connection',
    buildDate: 'Build 2026',
    saved: 'Saved!',
  },
  id: {
    appName: 'BMI Check',
    welcomeBack: 'Selamat Datang',
    welcomeSubtitle: 'Perjalanan menuju hidup lebih sehat dimulai dari langkah pertama.',
    fullName: 'Nama Lengkap',
    emailAddress: 'Alamat Email',
    login: 'Masuk / Login',
    trustDisclaimer: 'Data kesehatan Anda (tinggi, berat, BMI) disimpan secara lokal di perangkat Anda. Nama & email hanya untuk kartu profil lokal.',
    welcomeUser: 'Halo, {name}!',
    readyTrack: 'Siap memantau kemajuan kesehatan Anda hari ini?',
    newEntry: 'Entri Baru',
    calculateBmi: 'Hitung BMI',
    bentoSubtitle: 'Dapatkan skor kesehatan Anda dalam waktu kurang dari 30 detik.',
    startCalc: 'Mulai Perhitungan',
    lastRecordedBmi: 'BMI Terakhir',
    recordedOn: 'Dicatat pada {date}',
    under: 'Kurus',
    normal: 'Normal',
    over: 'Gemuk',
    viewHistory: 'Riwayat BMI',
    viewHistorySub: 'Pantau tren berat badan Anda',
    settings: 'Pengaturan',
    settingsSub: 'Bahasa & Profil Pengguna',
    dailyHealthTip: 'Tips Kesehatan Hari Ini',
    home: 'Beranda',
    calculatorLabel: 'Kalkulator',
    historyLabel: 'Riwayat',
    settingsLabel: 'Pengaturan',
    changeLang: 'Ganti Bahasa',
    aboutApp: 'Tentang Aplikasi',
    privacyPolicy: 'Kebijakan Privasi',
    logout: 'Keluar / Logout',
    calcYourBmi: 'Hitung BMI Anda',
    calcBmiSub: 'Analisis biometrik instan dan akurat.',
    heightCm: 'Tinggi Badan (cm)',
    weightKg: 'Berat Badan (kg)',
    clearData: 'Bersihkan Data',
    yourResult: 'Hasil Anda',
    yourCurrentBmi: 'BMI ANDA SAAT INI',
    healthyRange: 'Sehat',
    healthInsight: 'Analisis Kesehatan',
    insightNormal: 'Pelihara pola makan seimbang dan berolahraga secara rutin demi mempertahankan BMI ideal ini.',
    insightHigh: 'Silakan konsultasikan dengan dokter atau tingkatkan aktivitas harian agar mendekati berat ideal.',
    insightLow: 'Menambahkan porsi makan bernutrisi dapat membantu mengais berat badan ke skala normal.',
    idealRange: 'Kisaran Berat Ideal',
    difference: 'Perbandingan',
    saveToHistory: 'Simpan ke Riwayat',
    shareResult: 'Bagikan Hasil',
    historyTitle: 'Riwayat Catatan',
    clearAll: 'Hapus Semua',
    bmiTrend: 'TREN BMI',
    recentEntries: 'Entri Terakhir',
    noEntriesYet: 'Belum ada entri',
    noEntriesSub: 'Mulai hitung BMI Anda untuk melihat perkembangan kesehatan Anda di sini.',
    aboutTitle: 'Tentang BMI Check',
    aboutParagraph1: 'BMI Check adalah aplikasi kesehatan premium offline-first yang dirancang untuk menghitung, melacak, dan menganalisis Indeks Massa Tubuh secara instan.',
    aboutParagraph2: 'Seluruh kalkulasi dilakukan di dalam perangkat Anda. Kami tidak pernah membagikan atau memindahkan data pribadi Anda ke luar, memberi Anda privasi penuh.',
    privacyTitle: 'Kebijakan Privasi',
    privacyParagraph1: 'Data kesehatan Anda dienkripsi serta disimpan secara aman di dalam sandbox peramban (localStorage) yang terlindung.',
    privacyParagraph2: 'Tidak ada pelacak iklan pihak ketiga atau cookie yang mengintai aktivitas Anda.',
    version: 'Versi 2.4.0 • Koneksi Terenkripsi',
    buildDate: 'Rilis 2026',
    saved: 'Disimpan!',
  }
};

export const HEALTH_TIPS = {
  en: [
    "Drinking a glass of water before each meal can help improve digestion and manage appetite.",
    "Aim for 7-8 hours of sound sleep every night to ensure proper growth and cellular recovery.",
    "Consistency is key! A steady 20-minute daily walk beats a heavy 2-hour workout once a week.",
    "Incorporate colorful vegetables to your plate; different colors mean diverse antioxidants.",
    "Don't skip breakfast. A balanced high-protein breakfast stabilizes morning glucose spikes."
  ],
  id: [
    "Meminum segelas air putih sebelum makan dapat melancarkan pencernaan dan meredam nafsu makan berlebih.",
    "Targetkan tidur nyenyak selama 7-8 jam per malam untuk pemulihan optimal sel-sel tubuh.",
    "Konsistensi adalah kunci! Berjalan kaki 20 menit sehari jauh lebih baik dari olahraga berat 2 jam sekali seminggu.",
    "Tambahkan berbagai sayuran warna-warni pada piring makan Anda untuk pemenuhan antioksidan.",
    "Jangan lewatkan sarapan. Sarapan tinggi protein membantu menstabilkan energi dan kadar gula darah."
  ]
};

export function getBmiTips(bmi: number, lang: AppLanguage): string[] {
  if (bmi < 18.5) {
    return lang === 'id' ? [
      "Tingkatkan frekuensi makan secara bertahap (5-6 porsi kecil sehari).",
      "Pilih makanan padat kalori dan protein tinggi seperti telur, susu, kacang, dan alpukat.",
      "Lakukan latihan kekuatan fisik (weight training) untuk menguatkan & membangun massa otot.",
      "Hindari minum air putih berlebih tepat sebelum makan agar porsi utama terjaga."
    ] : [
      "Increase eating frequency gradually to 5-6 smaller nutrient-filled meals a day.",
      "Choose nutrient-dense high-protein foods like eggs, dairy, nuts, and avocados.",
      "Practice strength and resistance training to build healthy skeletal muscle mass.",
      "Avoid drinking too much water just before meals to preserve appetite for food."
    ];
  } else if (bmi < 25) {
    return lang === 'id' ? [
      "Pertahankan pola makan bervariasi dengan porsi seimbang karbohidrat, sayuran, dan protein.",
      "Tetap aktif secara fisik dengan kombinasi olahraga kardio dan kekuatan minimal 150 menit per minggu.",
      "Minum air putih minimal 2 liter sehari dan hindari duduk terlalu lama (sedentary lifestyle).",
      "Istirahat berkualitas secara konsisten 7-8 jam setiap malam untuk penyegaran sel tubuh."
    ] : [
      "Maintain a varied diet with balanced portions of complex carbs, green vegetables, and lean protein.",
      "Stay physically active with at least 150 minutes of weekly moderate aerobic & resistance exercises.",
      "Drink at least 2 liters of pure water daily and reduce prolonged sedentary posture.",
      "Maintain consistent quality sleep of 7-8 hours per night for cell rejuvenation."
    ];
  } else if (bmi < 30) {
    return lang === 'id' ? [
      "Batasi makanan ultra-proses, makanan tinggi gula tambahan, tepung biasa, serta gorengan berlebih.",
      "Isi setengah piring makan Anda dengan sayur garing dan buah kaya serat penahan lapar.",
      "Tingkatkan olahraga aerobik reguler seperti jalan cepat, bersepeda, atau berenang (30-45 menit).",
      "Praktikkan kontrol porsi makan (conscious portion control) dan hindari ngemil sebelum tidur."
    ] : [
      "Limit highly-processed foods, simple sugars, refined flour, and saturated fried dishes.",
      "Fill half of your meal plates with colorful leafy vegetables and fiber-rich fresh fruits.",
      "Incorporate routine cardiovascular exercises such as brisk walking, cycling, or swimming (30-45 min).",
      "Practice conscious portion control and avoid high-calorie snacking before sleep."
    ];
  } else {
    return lang === 'id' ? [
      "Sangat disarankan berkonsultasi dengan ahli gizi atau dokter untuk perencanaan diet medis privat.",
      "Fokus pada kesehatan jantung dan metabolisme secara keseluruhan dibanding sekadar menurunkan berat badan kilat.",
      "Kurangi karbohidrat olahan secara bertahap dan prioritaskan serat, protein tanpa lemak, serta air mineral.",
      "Pilih aktivitas fisik beban ringan untuk sendi seperti senam air, berjalan santai, atau bersepeda statis."
    ] : [
      "It is highly recommended to consult a clinical dietitian or physician for tailored lifestyle pathing.",
      "Focus on holistic cardiovascular and metabolic health instead of aggressive rapid crash dieting.",
      "Gradually reduce simple carbohydrates and prioritize dietary fiber, lean protein, and pure water.",
      "Choose joint-friendly low-impact physical activities like water aerobics, walking, or stationary cycling."
    ];
  }
}

