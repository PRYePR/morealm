import { prisma } from "./prisma";

export async function seedProducts() {
  try {
    const existingProducts = await prisma.product.count();

    if (existingProducts > 0) {
      console.log("Products already exist, skipping seed");
      return;
    }

    const sampleProducts = [
      {
        name: "VR Prescription Lenses - Meta Quest 2",
        description: "High-quality prescription lenses specifically designed for Meta Quest 2. Features anti-reflective coating and scratch-resistant surface. Easy installation with detailed instructions included.",
        basePrice: 89.99,
        images: JSON.stringify([
          "https://example.com/quest2-lenses-1.jpg",
          "https://example.com/quest2-lenses-2.jpg"
        ]),
        active: true,
      },
      {
        name: "VR Prescription Lenses - Meta Quest 3",
        description: "Latest generation prescription lenses for Meta Quest 3. Enhanced optical clarity with blue light filtering. Perfect fit guaranteed with our precision manufacturing.",
        basePrice: 99.99,
        images: JSON.stringify([
          "https://example.com/quest3-lenses-1.jpg",
          "https://example.com/quest3-lenses-2.jpg"
        ]),
        active: true,
      },
      {
        name: "VR Prescription Lenses - PICO 4",
        description: "Custom prescription lenses for PICO 4 VR headset. Premium optical materials with ultra-thin design. Includes cleaning cloth and storage case.",
        basePrice: 79.99,
        images: JSON.stringify([
          "https://example.com/pico4-lenses-1.jpg"
        ]),
        active: true,
      }
    ];

    for (const product of sampleProducts) {
      await prisma.product.create({
        data: product,
      });
    }

    console.log("Sample products created successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}