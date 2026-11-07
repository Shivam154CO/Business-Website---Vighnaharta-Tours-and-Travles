import { MetadataRoute } from "next";
import { SITE } from "@/constants/site";
import { FLEET } from "@/constants/fleet";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const routes = ["/", "/about", "/services", "/fleet", "/packages", "/corporate", "/faqs", "/contact", "/book"];
  const vehicleRoutes = FLEET.map((v) => `/fleet/${v.id}`);
  return [...routes, ...vehicleRoutes].map((r) => ({ url: `${base}${r}`, lastModified: new Date() }));
}
