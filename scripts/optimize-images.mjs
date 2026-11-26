// Converts the raw portfolio material (../Figma, ../Portals, ../Websites) into web-ready WebP
// files under public/projects/<slug>/ and writes src/data/media.generated.json.
// Run: npm run images   (re-run whenever source material changes)
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

sharp.cache(false);
const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.resolve(ROOT, "..");
const OUT = path.join(ROOT, "public", "projects");
const MANIFEST = path.join(ROOT, "src", "data", "media.generated.json");
const MAX_SCREENS = 24;
const BG = "#1E191D";

// page: one full-page website screenshot. screens: folder(s) of app/portal screens. pick: cover screens.
const PROJECTS = {
  khudii: { screens: ["Figma/Khudii-NGO"], pick: ["Home", "Donation cause", "NGO's"] },
  "climate-iq": { screens: ["Figma/Climate_IQ_app"], pick: ["home-screen", "Devices", "control"] },
  "b-rap-portal": { page: "Websites/BRAP.png" },
  "b-rap-app": {
    screens: ["Figma/BRAP-App"],
    pick: ["Resource Management - Jazz Business", "Allocate Resources - Jazz Business", "Choose Your Plan - Jazz Business High-Fidelity"],
  },
  ucas: { page: "Websites/Ucass.png" },
  "orinas-portal": { page: "Websites/Orinas-portal.png", screens: ["Portals/Orinas-portal"] },
  "orinas-wireframe": { page: "Portals/Orinas-Wireframe/Home.png", screens: ["Portals/Orinas-Wireframe"] },
  polarcream: { page: "Websites/Wordpress/Polar-Cream.png" },
  "green-origin": { page: "Websites/Wordpress/greenorigin.png" },
  tanzeem: { page: "Websites/Wordpress/Tanzeem-e-Islami.png" },
  stockkonnect: { page: "Websites/Wordpress/stockkonnect.png" },
  "stockkonnect-portal": { page: "Portals/Stockkonnect-portal-figma/StockKonnect - Manage Inventory.png", screens: ["Portals/Stockkonnect-portal-figma"] },
  medikva: { page: "Websites/MedikVA.png" },
  "merc-1122": { page: "Websites/MERC-1122.png" },
  soil: { page: "Websites/Soil.png" },
  "izmir-portal": { page: "Websites/izmir.png" },
  "izmir-app": { screens: ["Figma/Izmir"], pick: ["Home Dashboard", "Complaints - Updated Branding", "Matrimonial - Profile Marketplace"] },
  "cutting-edge": { page: "Websites/Wordpress/Cutting-Edge-Projects-Ltd.png" },
  "kaba-travels": { page: "Websites/Wordpress/Kaba-Travels.png" },
  "mnd-homes": { page: "Websites/Wordpress/MND-Homes.png" },
  "job-board": { page: "Figma/Job-board/Home.jpg" },
  "dha-consumer": { screens: ["Figma/DHA-Consumer-App"], pick: ["Main-home", "07-Emergencies", "Utility-bills-01"] },
  "custom-tracking": { screens: ["Figma/Custom-tracking"], pick: ["02-Trip-info", "04-Start trip", "07-Trip-Review"] },
  mezochat: { screens: ["Figma/Mezochat"], pick: ["Home", "Message", "Video Call"] },
  naemun: { screens: ["Figma/Naemun"], pick: ["shop", "Rectangle 23890-1", "shop-gallery"] },
  omnichat: { screens: ["Figma/Omnichat"], pick: ["Dashboard", "Chat-list", "Tickets-list"] },
  recording: { screens: ["Figma/Recording"], pick: ["Recordings", "New Recording", "Recording Details"] },
  "ruba-digital": { screens: ["Figma/Ruba Digital Wireframe"], pick: ["Home", "Sale-stepper-1", "Customer-list"] },
  "sand-app": { screens: ["Figma/Sand App"], pick: ["02-onboarding-2-ai-analysis", "06-home-dashboard", "07-infection-detail-hcv"] },
  "sand-portal": { page: "Portals/SAND portal/01-dashboard.png", screens: ["Portals/SAND portal"] },
  "sand-website": { page: "Websites/Wordpress/Sand Website/01-home.png", screens: ["Websites/Wordpress/Sand Website"] },
};

const isImg = (f) => /\.(png|jpe?g)$/i.test(f);
const base = (f) => path.basename(f).replace(/\.[^.]+$/, "");
const pretty = (f) => base(f).replace(/^Html → Body$/, "Overview").replace(/^\d+-/, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/^./, (c) => c.toUpperCase());

async function write(pipeline, file) {
  const info = await pipeline.webp({ quality: 80, effort: 5 }).toFile(file);
  return { w: info.width, h: info.height };
}

const rounded = (w, h, r) =>
  Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}"/></svg>`);

