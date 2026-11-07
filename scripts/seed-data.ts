import { prisma } from "../src/lib/db";

const defaultVehicles = [
  {
    slug: "swift-dzire",
    name: "Swift Dzire",
    type: "sedan",
    seats: 4,
    luggage: 2,
    ac: true,
    ratePerKm: 12,
    minKm: 300,
    badge: "Economy",
    badgeColor: "#10B981",
    image: "/Swift_Dzire.png",
    features: "AC,Music System,GPS Tracked,Clean Interior",
    extraFeatures: "Fuel Efficient,Smooth Ride,Budget Friendly,Experienced Driver",
    packageRate: null,
    available: true,
  },
  {
    slug: "toyota-innova",
    name: "Toyota Innova",
    type: "suv",
    seats: 7,
    luggage: 4,
    ac: true,
    ratePerKm: 20,
    minKm: 300,
    badge: "Best Seller",
    badgeColor: "#F59E0B",
    image: "/Innova.png",
    features: "AC,Captain Seats,High Roof,GPS Tracked,USB Charging",
    extraFeatures: "Bulletproof Reliability,Ultimate Comfort,Powerful AC,Long Distance King",
    packageRate: null,
    available: true,
  },
  {
    slug: "innova-crysta",
    name: "Innova Crysta",
    type: "luxury",
    seats: 7,
    luggage: 4,
    ac: true,
    ratePerKm: 22,
    minKm: 300,
    badge: "Premium",
    badgeColor: "#FF6B2B",
    image: "/Crysta.png",
    features: "AC,Leather Seats,Premium Audio,GPS,USB Charging,Curtains",
    extraFeatures: "VIP Experience,Lounge Seating,Ambient Lighting,Superior Safety",
    packageRate: null,
    available: true,
  },
  {
    slug: "tempo-17",
    name: "Tempo 17 Seater",
    type: "tempo",
    seats: 17,
    luggage: 8,
    ac: true,
    ratePerKm: 0,
    minKm: 0,
    badge: "Group",
    badgeColor: "#6366F1",
    image: "/Traveller_17-Seater.png",
    features: "AC,Large Group,Luggage Carrier,GPS Tracked,Music System",
    extraFeatures: "Maximum Capacity,Fully Air Conditioned,Entertainment System,Best for Events",
    packageRate: 23000,
    available: true,
  },
];

const defaultRoutes = [
  {
    slug: "shirdi",
    name: "Shirdi",
    distance: "185 km",
    duration: "3 hrs 30 min",
    startingFrom: "₹2,499",
    image: "https://images.unsplash.com/...",
    description: "Devotional trip from Pune to Shirdi.",
    popular: true,
  },
  {
    slug: "mahabaleshwar",
    name: "Mahabaleshwar",
    distance: "120 km",
    duration: "3 hrs",
    startingFrom: "₹1,899",
    image: "https://images.unsplash.com/...",
    description: "Hill station getaway from Pune.",
    popular: true,
  },
  {
    slug: "lonavala",
    name: "Lonavala",
    distance: "65 km",
    duration: "1 hr 45 min",
    startingFrom: "₹1,299",
    image: "https://images.unsplash.com/...",
    description: "Weekend escape to the Western Ghats.",
    popular: true,
  },
];

const defaultPackages = [
  {
    slug: "pune-shirdi",
    title: "Pune to Shirdi Package",
    description: "Comfortable pilgrimage travel with transparent pricing.",
    columns: JSON.stringify(["Type of Car", "Capacity", "One Way", "1 Day Package", "2 Day Package", "Driver Allowance", "Book"]),
    rows: JSON.stringify([
      ["Hatchback", "4 + 1", "₹3,500", "₹5,500", "₹6,500", "₹300", "Book Now"],
      ["Dzire", "4 + 1", "₹4,500", "₹5,800", "₹7,500", "₹300", "Book Now"],
      ["Ertiga", "6 + 1", "₹5,000", "₹7,000", "₹9,500", "₹300", "Book Now"],
      ["Innova", "6 + 1", "₹6,000", "₹7,500", "₹10,800", "₹300", "Book Now"],
    ]),
    note: "Toll and parking extra.",
    active: true,
  },
  {
    slug: "pune-lonavala",
    title: "Pune to Lonavala Package",
    description: "Quick getaway package for couples and families.",
    columns: JSON.stringify(["Type of Car", "Capacity", "1 Day Package", "2 Day Package", "Driver Allowance", "Book"]),
    rows: JSON.stringify([
      ["Hatchback", "4 + 1", "₹3,500", "₹6,500", "₹300", "Book Now"],
      ["Sedan", "4 + 1", "₹3,900", "₹7,500", "₹300", "Book Now"],
      ["Ertiga", "6 + 1", "₹4,500", "₹9,000", "₹300", "Book Now"],
    ]),
    note: "Full day trip package.",
    active: true,
  },
];

async function seed() {
  await Promise.all(
    defaultVehicles.map((vehicle) =>
      prisma.vehicle.upsert({
        where: { slug: vehicle.slug },
        update: vehicle,
        create: vehicle,
      }),
    ),
  );

  await Promise.all(
    defaultRoutes.map((route) =>
      prisma.route.upsert({
        where: { slug: route.slug },
        update: route,
        create: route,
      }),
    ),
  );

  await Promise.all(
    defaultPackages.map((pkg) =>
      prisma.package.upsert({
        where: { slug: pkg.slug },
        update: pkg,
        create: pkg,
      }),
    ),
  );

  console.log("Seed data synced.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
