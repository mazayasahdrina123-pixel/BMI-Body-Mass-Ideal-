/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trash2, Trash, TrendingDown, EyeOff, Search, Calendar, Scale, Ruler, Filter } from 'lucide-react';
import { AppLanguage, BmiHistoryEntry } from '../types';
import { translations, getBmiCategory } from '../utils';

interface HistoryScreenProps {
  lang: AppLanguage;
  history: BmiHistoryEntry[];
  onDeleteEntry: (id: string) => void;
  onClearAll: () => void;
}

export default function HistoryScreen({ lang, history, onDeleteEntry, onClearAll }: HistoryScreenProps) {
  const t = translations[lang];

  // Calculate trends for chart or default placeholders if empty
  const hasHistory = history.length > 0;
  
  // Format trend months based on past records or mockup months (Jan - Jun)
  const defaultMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'];
  const defaultBmis = [24.0, 23.5, 23.1, 22.8, 22.4, 21.8]; // Mirror mockup trend nicely

  // If we have history, let's map the recent 6 bmis to bars in chronological order
  const activeBmis = hasHistory 
    ? [...history].reverse().slice(-6).map(e => e.bmi)
    : defaultBmis;

  const maxBmi = Math.max(...activeBmis, 30);
  const minBmiValue = Math.min(...activeBmis, 15);

  // Compute overall monthly progress
  let progressStr = '-1.2 this month';
  if (hasHistory) {
    if (history.length >= 2) {
      const latest = history[0].bmi;
      const oldest = history[history.length - 1].bmi;
      const diff = latest - oldest;
      progressStr = `${diff >= 0 ? '+' : ''}${diff.toFixed(1)} overall`;
      if (lang === 'id') {
        progressStr = `${diff >= 0 ? '+' : ''}${diff.toFixed(1)} keseluruhan`;
      }
    } else {
      progressStr = lang === 'id' ? 'Tercatat' : 'Recorded';
    }
  } else {
    progressStr = lang === 'id' ? '-1.2 bulan ini' : '-1.2 this month';
  }

  const handleClearAllClick = () => {
    const doubleCheck = lang === 'id' 
      ? window.confirm('Apakah Anda yakin ingin menghapus seluruh riwayat?') 
      : window.confirm('Are you sure you want to clear all history entries?');
    if (doubleCheck) {
      onClearAll();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-screen text-on-surface bg-background pb-[96px]"
      id="history-screen"
    >
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-45 bg-white flex justify-between items-center h-16 px-6 border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-xl font-bold text-primary">{t.historyTitle}</h1>
        </div>
        {hasHistory && (
          <button
            onClick={handleClearAllClick}
            className="font-sans text-xs font-bold text-error hover:opacity-85 flex items-center gap-1 active:scale-95 cursor-pointer"
            id="clear-all-btn"
          >
            <Trash2 className="w-4 h-4 shrink-0" />
            <span>{t.clearAll}</span>
          </button>
        )}
      </header>

      {/* Content wrapper */}
      <main className="w-full max-w-md mx-auto flex-1 px-6 py-6 pb-24 overflow-y-auto">
        
        {/* BMI TREND CHART CARD */}
        <section className="mb-6 animate-scale-in">
          <div className="bg-white border border-outline-variant/40 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-wider">{t.bmiTrend}</h2>
              <span className="font-sans text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {progressStr}
              </span>
            </div>

            {/* Interactive Visual Bar Trend chart */}
            <div className="relative h-44 flex items-end justify-between gap-1 pt-6 pb-2 px-1">
              {/* Dynamic curved SVG overlay for elegant trendlines as in mockup */}
              <svg className="absolute bottom-8 left-0 w-full h-[70px] opacity-25 stroke-primary fill-none pointer-events-none" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path d="M0,80 Q50,60 100,75 T200,45 T300,55 T400,30" strokeWidth="3" strokeLinecap="round" />
              </svg>

              {/* Chart Bars loop */}
              {activeBmis.map((val, idx) => {
                const heightPercent = Math.min(100, Math.max(25, ((val - 12) / (maxBmi - 10)) * 100)); // Scaled percentage
                const barLabel = hasHistory && history.length >= idx + 1
                  ? new Date(history[history.length - 1 - idx].rawDate).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short' }).toUpperCase()
                  : defaultMonths[idx];

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                    
                    {/* Hover metric popup tooltip banner */}
                    <div className="absolute top-[-10px] bg-inverse-surface text-inverse-on-surface text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
                      {val.toFixed(1)}
                    </div>

                    {/* Colored Indicator on top of latest bar */}
                    {idx === activeBmis.length - 1 && (
                      <div className="absolute -top-5 text-primary text-[10px] font-bold animate-bounce hidden sm:block">
                        {val.toFixed(1)}
                      </div>
                    )}

                    {/* Bar graphic with custom gradient/opacities */}
                    <div 
                      className={`w-full rounded-t-md transition-all duration-700 relative ${
                        idx === activeBmis.length - 1 
                          ? 'bg-primary' 
                          : 'bg-primary-container/30 group-hover:bg-primary-container/50'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    
                    {/* Column Month Label */}
                    <span className="text-[10px] text-outline font-bold tracking-tight mt-2">{barLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* History List recent entries Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-display text-lg font-bold text-on-surface">{t.recentEntries}</h2>
            <button className="text-primary hover:opacity-80 active:scale-95 transition-transform">
              <Filter className="w-5 h-5 text-primary" />
            </button>
          </div>

          {/* List items dynamic render */}
          {hasHistory ? (
            <div className="flex flex-col gap-3">
              {history.map((entry) => {
                const itemCat = getBmiCategory(entry.bmi, lang);
                
                return (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="history-item bg-white border border-outline-variant/30 rounded-xl p-4 flex items-center justify-between gap-4 transition-all hover:shadow-md group relative overflow-hidden"
                  >
                    {/* Visual left colored category block strip */}
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: itemCat.color }} />

                    {/* Circle metric score */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-display text-base font-bold shrink-0 shadow-inner"
                      style={{ backgroundColor: itemCat.bgColor, color: itemCat.color }}
                    >
                      {entry.bmi.toFixed(1)}
                    </div>

                    {/* Middle details text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <span className="font-sans text-xs font-bold text-on-surface truncate">
                          {itemCat.label}
                        </span>
                        <span className="font-sans text-[10px] text-outline whitespace-nowrap">
                          {entry.date}
                        </span>
                      </div>
                      
                      {/* Metric mini subdetails row */}
                      <div className="flex gap-4 mt-1.5 text-xs text-on-surface-variant font-medium">
                        <div className="flex items-center gap-1">
                          <Ruler className="w-3.5 h-3.5 text-outline" />
                          <span>{entry.height} cm</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Scale className="w-3.5 h-3.5 text-outline" />
                          <span>{entry.weight} kg</span>
                        </div>
                      </div>
                    </div>

                    {/* Delete action button */}
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="p-2 text-error bg-error/5 hover:bg-error/15 rounded-full duration-150 transition-colors shrink-0 active:scale-95"
                      aria-label="Delete entry"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            
            /* Empty State visual block matching mockup */
            <div className="flex flex-col items-center justify-center py-12 text-center" id="empty-state">
              <div className="w-44 h-44 mb-6 rounded-full bg-surface-container-high/40 flex items-center justify-center relative overflow-hidden">
                <img 
                  alt="Empty history illustration" 
                  className="w-28 h-28 object-contain relative z-10" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpglToXeg0Vl8USR4VoM2PUVeeHfiUNqvdyKRvFt8-8UIN9019EsCjkFcIhTvvOSW-wSfrmF3x6QCBYvxsGDdzju2VcpkVQ1CCly8hCJbyrhj_kkdkGT3FEDusFVtEy_4FqKdjv9RvZ1IQ551_WPQb5KTi93dPvWpiDhUk_TeFQr_cBO6EQtXce53WG1vaTwJRytnAfYQm6CIJQ9jgmJ-HaEWKe4AgWiuNWDdNHdZpyBo6VTRaG5rl8lQUVLhpSC_SaKJU9SdFglI"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary-container/5 blur-xl pointer-events-none" />
              </div>
              <h3 className="font-display text-base font-bold text-on-surface mb-1">{t.noEntriesYet}</h3>
              <p className="font-sans text-xs text-on-surface-variant max-w-[220px] mx-auto leading-relaxed">
                {t.noEntriesSub}
              </p>
            </div>
          )}
        </section>

      </main>
    </motion.div>
  );
}
