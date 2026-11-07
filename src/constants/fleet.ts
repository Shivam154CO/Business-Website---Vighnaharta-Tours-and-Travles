
export interface Vehicle {
  id: string;
  name: string;
  type: "sedan" | "suv" | "luxury" | "tempo";
  seats: number;
  luggage: number;
  ac: boolean;
  ratePerKm: number;
  minKm: number;
  features: string[];
  extraFeatures: string[];
  badge: string;
  badgeColor: string;
  image: string;
  packageRate?: number;
}

export const FLEET: Vehicle[] = [
  {
    id: "swift-dzire",
    name: "Swift Dzire",
    type: "sedan",
    seats: 4,
    luggage: 2,
    ac: true,
    ratePerKm: 12,
    minKm: 300,
    features: ["AC", "Music System", "GPS Tracked", "Clean Interior"],
    extraFeatures: [
      "Fuel Efficient",
      "Smooth Ride",
      "Budget Friendly",
      "Experienced Driver",
    ],
    badge: "Economy",
    badgeColor: "#10B981",
    image: "/Swift_Dzire.png",
  },
  {
    id: "toyota-etios",
    name: "Toyota Etios",
    type: "sedan",
    seats: 4,
    luggage: 2,
    ac: true,
    ratePerKm: 13,
    minKm: 300,
    features: ["AC", "Music System", "GPS Tracked", "Comfortable Seating"],
    extraFeatures: [
      "Spacious Boot",
      "Reliable Engine",
      "Quiet Cabin",
      "Perfect for Couples",
    ],
    badge: "Economy",
    badgeColor: "#10B981",
    image: "/Toyota_Etios.png",

  },
  {
    id: "suzuki-ertiga",
    name: "Suzuki Ertiga",
    type: "suv",
    seats: 6,
    luggage: 3,
    ac: true,
    ratePerKm: 15,
    minKm: 300,
    features: ["AC", "Captain Seats", "Large Boot Space", "GPS Tracked"],
    extraFeatures: [
      "Hybrid Tech",
      "Family Favorite",
      "Flexi Seating",
      "Great Visibility",
    ],
    badge: "Popular",
    badgeColor: "#3B72FF",
    image: "/Suzuki.png",

  },
  {
    id: "toyota-innova",
    name: "Toyota Innova",
    type: "suv",
    seats: 7,
    luggage: 4,
    ac: true,
    ratePerKm: 20,
    minKm: 300,
    features: [
      "AC",
      "Captain Seats",
      "High Roof",
      "GPS Tracked",
      "USB Charging",
    ],
    extraFeatures: [
      "Bulletproof Reliability",
      "Ultimate Comfort",
      "Powerful AC",
      "Long Distance King",
    ],
    badge: "Best Seller",
    badgeColor: "#F59E0B",
    image: "/Innova.png",

  },
  {
    id: "innova-crysta",
    name: "Innova Crysta",
    type: "luxury",
    seats: 7,
    luggage: 4,
    ac: true,
    ratePerKm: 22,
    minKm: 300,
    features: [
      "AC",
      "Leather Seats",
      "Premium Audio",
      "GPS",
      "USB Charging",
      "Curtains",
    ],
    extraFeatures: [
      "VIP Experience",
      "Lounge Seating",
      "Ambient Lighting",
      "Superior Safety",
    ],
    badge: "Premium",
    badgeColor: "#FF6B2B",
    image: "/Crysta.png",

  },
  {
    id: "kia-carens",
    name: "Kia Carens",
    type: "luxury",
    seats: 6,
    luggage: 3,
    ac: true,
    ratePerKm: 20,
    minKm: 300,
    features: [
      "AC",
      "Panoramic Sunroof",
      "Ventilated Seats",
      "ADAS Safety",
      "GPS",
    ],
    extraFeatures: [
      "Modern Tech",
      "Luxury Interior",
      "Smart Storage",
      "Next-Gen Comfort",
    ],
    badge: "New",
    badgeColor: "#818CF8",
    image: "/kia.png",
  },
  {
    id: "tempo-13",
    name: "Tempo 13 Seater",
    type: "tempo",
    seats: 13,
    luggage: 6,
    ac: false,
    packageRate: 19000,
    ratePerKm: 0,
    minKm: 0,
    features: ["Non-AC", "Large Group", "Luggage Carrier", "GPS Tracked"],
    extraFeatures: [
      "Group Travel",
      "Cost Effective",
      "High Capacity",
      "Ample Luggage",
    ],
    badge: "Group",
    badgeColor: "#6366F1",
    image: "/Traveller_13_Seater.png",

  },
  {
    id: "tempo-17",
    name: "Tempo 17 Seater",
    type: "tempo",
    seats: 17,
    luggage: 8,
    ac: true,
    packageRate: 23000,
    ratePerKm: 0,
    minKm: 0,
    features: [
      "AC",
      "Large Group",
      "Luggage Carrier",
      "GPS Tracked",
      "Music System",
    ],
    extraFeatures: [
      "Maximum Capacity",
      "Fully Air Conditioned",
      "Entertainment System",
      "Best for Events",
    ],
    badge: "Group",
    badgeColor: "#6366F1",
    image: "/Traveller_17-Seater.png",

  },
];

export const FLEET_TYPES = [
  { key: "all", label: "All Vehicles" },
  { key: "sedan", label: "Sedan" },
  { key: "suv", label: "SUV" },
  { key: "luxury", label: "Luxury" },
  { key: "tempo", label: "Tempo" },
] as const;
