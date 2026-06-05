/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Globe, Info, ShieldCheck, LogOut, ChevronRight, X } from 'lucide-react';
import { AppLanguage, UserProfile } from '../types';
import { translations } from '../utils';

interface SettingsScreenProps {
  lang: AppLanguage;
  profile: UserProfile;
  onChangeLangClick: () => void;
  onLogout: () => void;
  onBack: () => void;
}

export default function SettingsScreen({ lang, profile, onChangeLangClick, onLogout, onBack }: SettingsScreenProps) {
  const t = translations[lang];
  const [modalType, setModalType] = useState<'none' | 'about' | 'privacy'>('none');

  const handleLogoutClick = () => {
    const confirmation = lang === 'id' 
      ? window.confirm('Apakah Anda yakin ingin keluar?') 
      : window.confirm('Are you sure you want to log out?');
    if (confirmation) {
      onLogout();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-screen text-on-surface bg-background pb-[96px]"
      id="settings-screen"
    >
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-45 bg-white flex justify-between items-center h-16 px-6 border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            aria-label="Back" 
            className="p-1 -ml-1 text-primary hover:opacity-85 active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-display text-xl font-bold text-primary">{t.appName}</h1>
        </div>
      </header>

      {/* Main Settings Panel */}
      <main className="flex-1 w-full max-w-md mx-auto px-6 pt-6 flex flex-col gap-5">
        
        {/* User profile details quick view */}
        <section className="animate-scale-in">
          <div className="bg-white border border-outline-variant/50 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant/15 shrink-0">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjy803eKSbYh0J4Ybrz1Pbf5IdXtUNNTyxqGucA-9Y1cQ4m4sQCIsJ-5tbLFXYclgVTL9amnQMLwiUA9UVQ65UGrXV45GxorIPBOcO_CZZXCuH7l55YEUX8F6-t3MG93BX3JJ9sNSFx0xNvNwPPjMReS1Wb7kFpZb6HdGBddRisOtL3N-0TGmWNHYvdojLsEjMFvU0EIPwDnlacR6hDjPEU9XFlFoOquihpCGP-ofDwvq-F5ctsK6xYzptTXrgHeV16PLxsZwNhvs"
                alt="Alexis Profile"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-lg font-bold text-on-surface truncate pr-1">
                {profile.name}
              </h2>
              <p className="font-sans text-xs text-on-surface-variant truncate pr-1">
                {profile.email}
              </p>
            </div>
          </div>
        </section>

        {/* Action item lists */}
        <section className="flex flex-col gap-2.5">
          
          {/* Change Language choice button */}
          <button
            onClick={onChangeLangClick}
            className="w-full bg-white border border-outline-variant/40 p-4 rounded-xl flex items-center justify-between hover:bg-surface-container-low transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-4">
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-sans text-sm font-semibold text-on-surface">{t.changeLang}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-sans text-xs text-on-surface-variant mr-1">
                {lang === 'id' ? 'Bahasa Indonesia' : 'English'}
              </span>
              <ChevronRight className="w-4 h-4 text-outline group-hover:translate-x-0.5 duration-200 transition-transform" />
            </div>
          </button>

          {/* About Application toggle action */}
          <button
            onClick={() => setModalType('about')}
            className="w-full bg-white border border-outline-variant/40 p-4 rounded-xl flex items-center justify-between hover:bg-surface-container-low transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-4">
              <Info className="w-5 h-5 text-primary" />
              <span className="font-sans text-sm font-semibold text-on-surface">{t.aboutApp}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-outline group-hover:translate-x-0.5 duration-200 transition-transform" />
          </button>

          {/* Privacy committed Policy toggle action */}
          <button
            onClick={() => setModalType('privacy')}
            className="w-full bg-white border border-outline-variant/40 p-4 rounded-xl flex items-center justify-between hover:bg-surface-container-low transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="font-sans text-sm font-semibold text-on-surface">{t.privacyPolicy}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-outline group-hover:translate-x-0.5 duration-200 transition-transform" />
          </button>

        </section>

        {/* Clear Exit / Logout row actions */}
        <section className="mt-6 flex flex-col gap-6">
          <button
            onClick={handleLogoutClick}
            className="w-full h-14 bg-error-container text-on-error-container rounded-full font-display text-sm font-bold flex items-center justify-center gap-2 hover:bg-error-container/80 transition-colors active:scale-95 cursor-pointer shadow shadow-error/5"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>{t.logout}</span>
          </button>
          
          <p className="text-center font-sans text-xs text-outline">{t.version}</p>
        </section>

      </main>

      {/* Info Modals Container overlay */}
      <AnimatePresence>
        {modalType !== 'none' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-6 backdrop-blur-xs"
            onClick={() => setModalType('none')}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 border border-outline-variant/30 max-w-sm w-full shadow-2xl relative"
            >
              {/* Corner Close button */}
              <button 
                onClick={() => setModalType('none')}
                className="absolute top-4 right-4 p-1 rounded-full text-outline-dark hover:bg-surface-container-high active:scale-90 transition-all cursor-pointer"
              >
                <X className="w-4 h-4 text-on-surface" />
              </button>

              {/* Modal Contents based on selected state */}
              {modalType === 'about' && (
                <div>
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <Info className="w-5 h-5 shrink-0" />
                    <h3 className="font-display font-bold text-lg text-on-surface">{t.aboutTitle}</h3>
                  </div>
                  <div className="space-y-3 font-sans text-xs text-on-surface-variant leading-relaxed">
                    <p>{t.aboutParagraph1}</p>
                    <p>{t.aboutParagraph2}</p>
                  </div>
                </div>
              )}

              {modalType === 'privacy' && (
                <div>
                  <div className="flex items-center gap-2 mb-3 text-secondary">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <h3 className="font-display font-bold text-lg text-on-surface">{t.privacyTitle}</h3>
                  </div>
                  <div className="space-y-3 font-sans text-xs text-on-surface-variant leading-relaxed">
                    <p>{t.privacyParagraph1}</p>
                    <p>{t.privacyParagraph2}</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setModalType('none')}
                className="w-full mt-6 h-11 bg-primary text-on-primary font-display font-semibold rounded-xl hover:opacity-90 active:scale-95 duration-150 cursor-pointer"
              >
                Oke, Mengerti
              </button>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
