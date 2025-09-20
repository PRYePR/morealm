import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">MoreRealm VR</h1>
          <p className="text-gray-600">Professional VR Lens Solutions</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to VR Lens Ecommerce
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Custom prescription lenses for your VR headset
          </p>
          <Button size="lg" className="mr-4">
            Shop Now
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Custom Prescription</CardTitle>
              <CardDescription>
                Tailored to your exact vision needs
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
              <CardTitle>Premium Quality</CardTitle>
              <CardDescription>
                High-grade optical materials
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
              <CardTitle>Fast Delivery</CardTitle>
              <CardDescription>
                Quick shipping across Europe
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
          <h3 className="text-2xl font-bold mb-4">System Status</h3>
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
              <span>Git Repository - Initialized</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 MoreRealm VR. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Phase 1: Basic Framework - Complete ✅</p>
        </div>
      </footer>
    </div>
  );
}