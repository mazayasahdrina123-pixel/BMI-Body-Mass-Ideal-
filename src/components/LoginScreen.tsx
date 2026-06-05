/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';
import { AppLanguage, UserProfile } from '../types';
import { translations } from '../utils';

interface LoginScreenProps {
  lang: AppLanguage;
  onLogin: (profile: UserProfile) => void;
}

export default function LoginScreen({ lang, onLogin }: LoginScreenProps) {
  const t = translations[lang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(lang === 'id' ? 'Nama lengkap wajib diisi' : 'Full Name is required');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError(lang === 'id' ? 'Alamat email tidak valid' : 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        name: name.trim(),
        email: email.trim(),
      });
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen text-on-surface bg-background"
      id="login-screen"
    >
      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-surface flex justify-between items-center h-16 px-6 z-50 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-xl font-bold text-primary">{t.appName}</h1>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-8 max-w-md mx-auto w-full">
        
        {/* Animated Hero Icon */}
        <div className="w-full mb-8 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
            <div className="relative bg-white border border-outline-variant flex items-center justify-center w-full h-full rounded-full shadow-sm">
              <ShieldCheck className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-on-surface mb-2">{t.welcomeBack}</h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-[280px] mx-auto">{t.welcomeSubtitle}</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {error && (
            <div className="p-3 bg-error-container text-on-error-container text-xs rounded-xl flex items-center gap-2 border border-error/10 animate-shake">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Full Name Input */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-semibold text-on-surface-variant ml-1" htmlFor="full-name">
              {t.fullName}
            </label>
            <div className="relative flex items-center bg-white border border-outline-variant rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
              <User className="absolute left-4 w-5 h-5 text-outline" />
              <input
                id="full-name"
                className="w-full h-14 pl-12 pr-4 bg-transparent font-sans text-base outline-none border-none placeholder:text-outline-variant"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                type="text"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs font-semibold text-on-surface-variant ml-1" htmlFor="email-address">
              {t.emailAddress}
            </label>
            <div className="relative flex items-center bg-white border border-outline-variant rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-300">
              <Mail className="absolute left-4 w-5 h-5 text-outline" />
              <input
                id="email-address"
                className="w-full h-14 pl-12 pr-4 bg-transparent font-sans text-base outline-none border-none placeholder:text-outline-variant"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                type="email"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              className="w-full h-[56px] bg-primary text-on-primary font-display text-lg font-bold rounded-full shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t.login}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center gap-4 my-8">
          <div className="h-[1px] flex-grow bg-outline-variant/30" />
          <span className="font-sans text-[10px] font-bold tracking-wider text-outline uppercase">TRUST &amp; SECURITY</span>
          <div className="h-[1px] flex-grow bg-outline-variant/30" />
        </div>

        {/* Security / Privacy Assurance Card */}
        <div className="w-full p-4 bg-surface-container-low border border-outline-variant/20 rounded-xl flex gap-3 items-start shadow-sm">
          <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
            {t.trustDisclaimer}
          </p>
        </div>
      </main>

      {/* Footer Version Details */}
      <footer className="w-full px-6 pb-8 mt-auto flex flex-col items-center">
        <div className="h-1 w-12 bg-outline-variant/30 rounded-full mb-4" />
        <p className="font-sans text-[10px] text-outline text-center">{t.version}</p>
      </footer>
    </motion.div>
  );
}
