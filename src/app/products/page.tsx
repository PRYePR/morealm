import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-blue-600">
                MoreRealm VR
              </Link>
              <p className="text-gray-600">Professional VR Lens Solutions</p>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/products" className="text-blue-600 font-medium">Products</Link>
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VR Prescription Lenses
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Custom lenses for all major VR headsets
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
                        Configure
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/products/${product.id}`}>
                        Details
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">No Products Yet</h3>
              <p className="text-gray-600 mb-6">
                No VR lenses are currently available. Please check back later or contact us.
              </p>
              <Button asChild>
                <Link href="/admin">Add Product (Admin)</Link>
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
          <p>&copy; 2024 MoreRealm VR. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Phase 2: Product System - In Progress</p>
        </div>
      </footer>
    </div>
  );
}