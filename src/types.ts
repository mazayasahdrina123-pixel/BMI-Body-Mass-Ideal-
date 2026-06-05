/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppScreen = 'login' | 'lang-select' | 'home' | 'calculator' | 'results' | 'history' | 'settings';

export type AppLanguage = 'id' | 'en';

export interface UserProfile {
  name: string;
  email: string;
}

export interface BmiHistoryEntry {
  id: string;
  bmi: number;
  height: number;
  weight: number;
  category: 'Underweight' | 'Normal Weight' | 'Overweight' | 'Obese' | 'Sangat Kurus' | 'Normal' | 'Gemuk' | 'Obesitas';
  date: string;
  rawDate: string; // ISO String
}

export interface BmiSuggestion {
  title: string;
  description: string;
}
