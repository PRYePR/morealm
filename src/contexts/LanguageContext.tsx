"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations, getTranslation } from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && ['en', 'de', 'de-at', 'fr', 'es'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Detect browser language with country
      const fullLang = navigator.language.toLowerCase();
      const browserLang = fullLang.split('-')[0];

      // Specific country detection
      if (fullLang === 'de-at' || fullLang.includes('austria')) {
        setLocaleState('de-at');
      } else if (fullLang === 'de-de' || browserLang === 'de') {
        setLocaleState('de');
      } else if (['en', 'fr', 'es'].includes(browserLang)) {
        setLocaleState(browserLang as Locale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: keyof typeof translations.en) => {
    return getTranslation(locale, key);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}