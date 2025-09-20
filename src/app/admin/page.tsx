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
  active: boolean;
  createdAt: string;
}

export default function AdminPage() {
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

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.active).length,
    inactiveProducts: products.filter(p => !p.active).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation currentPage="admin" />
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
      <Navigation currentPage="admin" />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('productManagement')}</h1>
          <Button asChild>
            <Link href="/admin/products/new">{t('addNewProduct')}</Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('totalProducts')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('activeProducts')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{stats.activeProducts}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('inactiveProducts')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-600">{stats.inactiveProducts}</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Products</CardTitle>
            <CardDescription>Manage your VR lens products</CardDescription>
          </CardHeader>
          <CardContent>
            {products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">{t('name')}</th>
                      <th className="text-left py-3 px-4 font-semibold">{t('price')}</th>
                      <th className="text-left py-3 px-4 font-semibold">{t('status')}</th>
                      <th className="text-left py-3 px-4 font-semibold">{t('created')}</th>
                      <th className="text-left py-3 px-4 font-semibold">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description || "No description"}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-blue-600">
                            €{product.basePrice.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.active ? t('active') : t('inactive')}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/products/${product.id}`}>{t('view')}</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/products/${product.id}/edit`}>{t('edit')}</Link>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl text-gray-300 mb-4">📦</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('noProducts')}</h3>
                <p className="text-gray-600 mb-4">
                  Start by adding your first VR lens product
                </p>
                <Button asChild>
                  <Link href="/admin/products/new">Add First Product</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/products/new">➕ {t('addNewProduct')}</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/orders">📋 View Orders</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/users">👥 Manage Users</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Database:</span>
                  <span className="text-green-600">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span>Environment:</span>
                  <span className="text-blue-600">Development</span>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="text-gray-600">Phase 2</span>
                </div>
                <div className="flex justify-between">
                  <span>Languages:</span>
                  <span className="text-purple-600">4 Supported</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>{t('copyright')}</p>
          <p className="text-gray-400 mt-2">Admin Panel - {t('phase')}</p>
        </div>
      </footer>
    </div>
  );
}