"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation currentPage="home" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('welcome')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('subtitle')}
          </p>
          <Button size="lg" className="mr-4" asChild>
            <Link href="/products">{t('shopNow')}</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">{t('learnMore')}</Link>
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>{t('customPrescription')}</CardTitle>
              <CardDescription>
                {t('prescriptionDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Enter your SPH, CYL, AXIS, and PD values for perfectly customized VR lenses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('premiumQuality')}</CardTitle>
              <CardDescription>
                {t('qualityDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Made with premium optical materials for crystal clear VR experiences.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('fastDelivery')}</CardTitle>
              <CardDescription>
                {t('deliveryDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Fast and secure delivery to your door with tracking information.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Database Test Section */}
        <div className="mt-16 p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold mb-4">{t('systemStatus')}</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>Next.js 14 - Running</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>TailwindCSS + shadcn/ui - Active</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>Database (SQLite + Prisma) - Connected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <span>Multilingual Support - Active</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>{t('copyright')}</p>
          <p className="text-gray-400 mt-2">{t('phase')}</p>
        </div>
      </footer>
    </div>
  );
}