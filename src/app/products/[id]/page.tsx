import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product || !product.active) {
    notFound();
  }

  // Parse images from JSON string
  const images = product.images ? JSON.parse(product.images) : [];

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
              <Link href="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex space-x-2 text-gray-600">
            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
            <li>/</li>
            <li><Link href="/products" className="hover:text-gray-900">Products</Link></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <Card>
              <CardContent className="p-6">
                {images.length > 0 ? (
                  <div className="space-y-4">
                    {images.map((image: string, index: number) => (
                      <div key={index} className="bg-gray-100 rounded-lg p-8 text-center">
                        <p className="text-gray-500">Image: {image}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          (Image display will be implemented in next phase)
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-16 text-center">
                    <div className="text-6xl text-gray-300 mb-4">📷</div>
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                From €{product.basePrice.toFixed(2)}
              </p>
              <p className="text-gray-600 text-lg">
                {product.description || "Custom prescription lenses for VR headsets"}
              </p>
            </div>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Product Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Custom prescription fitting</li>
                  <li>✓ High-quality optical materials</li>
                  <li>✓ Anti-reflective coating</li>
                  <li>✓ Scratch-resistant surface</li>
                  <li>✓ Easy installation</li>
                  <li>✓ 30-day quality guarantee</li>
                </ul>
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Prescription Configuration</CardTitle>
                <CardDescription>
                  Enter your prescription details to get accurate pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  To configure your custom lenses, please have your prescription ready with:
                </p>
                <ul className="space-y-1 text-gray-600 mb-6">
                  <li>• SPH (Sphere) values for both eyes</li>
                  <li>• CYL (Cylinder) values (if applicable)</li>
                  <li>• AXIS values (if applicable)</li>
                  <li>• PD (Pupillary Distance)</li>
                </ul>
                <Button size="lg" className="w-full">
                  Configure Your Lenses
                </Button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Configuration tool will be available in Phase 3
                </p>
              </CardContent>
            </Card>

            {/* Compatibility */}
            <Card>
              <CardHeader>
                <CardTitle>VR Headset Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-semibold mb-2">Supported:</p>
                    <ul className="space-y-1">
                      <li>• Meta Quest 2</li>
                      <li>• Meta Quest 3</li>
                      <li>• PICO 4</li>
                      <li>• HTC Vive</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Coming Soon:</p>
                    <ul className="space-y-1">
                      <li>• Apple Vision Pro</li>
                      <li>• PlayStation VR2</li>
                      <li>• Valve Index</li>
                      <li>• More models</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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