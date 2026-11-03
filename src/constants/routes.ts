export interface Route {
  id: string;
  name: string;
  distance: string;
  duration: string;
  startingFrom: string;
  image: string;
}

export const IMG = (prompt: string, size = "landscape_4_3") =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`;

export const POPULAR_ROUTES: Route[] = [
  {
    id: "shirdi",
    name: "Shirdi",
    distance: "185 km",
    duration: "3 hrs 30 min",
    startingFrom: "₹2,499",
    image: IMG("shirdi sai baba temple town in india with devotees, warm daylight"),
  },
  {
    id: "mahabaleshwar",
    name: "Mahabaleshwar",
    distance: "120 km",
    duration: "3 hrs",
    startingFrom: "₹1,899",
    image: IMG("mahabaleshwar hill station lush green valley with misty mountains"),
  },
  {
    id: "lonavala",
    name: "Lonavala",
    distance: "65 km",
    duration: "1 hr 45 min",
    startingFrom: "₹1,299",
    image: IMG("lonavala waterfall and green hills during monsoon in western ghats india"),
  },
  {
    id: "nashik",
    name: "Nashik",
    distance: "165 km",
    duration: "3 hrs 15 min",
    startingFrom: "₹2,199",
    image: IMG("nashik vineyard rows with grape farms in maharashtra countryside, sunny"),
  },
  {
    id: "goa",
    name: "Goa",
    distance: "430 km",
    duration: "8 hrs",
    startingFrom: "₹5,999",
    image: IMG("goa beach with palm trees and golden sand at sunset"),
  },
  {
    id: "pune-airport",
    name: "Pune Airport",
    distance: "15 km",
    duration: "30 min",
    startingFrom: "₹499",
    image: IMG("airport terminal with an airplane at the gate, blue sky"),
  },
];

export const HERO_BACKGROUND = IMG(
  "luxury car driving on a scenic mountain highway at golden hour, cinematic",
  "landscape_16_9",
);

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Rohan Deshmukh",
    location: "Pune",
    rating: 5,
    text: "Outstanding service! The Innova Crysta was spotless and the driver was very professional. Reached Shirdi on time.",
  },
  {
    id: "t2",
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Booked a Tempo Traveller for our family trip to Lonavala. Comfortable ride and great value. Highly recommend!",
  },
  {
    id: "t3",
    name: "Amit Kulkarni",
    location: "Nashik",
    rating: 5,
    text: "Best cab service in town. On-time pickups, clean vehicles, and friendly drivers. Will book again.",
  },
  {
    id: "t4",
    name: "Sneha Patil",
    location: "Pune",
    rating: 4,
    text: "Smooth airport transfer experience. Driver helped with luggage and took the best route. Great job!",
  },
];

export const SERVICES = [
  {
    id: "outstation",
    title: "Outstation Tours",
    description: "Intercity cabs with experienced drivers and transparent pricing.",
    image: IMG("car driving on a scenic indian highway through green mountains, daylight, travel photography"),
  },
  {
    id: "airport",
    title: "Airport Transfers",
    description: "Pune Airport pickups and drops — on time, every time.",
    image: IMG("modern airport terminal with a taxi cab and passenger luggage, bright daylight"),
  },
  {
    id: "pilgrimage",
    title: "Pilgrimage Cabs",
    description: "Spiritual journeys to Shirdi, Nashik, and more with care.",
    image: IMG("indian hindu temple complex with devotees, warm golden morning light"),
  },
  {
    id: "corporate",
    title: "Corporate Travel",
    description: "Dedicated cabs for employees and office commute needs.",
    image: IMG("professional businessman in a formal suit standing next to a clean white sedan car outside an office building"),
  },
  {
    id: "local",
    title: "Local Rides",
    description: "Hourly or point-to-point travel within the city.",
    image: IMG("yellow and black city taxi cab on an urban indian street, daytime"),
  },
  {
    id: "group",
    title: "Group Travel",
    description: "13 & 17 seater Tempo Travellers for large groups.",
    image: IMG("white tempo traveller minibus van parked on a road, group travel vehicle, daylight"),
  },
];
