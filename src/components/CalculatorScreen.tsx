/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calculator, RotateCcw, AlertCircle } from 'lucide-react';
import { AppLanguage } from '../types';
import { translations } from '../utils';

interface CalculatorScreenProps {
  lang: AppLanguage;
  onCalculate: (height: number, weight: number) => void;
  onBack: () => void;
}

export default function CalculatorScreen({ lang, onCalculate, onBack }: CalculatorScreenProps) {
  const t = translations[lang];
  const [heightStr, setHeightStr] = useState('');
  const [weightStr, setWeightStr] = useState('');
  const [error, setError] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const h = parseFloat(heightStr);
    const w = parseFloat(weightStr);

    if (isNaN(h) || h <= 40 || h > 280) {
      setError(
        lang === 'id'
          ? 'Tinggi badan harus diisi secara valid (41cm - 280cm)'
          : 'Please enter a valid height (41cm - 280cm)'
      );
      return;
    }

    if (isNaN(w) || w <= 2 || w > 450) {
      setError(
        lang === 'id'
          ? 'Berat badan harus diisi secara valid (3kg - 450kg)'
          : 'Please enter a valid weight (3kg - 450kg)'
      );
      return;
    }

    onCalculate(h, w);
  };

  const handleClear = () => {
    setHeightStr('');
    setWeightStr('');
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-screen text-on-surface bg-background pb-[96px]"
      id="calculator-screen"
    >
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-45 bg-white flex justify-between items-center h-16 px-6 border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            aria-label="Back to dashboard" 
            className="p-1 -ml-1 text-primary hover:opacity-80 active:scale-95 transition-transform duration-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display text-xl font-bold text-primary">{t.appName}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full max-w-md mx-auto px-6 pt-6">
        
        {/* Visual Hero Banner */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 bg-white flex items-center justify-center group">
            <img 
              alt="Medical Wellness Banner" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.03] duration-75 transition-transform" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvq9UK9_WXa5cvCfZSwUj3TOjWiFStUGG5g5jJ1fZWRyama3KG6YV0Wm8iuxc-d2fWs5fm3CGTgf-_iAAmC878iOUqziJgIIHu1pU6C5AHvFxtrNsJf-2MLktZcsyHGIjFG7A5Rd5MsjH26wqhA1IXpUZrE1PxN98SWN4uPqn-Ce0WbIM6z3ICaNIuqK5LHq8J7iIp1pGn35ym7GXYbVLBqI6XCOsa8ecmTj45R_04M5M_M5aPmIV4DPTIaMX0kw1s0wAAT5cWenY"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
            <div className="relative z-10 text-center px-4 self-end pb-4">
              <p className="font-display text-xl text-primary font-bold">{t.calcYourBmi}</p>
              <p className="font-sans text-xs text-on-surface-variant font-medium">{t.calcBmiSub}</p>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCalculate} className="space-y-5">
          {error && (
            <div className="p-3 bg-error-container text-on-error-container text-xs rounded-xl flex items-center gap-2 border border-error/10 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Height Input (cm) */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-semibold text-on-surface-variant ml-1" htmlFor="height">
              {t.heightCm}
            </label>
            <div className="relative flex items-center bg-white border border-outline-variant rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
              <span className="absolute left-4 font-sans text-xs font-bold text-outline uppercase">H</span>
              <input
                id="height"
                className="w-full h-14 pl-12 pr-12 bg-transparent font-sans text-lg focus:outline-none"
                placeholder="175"
                type="number"
                step="any"
                inputMode="decimal"
                value={heightStr}
                onChange={(e) => setHeightStr(e.target.value)}
              />
              <span className="absolute right-4 font-sans text-xs text-outline">cm</span>
            </div>
          </div>

          {/* Weight Input (kg) */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-semibold text-on-surface-variant ml-1" htmlFor="weight">
              {t.weightKg}
            </label>
            <div className="relative flex items-center bg-white border border-outline-variant rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
              <span className="absolute left-4 font-sans text-xs font-bold text-outline uppercase">W</span>
              <input
                id="weight"
                className="w-full h-14 pl-12 pr-12 bg-transparent font-sans text-lg focus:outline-none"
                placeholder="70"
                type="number"
                step="any"
                inputMode="decimal"
                value={weightStr}
                onChange={(e) => setWeightStr(e.target.value)}
              />
              <span className="absolute right-4 font-sans text-xs text-outline">kg</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              className="w-full h-[56px] bg-primary text-on-primary rounded-xl font-display text-sm font-semibold uppercase tracking-wider shadow hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator className="w-5 h-5" />
              <span>{t.calculateBmi}</span>
            </button>
            
            <button
              type="button"
              onClick={handleClear}
              className="w-full h-[56px] border-[1.5px] border-secondary text-secondary rounded-xl font-display text-sm font-semibold uppercase tracking-wider hover:bg-secondary/5 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.clearData}</span>
            </button>
          </div>
        </form>

      </main>
    </motion.div>
  );
}
