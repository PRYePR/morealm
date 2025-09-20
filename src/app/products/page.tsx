"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  basePrice: number;
  images: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProductsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation currentPage="products" />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-xl">{t('loading') || 'Loading...'}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation currentPage="products" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('vrPrescriptionLenses')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('customLensesForVR')}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold text-blue-600">
                    €{product.basePrice.toFixed(2)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {product.description || "Custom prescription lenses for VR headsets"}
                  </p>
                  <div className="flex space-x-2">
                    <Button asChild className="flex-1">
                      <Link href={`/products/${product.id}`}>
                        {t('configure')}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/products/${product.id}`}>
                        {t('details')}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('noProducts')}</h3>
              <p className="text-gray-600 mb-6">
                {t('noProductsDesc')}
              </p>
              <Button asChild>
                <Link href="/admin">{t('addNewProduct')} (Admin)</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Product Categories */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Single Vision Lenses</CardTitle>
              <CardDescription>For near or distance vision correction</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• SPH range: -10.00 to +6.00</li>
                <li>• High-quality optical materials</li>
                <li>• Anti-reflective coating included</li>
                <li>• Compatible with most VR headsets</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Astigmatism Correction</CardTitle>
              <CardDescription>For complex vision correction needs</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• CYL range: -4.00 to +2.00</li>
                <li>• Precise AXIS alignment</li>
                <li>• Custom pupillary distance (PD)</li>
                <li>• Professional optical quality</li>
              </ul>
            </CardContent>
          </Card>
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