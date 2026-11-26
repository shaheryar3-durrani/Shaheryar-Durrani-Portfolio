import type { MetadataRoute } from "next";
import { siteUrl as base } from "@/lib/site";
import { projects } from "@/data/projects";


export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: base, priority: 1 }, ...projects.map((p) => ({ url: `${base}/projects/${p.slug}`, priority: p.featured ? 0.8 : 0.5 }))];
}
