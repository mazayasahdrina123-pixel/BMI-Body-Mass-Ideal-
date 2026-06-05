/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lightbulb, Save, CheckCircle, Share2, Clipboard, Sparkles } from 'lucide-react';
import { AppLanguage } from '../types';
import { translations, getBmiCategory, getIdealWeightRange, getBmiTips } from '../utils';

interface ResultsScreenProps {
  lang: AppLanguage;
  height: number;
  weight: number;
  onSave: () => void;
  onBack: () => void;
  isSaved: boolean;
  historyDiffStr?: string; // e.g., "-1.2 kg" or "+0.5 kg"
}

export default function ResultsScreen({
  lang,
  height,
  weight,
  onSave,
  onBack,
  isSaved: initialIsSaved,
  historyDiffStr,
}: ResultsScreenProps) {
  const t = translations[lang];
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Calculate stats
  const heightM = height / 100;
  const bmiVal = parseFloat((weight / (heightM * heightM)).toFixed(2));
  const cat = getBmiCategory(bmiVal, lang);
  const ideal = getIdealWeightRange(height);

  // Compute difference if not provided
  // Compare to center of ideal weight (BMI 21.7)
  const idealMidPoint = 21.7 * heightM * heightM;
  const rawDiff = weight - idealMidPoint;
  const finalDiffStr = historyDiffStr || `${rawDiff > 0 ? '+' : ''}${rawDiff.toFixed(1)} kg`;

  // Insight based on BMI
  let insightText = t.insightNormal;
  if (bmiVal < 18.5) {
    insightText = t.insightLow;
  } else if (bmiVal >= 25) {
    insightText = t.insightHigh;
  }

  const handleSaveClick = () => {
    if (!isSaved) {
      onSave();
      setIsSaved(true);
      triggerToast(t.saved);
    }
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleShare = () => {
    const textToShare = `${t.appName} Result:\nBMI: ${bmiVal} (${cat.label})\nWeight: ${weight} kg\nHeight: ${height} cm\nIdeal weight range: ${ideal.min} - ${ideal.max} kg.\nCalculate yours securely on BMI Check!`;
    
    if (navigator.share) {
      navigator.share({
        title: t.appName,
        text: textToShare,
      })
      .then(() => triggerToast(lang === 'id' ? 'Berhasil dibagikan!' : 'Shared successfully!'))
      .catch(() => {
        // Fallback to clipboard
        copyToClipboard(textToShare);
      });
    } else {
      copyToClipboard(textToShare);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      triggerToast(lang === 'id' ? 'Hasil disalin ke papan klip!' : 'Result copied to clipboard!');
    }).catch(() => {
      triggerToast(lang === 'id' ? 'Gagal menyalin' : 'Copy failed');
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen text-on-surface bg-background pb-[96px]"
      id="results-screen"
    >
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-45 bg-white flex justify-between items-center h-16 px-6 border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            aria-label="Back to calculator" 
            className="p-1 -ml-1 text-primary hover:opacity-80 active:scale-95 transition-transform duration-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display text-xl font-bold text-primary">{t.appName}</h1>
        </div>
      </header>

      {/* Content wrapper */}
      <main className="flex-grow w-full max-w-md mx-auto px-6 pt-6 flex flex-col gap-5">
        
        {/* Toast alert */}
        {showToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs font-semibold px-4 py-2.5 rounded-full z-[100] shadow-lg flex items-center gap-2 border border-outline/20">
            <Sparkles className="w-4 h-4 text-primary-container" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* BMI Card Display */}
        <section className="bg-white border border-outline-variant/50 rounded-2xl p-6 text-center shadow-md relative overflow-hidden">
          {/* Top color indicator ribbon */}
          <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: cat.color }} />
          
          <p className="font-sans text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wider">
            {t.yourCurrentBmi}
          </p>
          
          <div className="font-display text-6xl font-bold text-primary tracking-tight my-2" style={{ color: cat.color }}>
            {bmiVal.toFixed(2)}
          </div>

          {/* Category Pill */}
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 ${cat.badgeBg}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${cat.dotColor} animate-pulse`} />
            <span className="font-sans text-sm font-bold">{cat.label}</span>
          </div>

          {/* Solid segmented gauge bar visualization */}
          <div className="w-full h-3 bg-surface-container-high rounded-full relative mb-5 flex overflow-hidden">
            <div className="h-full bg-[#64a8fe] opacity-30 w-[30%]" />
            <div className="h-full bg-[#4ade80] opacity-40 w-[35%]" />
            <div className="h-full bg-[#f6bb1f] opacity-35 w-[15%]" />
            <div className="h-full bg-[#ba1a1a] opacity-35 flex-1" />
            
            {/* Pointer Pin Needle */}
            <div 
              className="absolute top-[-4px] w-1 h-5 rounded-full z-10 border border-white shadow" 
              style={{ left: `${cat.positionPercent}%`, backgroundColor: '#191c1e', transform: 'translateX(-50%)' }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="flex flex-col">
              <span className="text-[10px] text-outline uppercase font-semibold">{t.under}</span>
              <span className="font-semibold text-outline-dark mt-0.5">&lt;18.5</span>
            </div>
            <div className="flex flex-col border-x border-outline-variant/40">
              <span className="text-[10px] text-primary uppercase font-bold tracking-wider">{t.healthyRange}</span>
              <span className="font-bold text-primary mt-0.5">18.5 - 25</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-outline uppercase font-semibold">{t.over}</span>
              <span className="font-semibold text-outline-dark mt-0.5">25+</span>
            </div>
          </div>
        </section>

        {/* Smart recommendation card */}
        <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/30 flex gap-4 items-start shadow-sm">
          <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
            <Lightbulb className="w-5 h-5 shrink-0" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="font-display text-sm font-bold text-on-surface">{t.healthInsight}</h3>
            <p className="font-sans text-xs leading-relaxed text-on-surface-variant">
              {insightText}
            </p>
          </div>
        </div>

        {/* Specific Condition Tips */}
        <section className="bg-white border border-outline-variant/40 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="bg-primary/10 text-primary p-1.5 rounded-lg shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-display text-sm font-bold text-on-surface">
              {lang === 'id' ? 'Saran & Tips Kondisi' : 'Condition-Specific Tips'}
            </h3>
          </div>
          <ul className="space-y-3">
            {getBmiTips(bmiVal, lang).map((item, idx) => (
              <li key={idx} className="flex gap-2.5 items-start">
                <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: cat.color }} />
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Biometric Analysis Grid Details */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Ideal Weight Card */}
          <div className="bg-white border border-outline-variant/50 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-on-surface-variant font-sans text-[11px] font-semibold uppercase tracking-wider">
              {t.idealRange}
            </span>
            <p className="font-display text-lg font-bold text-on-surface mt-1.5">
              {ideal.min} - {ideal.max} <span className="text-xs font-normal text-on-surface-variant">kg</span>
            </p>
          </div>

          {/* Difference card */}
          <div className="bg-white border border-outline-variant/50 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
            <span className="text-on-surface-variant font-sans text-[11px] font-semibold uppercase tracking-wider">
              {t.difference}
            </span>
            <p className="font-display text-lg font-bold mt-1.5 text-primary">
              {finalDiffStr}
            </p>
          </div>

        </div>

        {/* Primary Action Button sets */}
        <div className="flex flex-col gap-3 mt-auto">
          
          <button
            onClick={handleSaveClick}
            className={`w-full h-[56px] rounded-xl font-display text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isSaved 
                ? 'bg-[#eceef0] text-outline border border-[#bccabb]/30 cursor-not-allowed'
                : 'bg-primary text-on-primary hover:opacity-95 shadow-md shadow-primary/10 active:scale-[0.98]'
            }`}
            disabled={isSaved}
          >
            {isSaved ? (
              <>
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>{t.saveToHistory}</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="w-full border-[1.5px] border-secondary text-secondary h-[56px] rounded-xl font-display text-sm font-bold hover:bg-secondary/5 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>{t.shareResult}</span>
          </button>

        </div>

      </main>
    </motion.div>
  );
}
