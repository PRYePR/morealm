import { seedProducts } from "../src/lib/seed";

async function main() {
  console.log("Starting database seed...");

  await seedProducts();

  console.log("Database seed completed!");
  process.exit(0);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});