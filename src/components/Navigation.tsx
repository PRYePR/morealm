"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

interface NavigationProps {
  currentPage?: 'home' | 'products' | 'admin';
}

export function Navigation({ currentPage = 'home' }: NavigationProps) {
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-blue-600">
              {t('brand')}
            </Link>
            <p className="text-gray-600">{t('tagline')}</p>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4">
              <Link
                href="/"
                className={currentPage === 'home' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}
              >
                {t('home')}
              </Link>
              <Link
                href="/products"
                className={currentPage === 'products' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}
              >
                {t('products')}
              </Link>
              <Link
                href="/admin"
                className={currentPage === 'admin' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}
              >
                {t('admin')}
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}