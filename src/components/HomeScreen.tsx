/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, History, TrendingUp, Settings as SettingsIcon, Lightbulb, Calculator } from 'lucide-react';
import { AppLanguage, UserProfile, BmiHistoryEntry } from '../types';
import { translations, getBmiCategory, HEALTH_TIPS } from '../utils';

interface HomeScreenProps {
  profile: UserProfile;
  history: BmiHistoryEntry[];
  lang: AppLanguage;
  onNavigate: (screen: 'calculator' | 'history' | 'settings') => void;
}

export default function HomeScreen({ profile, history, lang, onNavigate }: HomeScreenProps) {
  const t = translations[lang];
  const [tip, setTip] = useState('');

  // Choose a random/rotating health tip
  useEffect(() => {
    const list = HEALTH_TIPS[lang];
    const index = Math.abs(profile.name.charCodeAt(0) + new Date().getDate()) % list.length;
    setTip(list[index]);
  }, [lang, profile.name]);

  // Find latest entry
  const latestEntry = history.length > 0 ? history[0] : null;
  const latestBmi = latestEntry ? latestEntry.bmi : 22.4; // Default starting preview
  const cat = getBmiCategory(latestBmi, lang);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-screen text-on-surface bg-background pb-[96px]"
      id="home-screen"
    >
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-45 bg-white flex justify-between items-center h-16 px-6 border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-xl font-bold text-primary">{t.appName}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant/20">
            <img 
              alt="User Avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkp0un_chpIQE_zbpWHvDzKDohgSVaoAVpHkFC1q93U5EpIlBmSWPPsAp2Ti35OYofkhKwV7pVpSIi673i0wfBVTdUmFpTDnV8wF0dfF4gYv5L76vKxVHjGq82gJFSkCvpNiBXPMYQ0s_RA_LaPpWRTZZXiuJqH0mG5RqokT-tCrPxkP6WRrly5DpNa909XcAGWrPpNKAAUW_OyGhV8IThZPjR-eVFJhbr6axn1PsSf32wlolKsXuBlupuANerd7eY6tkp2xAbNRk"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow px-6 pt-6">
        
        {/* Welcome Header */}
        <section className="mb-6">
          <h2 className="font-display text-2xl font-bold text-on-surface">
            {t.welcomeUser.replace('{name}', profile.name)}
          </h2>
          <p className="font-sans text-sm text-on-surface-variant mt-1">
            {t.readyTrack}
          </p>
        </section>

        {/* Bento Grid Layout */}
        <div className="flex flex-col gap-4">
          
          {/* Main Hero: Calculate BMI */}
          <button
            onClick={() => onNavigate('calculator')}
            className="w-full relative overflow-hidden bg-primary text-white rounded-2xl p-6 text-left flex flex-col justify-between min-h-[190px] shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group cursor-pointer"
          >
            <div className="z-10">
              <span className="bg-primary-container/20 text-white border border-white/25 px-3 py-1 rounded-full font-sans text-xs font-semibold mb-3 inline-block">
                {t.newEntry}
              </span>
              <h3 className="font-display text-2xl font-bold mt-1">{t.calculateBmi}</h3>
              <p className="font-sans text-xs text-white/80 mt-1 max-w-[240px]">
                {t.bentoSubtitle}
              </p>
            </div>
            <div className="mt-4 z-10 flex items-center gap-2 font-display text-sm font-semibold group-hover:translate-x-1.5 transition-transform duration-300">
              <span>{t.startCalc}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            {/* Visual Calculator Icon background */}
            <div className="absolute right-[-10px] bottom-[-10px] opacity-15 transform rotate-12 group-hover:scale-110 duration-500">
              <Calculator className="w-36 h-36" />
            </div>
          </button>

          {/* Last BMI Preview Card */}
          <div className="bg-white border border-outline-variant/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  {t.lastRecordedBmi}
                </span>
                <button 
                  onClick={() => onNavigate('history')}
                  aria-label="View history" 
                  className="text-primary hover:text-primary-container transition-colors"
                >
                  <History className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-4xl font-bold text-on-surface">
                  {latestEntry ? latestEntry.bmi.toFixed(2) : '---'}
                </span>
                <span className={`font-sans text-xs font-bold px-2.5 py-0.5 rounded-full ${cat.badgeBg}`}>
                  {latestEntry ? cat.label : (lang === 'id' ? 'Belum Ada data' : 'No entries')}
                </span>
              </div>
              <p className="font-sans text-xs text-on-surface-variant mt-1.5">
                {latestEntry 
                  ? t.recordedOn.replace('{date}', latestEntry.date)
                  : (lang === 'id' ? 'Silakan catat tinggi & berat Anda' : 'Please calculate your biometric details')
                }
              </p>
            </div>

            {/* Scale visualizer dot/pointer */}
            <div className="mt-5">
              <div className="h-2 w-full rounded-full relative overflow-visible bg-gradient-to-r from-[#64a8fe] via-[#4ade80] via-[#f6bb1f] to-[#ba1a1a]">
                {/* Needle Pin Indicator */}
                <div 
                  className="absolute top-[-5px] w-4 h-4 bg-white border-2 border-primary rounded-full shadow transition-all duration-500" 
                  style={{ left: `${cat.positionPercent}%`, transform: 'translateX(-50%)' }}
                />
              </div>
              <div className="flex justify-between mt-1.5 font-sans text-[10px] text-outline font-semibold">
                <span>{lang === 'id' ? 'Sangat Kurus' : 'Under'}</span>
                <span>{lang === 'id' ? 'Normal' : 'Normal'}</span>
                <span>{lang === 'id' ? 'Obesitas' : 'Over'}</span>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="grid grid-cols-1 gap-3">
            
            {/* View History */}
            <a 
              onClick={(e) => { e.preventDefault(); onNavigate('history'); }}
              className="bg-surface-container-low border border-outline-variant/35 rounded-xl p-4 flex items-center justify-between hover:bg-surface-container transition-all cursor-pointer group"
              href="#view-history"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-on-surface">{t.viewHistory}</h4>
                  <p className="font-sans text-xs text-on-surface-variant">{t.viewHistorySub}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
            </a>

            {/* Settings */}
            <a 
              onClick={(e) => { e.preventDefault(); onNavigate('settings'); }}
              className="bg-surface-container-low border border-outline-variant/35 rounded-xl p-4 flex items-center justify-between hover:bg-surface-container transition-all cursor-pointer group"
              href="#settings"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center">
                  <SettingsIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-on-surface">{t.settings}</h4>
                  <p className="font-sans text-xs text-on-surface-variant">{t.settingsSub}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
            </a>

          </div>

          {/* Health Tip Card */}
          <section className="mt-2">
            <div className="bg-on-primary-container rounded-2xl p-5 text-white relative overflow-hidden shadow-sm">
              <div className="relative z-10 flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container">
                  <Lightbulb className="w-5 h-5 text-primary-container" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-semibold uppercase tracking-wider mb-1 opacity-75">{t.dailyHealthTip}</h4>
                  <p className="font-sans text-sm leading-relaxed opacity-95">{tip}</p>
                </div>
              </div>
              {/* Glossy overlay effect as shown in design */}
              <div className="absolute top-0 right-0 w-24 h-full bg-white/5 skew-x-[-15deg] translate-x-8" />
            </div>
          </section>

        </div>

      </main>
    </motion.div>
  );
}
