/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Calculator, History, Settings } from 'lucide-react';
import { AppScreen, AppLanguage } from '../types';
import { translations } from '../utils';

interface BottomNavBarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  lang: AppLanguage;
}

export default function BottomNavBar({ currentScreen, onNavigate, lang }: BottomNavBarProps) {
  const t = translations[lang];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center h-[72px] pb-safe bg-white border-t border-outline-variant/20 shadow-lg">
      
      {/* Home tab */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center p-2 min-w-[70px] transition-transform active:scale-95 duration-100 cursor-pointer rounded-xl ${
          currentScreen === 'home'
            ? 'text-primary'
            : 'text-on-surface-variant'
        }`}
      >
        <div className={`p-1 px-4 rounded-full flex flex-col items-center gap-1 ${
          currentScreen === 'home' ? 'bg-primary-container/30 text-primary font-semibold' : ''
        }`}>
          <Home className="w-5 h-5" />
          <span className="font-sans text-[11px] tracking-wide font-medium">{t.home}</span>
        </div>
      </button>

      {/* Calculator tab */}
      <button
        onClick={() => onNavigate('calculator')}
        className={`flex flex-col items-center justify-center p-2 min-w-[70px] transition-transform active:scale-95 duration-100 cursor-pointer rounded-xl ${
          currentScreen === 'calculator' || currentScreen === 'results'
            ? 'text-primary'
            : 'text-on-surface-variant'
        }`}
      >
        <div className={`p-1 px-4 rounded-full flex flex-col items-center gap-1 ${
          currentScreen === 'calculator' || currentScreen === 'results' ? 'bg-primary-container/30 text-primary font-semibold' : ''
        }`}>
          <Calculator className="w-5 h-5" />
          <span className="font-sans text-[11px] tracking-wide font-medium">{t.calculatorLabel}</span>
        </div>
      </button>

      {/* History tab */}
      <button
        onClick={() => onNavigate('history')}
        className={`flex flex-col items-center justify-center p-2 min-w-[70px] transition-transform active:scale-95 duration-100 cursor-pointer rounded-xl ${
          currentScreen === 'history'
            ? 'text-primary'
            : 'text-on-surface-variant'
        }`}
      >
        <div className={`p-1 px-4 rounded-full flex flex-col items-center gap-1 ${
          currentScreen === 'history' ? 'bg-primary-container/30 text-primary font-semibold' : ''
        }`}>
          <History className="w-5 h-5" />
          <span className="font-sans text-[11px] tracking-wide font-medium">{t.historyLabel}</span>
        </div>
      </button>

      {/* Settings tab */}
      <button
        onClick={() => onNavigate('settings')}
        className={`flex flex-col items-center justify-center p-2 min-w-[70px] transition-transform active:scale-95 duration-100 cursor-pointer rounded-xl ${
          currentScreen === 'settings'
            ? 'text-primary'
            : 'text-on-surface-variant'
        }`}
      >
        <div className={`p-1 px-4 rounded-full flex flex-col items-center gap-1 ${
          currentScreen === 'settings' ? 'bg-primary-container/30 text-primary font-semibold' : ''
        }`}>
          <Settings className="w-5 h-5" />
          <span className="font-sans text-[11px] tracking-wide font-medium">{t.settingsLabel}</span>
        </div>
      </button>

    </nav>
  );
}
