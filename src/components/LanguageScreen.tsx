/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { AppLanguage } from '../types';
import { translations } from '../utils';

interface LanguageScreenProps {
  currentLang: AppLanguage;
  onChangeLang: (lang: AppLanguage) => void;
  onContinue: () => void;
  onBackToLogin: () => void;
}

export default function LanguageScreen({ currentLang, onChangeLang, onContinue, onBackToLogin }: LanguageScreenProps) {
  const t = translations[currentLang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen text-on-surface bg-background"
      id="language-screen"
    >
      {/* TopAppBar */}
      <header className="w-full top-0 sticky flex justify-between items-center h-16 px-6 bg-surface z-50 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToLogin}
            aria-label="Back to login" 
            className="p-1 -ml-1 text-primary hover:opacity-80 active:scale-95 transition-transform duration-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display text-xl font-bold text-primary">{t.appName}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col justify-between px-6 pb-12 max-w-md mx-auto w-full">
        <div className="flex-grow flex flex-col justify-center">
          
          {/* Hero Illustration */}
          <div className="my-8 flex justify-center">
            <div className="relative w-full aspect-square max-w-[260px]">
              <div className="absolute inset-0 bg-primary-container/10 rounded-full blur-3xl animate-pulse" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7Uimnw6pEIGo24SUTby58OITp9BfrBMMR162Ez0dn0dk0hN1F-G6al2k8c0v8Ke92uiCghVT560zKxGRSl3z9W-VOiBAI0XoIHUdoP7eFUZ4ncB7Nduy-Tar9V9XSrdaOu3uyaqWDvtMXDHLwTs2dxu4pS1SPkeatbQ-fHJcBD4rsmR-UvvaCKtSYpgL_pAdpytHR4nxhphDsoM60ofrDn5YyuO_m-hcuNVsyBlkt5iYe64iOB3WJQpvyb9DXqAVTidszC11Qd0A"
                alt="Health Illustration"
                className="relative z-10 w-full h-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Welcome Title */}
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-on-surface mb-2">Welcome to BMI Check</h2>
            <p className="font-sans text-sm text-on-surface-variant px-4">
              Please select your preferred language to continue your health journey.
            </p>
          </div>

          {/* Language Options */}
          <div className="flex flex-col gap-3">
            
            {/* Bahasa Indonesia Button */}
            <button
              onClick={() => onChangeLang('id')}
              className={`flex items-center justify-between p-4 border rounded-xl transition-all duration-200 group active:scale-[0.99] ${
                currentLang === 'id'
                  ? 'border-primary bg-primary/5 shadow-sm shadow-primary/5 font-semibold text-primary'
                  : 'border-outline-variant bg-white text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAI-N2Cqxi6uD3E6llijVuNujly4WXi5MMbnENIiFViLJGr0Og1MXgbmqlUnefxV3WSKKlEtbFRhlfyRX8VHuYgKHEyeVgAovMgxTLAJ3zuff6h_Mg-Bw_77MDuo-zOVHQLUhLqVLXQl3BbEkDu9FjMxbdzpPvhbVBxnFhtgWzgmXQ7ZotGz2wIkDDy8Y0YjOyeBKo6HfjOFbyIlpnrTU6Zul19lhMCyrca0bRIblu6-t27FPX0dc_Svc7-BFvLjQVsCAUPE2n7Rc"
                  alt="Indonesia Flag"
                  className="w-8 h-6 object-cover rounded shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <span className="font-sans text-base">Bahasa Indonesia</span>
              </div>
              <div className={`radio-circle w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                currentLang === 'id' ? 'border-primary bg-primary' : 'border-outline'
              }`}>
                {currentLang === 'id' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
            </button>

            {/* English Button */}
            <button
              onClick={() => onChangeLang('en')}
              className={`flex items-center justify-between p-4 border rounded-xl transition-all duration-200 group active:scale-[0.99] ${
                currentLang === 'en'
                  ? 'border-primary bg-primary/5 shadow-sm shadow-primary/5 font-semibold text-primary'
                  : 'border-outline-variant bg-white text-on-surface hover:bg-surface-container-low'
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6U8rhLobAII5qSZdGumw3HZiWtAtfYHiHbrkQTpheZ5SY10xS0OS93Z0-FtSX-DeKlFlWH7Za3HJNeqMLI2xZKQYO3nF8nStTbcgDs9hnZHa_3KbZa_cwmJSWaS2UPqGIC5UVDWcSn5klbSoHBEGCJ953MXLox_9Lr7q4AV5arpddyPQXiaFhaPi9QINxRkjrYj7McmSUWRXwK6eci9UNdF5kPWFSy4BUVBV0TBFL0zFmKaU7KrGQeJC5sOQQWcf62FXL6CNc6AA"
                  alt="USA Flag"
                  className="w-8 h-6 object-cover rounded shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <span className="font-sans text-base">English</span>
              </div>
              <div className={`radio-circle w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                currentLang === 'en' ? 'border-primary bg-primary' : 'border-outline'
              }`}>
                {currentLang === 'en' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-8">
          <button
            onClick={onContinue}
            className="w-full h-14 bg-primary text-on-primary font-display text-base font-bold rounded-full shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.startCalc}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </motion.div>
  );
}