// Three phone screens on a dark stage, the middle one raised.
async function lineup(files, outFile) {
  const W = 1600, H = 1000, sh = 820;
  const layers = [];
  const n = files.length;
  for (let i = 0; i < n; i++) {
    const img = sharp(files[i]).resize({ height: sh, width: 380, fit: "cover", position: "top" });
    const buf = await img.png().toBuffer();
    const meta = await sharp(buf).metadata();
    const masked = await sharp(buf)
      .composite([{ input: rounded(meta.width, meta.height, 34), blend: "dest-in" }])
      .png()
      .toBuffer();
    const gap = 60;
    const total = n * meta.width + (n - 1) * gap;
    const left = Math.round((W - total) / 2 + i * (meta.width + gap));
    const top = Math.round((H - sh) / 2 + (n === 3 && i !== 1 ? 50 : -10));
    layers.push({ input: masked, left, top });
  }
  return write(sharp({ create: { width: W, height: H, channels: 3, background: BG } }).composite(layers), outFile);
}

// About-section portrait: 4:5 crop centred on the subject.
async function portrait() {
  const src = path.join(SRC, "WhatsApp Image 2026-11-26 at 3.15.44 PM.jpeg");
  const dir = path.join(ROOT, "public", "about");
  await fs.mkdir(dir, { recursive: true });
  const meta = await sharp(src).metadata();
  const width = Math.round(meta.height * 0.8);
  const left = Math.min(meta.width - width, Math.max(0, Math.round(meta.width * 0.57 - width / 2)));
  const info = await sharp(src).extract({ left, top: 0, width, height: meta.height }).webp({ quality: 86 }).toFile(path.join(dir, "portrait.webp"));
  console.log(`portrait: ${info.width}x${info.height}`);
}

async function main() {
  await portrait();
  await fs.mkdir(OUT, { recursive: true });
  const manifest = {};
  for (const [slug, cfg] of Object.entries(PROJECTS)) {
    const dir = path.join(OUT, slug);
    await fs.rm(dir, { recursive: true, force: true });
    await fs.mkdir(dir, { recursive: true });
    const entry = { screens: [] };
    const url = (f) => `/projects/${slug}/${f}`;

    if (cfg.page) {
      const src = path.join(SRC, cfg.page);
      const meta = await sharp(src, { limitInputPixels: false }).metadata();
      const cropH = Math.min(meta.height, Math.round(meta.width * 0.625));
      const c = await write(sharp(src, { limitInputPixels: false }).extract({ left: 0, top: 0, width: meta.width, height: cropH }).resize({ width: 1600 }), path.join(dir, "cover.webp"));
      entry.cover = { src: url("cover.webp"), ...c };
      // webp caps dimensions at 16383px
      const fullW = Math.min(1280, Math.floor((16000 / meta.height) * meta.width));
      const f = await write(sharp(src, { limitInputPixels: false }).resize({ width: fullW }), path.join(dir, "full.webp"));
      entry.full = { src: url("full.webp"), ...f };
    }

    let files = [];
    for (const folder of cfg.screens ?? []) {
      const abs = path.join(SRC, folder);
      files.push(...(await fs.readdir(abs)).filter(isImg).sort().map((f) => path.join(abs, f)));
    }
    const picks = (cfg.pick ?? []).map((p) => files.find((f) => base(f) === p)).filter(Boolean);
    if (picks.length !== (cfg.pick ?? []).length) throw new Error(`${slug}: cover pick not found`);
    // Evenly sample long sets, always keeping the picked cover screens.
    if (files.length > MAX_SCREENS) {
      const step = files.length / MAX_SCREENS;
      const sampled = new Set(Array.from({ length: MAX_SCREENS }, (_, i) => files[Math.floor(i * step)]));
      picks.forEach((p) => sampled.add(p));
      files = files.filter((f) => sampled.has(f));
    }

    for (const [i, f] of files.entries()) {
      const meta = await sharp(f).metadata();
      const width = meta.width > 1000 ? 1440 : 600;
      const name = `s-${String(i + 1).padStart(2, "0")}.webp`;
      const d = await write(sharp(f, { limitInputPixels: false }).resize({ width: Math.min(width, meta.width), height: 16000, fit: "inside" }), path.join(dir, name));
      entry.screens.push({ src: url(name), ...d, label: pretty(f), mobile: meta.width <= 1000 });
    }

    if (!entry.cover && picks.length) {
      const c = await lineup(picks, path.join(dir, "cover.webp"));
      entry.cover = { src: url("cover.webp"), ...c };
    }
    // Small texture for the WebGL hero and archive thumbs.
    const sm = await write(sharp(path.join(dir, "cover.webp")).resize({ width: 800 }), path.join(dir, "cover-sm.webp"));
    entry.thumb = { src: url("cover-sm.webp"), ...sm };

    manifest[slug] = entry;
    console.log(`${slug}: ${entry.screens.length} screens${entry.full ? " + full page" : ""}`);
  }
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`manifest -> ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
