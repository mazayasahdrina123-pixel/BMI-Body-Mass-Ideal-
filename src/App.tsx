/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppScreen, AppLanguage, UserProfile, BmiHistoryEntry } from './types';
import { calculateBmi, getBmiCategory } from './utils';

// Screens imports
import LoginScreen from './components/LoginScreen';
import LanguageScreen from './components/LanguageScreen';
import HomeScreen from './components/HomeScreen';
import CalculatorScreen from './components/CalculatorScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryScreen from './components/HistoryScreen';
import SettingsScreen from './components/SettingsScreen';
import BottomNavBar from './components/BottomNavBar';

// Mockup Initial Entries representing real health records
const INITIAL_ME_ENTRIES: BmiHistoryEntry[] = [
  {
    id: 'entry-1',
    bmi: 21.8,
    height: 178,
    weight: 69.2,
    category: 'Normal Weight',
    date: 'Jun 05, 09:15 AM',
    rawDate: '2026-06-05T09:15:00.000Z',
  },
  {
    id: 'entry-2',
    bmi: 22.4,
    height: 178,
    weight: 71.0,
    category: 'Normal Weight',
    date: 'Jun 02, 08:30 PM',
    rawDate: '2026-06-02T20:30:00.000Z',
  },
  {
    id: 'entry-3',
    bmi: 25.2,
    height: 178,
    weight: 79.8,
    category: 'Overweight',
    date: 'May 28, 07:45 AM',
    rawDate: '2026-05-28T07:45:00.000Z',
  },
  {
    id: 'entry-4',
    bmi: 26.1,
    height: 178,
    weight: 82.7,
    category: 'Overweight',
    date: 'May 15, 08:00 AM',
    rawDate: '2026-05-15T08:00:00.000Z',
  }
];

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<BmiHistoryEntry[]>([]);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('login');
  const [lang, setLang] = useState<AppLanguage>('en');

  // Input calculator values state transitions
  const [calcHeight, setCalcHeight] = useState<number>(175);
  const [calcWeight, setCalcWeight] = useState<number>(70);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [historyDiff, setHistoryDiff] = useState<string>('');

  // Initial load
  useEffect(() => {
    // 1. Profile load
    const savedProfile = localStorage.getItem('bmi_user_profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        // If profile exists, check screen preference
        setCurrentScreen('home');
      } catch (e) {
        console.error('Failed to load profile', e);
      }
    }

    // 2. Language load
    const savedLang = localStorage.getItem('bmi_app_lang');
    if (savedLang === 'id' || savedLang === 'en') {
      setLang(savedLang);
    }

    // 3. History load
    const savedHistory = localStorage.getItem('bmi_history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
      } catch (e) {
        console.error('Failed to load history', e);
        setHistory([]);
        localStorage.setItem('bmi_history', JSON.stringify([]));
      }
    } else {
      // Empty history initially as requested
      setHistory([]);
      localStorage.setItem('bmi_history', JSON.stringify([]));
    }
  }, []);

  // Update profile
  const handleLogin = (userProfile: UserProfile) => {
    setProfile(userProfile);
    localStorage.setItem('bmi_user_profile', JSON.stringify(userProfile));
    // Propose English or Indonesian language choice screen
    setCurrentScreen('lang-select');
  };

  // Change Preferred languages
  const handleLanguageChange = (newLang: AppLanguage) => {
    setLang(newLang);
    localStorage.setItem('bmi_app_lang', newLang);
  };

  // Finish initial Setup -> dashboard
  const handleLanguageContinue = () => {
    setCurrentScreen('home');
  };

  // Log Out profile
  const handleLogout = () => {
    setProfile(null);
    localStorage.removeItem('bmi_user_profile');
    // We clear calculation values
    setHeightAndRangeDefault();
    setCurrentScreen('login');
  };

  const setHeightAndRangeDefault = () => {
    setCalcHeight(175);
    setCalcWeight(70);
    setIsSaved(false);
    setHistoryDiff('');
  };

  // Biometric calculation trigger
  const handleCalculateBmi = (ht: number, wt: number) => {
    setCalcHeight(ht);
    setCalcWeight(wt);
    setIsSaved(false);

    // Calculate comparative difference compared to the most recent entry
    if (history.length > 0) {
      const lastWeight = history[0].weight;
      const deviation = wt - lastWeight;
      const symbol = deviation > 0 ? '+' : '';
      setHistoryDiff(`${symbol}${deviation.toFixed(1)} kg`);
    } else {
      setHistoryDiff('');
    }

    // Shift screen to result view
    setCurrentScreen('results');
  };

  // Save calculated result index to durable local history state
  const handleSaveResult = () => {
    const bmiValue = calculateBmi(calcWeight, calcHeight);
    const catDetails = getBmiCategory(bmiValue, lang);

    // Construct beautiful human timestamp
    const now = new Date();
    const formattedDate = now.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const newEntry: BmiHistoryEntry = {
      id: `entry-${Date.now()}`,
      bmi: bmiValue,
      height: calcHeight,
      weight: calcWeight,
      category: catDetails.label as any,
      date: formattedDate,
      rawDate: now.toISOString(),
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('bmi_history', JSON.stringify(updatedHistory));
    setIsSaved(true);
  };

  // Delete historic item entry
  const handleDeleteEntry = (entryId: string) => {
    const updated = history.filter((el) => el.id !== entryId);
    setHistory(updated);
    localStorage.setItem('bmi_history', JSON.stringify(updated));
  };

  // Clear all logs
  const handleClearAllHistory = () => {
    setHistory([]);
    localStorage.setItem('bmi_history', JSON.stringify([]));
  };

  // Render Screens wrapper
  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen lang={lang} onLogin={handleLogin} />;
      
      case 'lang-select':
        return (
          <LanguageScreen
            currentLang={lang}
            onChangeLang={handleLanguageChange}
            onContinue={handleLanguageContinue}
            onBackToLogin={() => setCurrentScreen('login')}
          />
        );
      
      case 'home':
        return (
          <HomeScreen
            profile={profile || { name: 'Mazaya', email: 'user@example.com' }}
            history={history}
            lang={lang}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        );

      case 'calculator':
        return (
          <CalculatorScreen
            lang={lang}
            onCalculate={handleCalculateBmi}
            onBack={() => setCurrentScreen('home')}
          />
        );

      case 'results':
        return (
          <ResultsScreen
            lang={lang}
            height={calcHeight}
            weight={calcWeight}
            onSave={handleSaveResult}
            onBack={() => setCurrentScreen('calculator')}
            isSaved={isSaved}
            historyDiffStr={historyDiff}
          />
        );

      case 'history':
        return (
          <HistoryScreen
            lang={lang}
            history={history}
            onDeleteEntry={handleDeleteEntry}
            onClearAll={handleClearAllHistory}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            lang={lang}
            profile={profile || { name: 'Alex Johnson', email: 'johnson@example.com' }}
            onChangeLangClick={() => setCurrentScreen('lang-select')}
            onLogout={handleLogout}
            onBack={() => setCurrentScreen('home')}
          />
        );

      default:
        return <HomeScreen profile={profile || { name: 'Mazaya', email: 'user@example.com' }} history={history} lang={lang} onNavigate={(screen) => setCurrentScreen(screen)} />;
    }
  };

  return (
    <div className="font-sans antialiased text-on-surface bg-background min-h-screen select-none">
      
      {/* Screen Container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </div>

      {/* Navigation tabs overlay - only shown for logged in users on main dashboard tabs */}
      {profile && currentScreen !== 'login' && currentScreen !== 'lang-select' && (
        <BottomNavBar
          currentScreen={currentScreen}
          onNavigate={(screen) => {
            // Reset calculator default targets on back click
            if (screen === 'calculator') {
              setIsSaved(false);
            }
            setCurrentScreen(screen);
          }}
          lang={lang}
        />
      )}

    </div>
  );
}
