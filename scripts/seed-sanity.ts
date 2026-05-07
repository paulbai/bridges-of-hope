/**
 * One-shot seed: uploads the three founding programs to Sanity.
 * Run with:  npx tsx scripts/seed-sanity.ts
 *
 * Reads SANITY_API_WRITE_TOKEN from .env.local. Token must have Editor or
 * higher permission. Idempotent — re-running replaces docs by their _id.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.SANITY_API_WRITE_TOKEN!;

if (!token || token === "PASTE_YOUR_TOKEN_HERE") {
  console.error(
    "❌ SANITY_API_WRITE_TOKEN missing in .env.local. Paste your token first."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type SeedProgram = {
  _id: string;
  title: string;
  order: number;
  featured: boolean;
  description: string;
  longDescription: string;
  imagePath: string;
  imageAlt: string;
  raised: string;
  goal: string;
  percent: number;
  location: string;
  startDate: string;
  beneficiaries: string;
  milestones: string[];
  impact: string[];
  flotMerchant: string;
};

const programs: SeedProgram[] = [
  {
    _id: "program-tacugama",
    title: "Tacugama Chimpanzee Sanctuary",
    order: 1,
    featured: true,
    description:
      "Rescuing orphaned and injured chimpanzees and rehabilitating them for eventual release into protected forests.",
    longDescription:
      "Founded in 1995 by Bala Amarasekaran, Tacugama Chimpanzee Sanctuary is the only chimpanzee rescue and rehabilitation centre in Sierra Leone. Located inside the Western Area Peninsula National Park just outside Freetown, the sanctuary cares for over 100 chimpanzees rescued from the illegal pet and bushmeat trades. Each chimpanzee goes through a carefully managed rehabilitation process — from quarantine and veterinary care, through gradual socialization with other chimps, to eventual life in large forested enclosures. Beyond rescue, Tacugama leads national conservation efforts: protecting the park's rainforest, running community outreach programs, training eco-guards, and advocating for the chimpanzee as Sierra Leone's national animal. Your donation funds food, medical care, keeper salaries, and forest protection.",
    imagePath: "public/Tacugama.jpg",
    imageAlt: "Chimpanzee at Tacugama Sanctuary in Sierra Leone",
    raised: "$0",
    goal: "$10k",
    percent: 0,
    location: "Western Area Peninsula National Park, Sierra Leone",
    startDate: "1995",
    beneficiaries: "100+ rescued chimpanzees",
    milestones: [
      "Over 100 chimpanzees rescued and rehabilitated since 1995",
      "Operates the only chimpanzee sanctuary in Sierra Leone",
      "Co-manages the Western Area Peninsula National Park",
      "Chimpanzee declared Sierra Leone's national animal in 2019",
    ],
    impact: [
      "100+ chimpanzees in lifelong care",
      "17,000+ hectares of rainforest protected",
      "30+ local staff employed full-time",
      "Year-round community conservation outreach",
    ],
    flotMerchant: "Tacugama Chimpanzee Sanctuary",
  },
  {
    _id: "program-ballanta",
    title: "Ballanta Academy of Music",
    order: 2,
    featured: false,
    description:
      "Formal music education for Sierra Leonean youth — theory, performance, and cultural heritage.",
    longDescription:
      "Named after the pioneering Sierra Leonean musicologist Nicholas G. J. Ballanta, the Ballanta Academy of Music in Freetown has been shaping the country's musical future since 1996. The academy offers structured training in classical and African music traditions — piano, violin, guitar, voice, drums, music theory, composition, and ensemble performance — to children and young adults, many from low-income backgrounds. Alongside its instructional programs, Ballanta hosts concerts, runs an annual music festival, and preserves Sierra Leone's rich musical heritage through research and publications. Donations support scholarships, instruments, and teacher salaries, opening the doors of music education to students who would otherwise have no access.",
    imagePath: "public/ballanta.jpg",
    imageAlt: "Students at Ballanta Academy of Music learning keyboard",
    raised: "$0",
    goal: "$10k",
    percent: 0,
    location: "Freetown, Sierra Leone",
    startDate: "1996",
    beneficiaries: "Hundreds of student musicians",
    milestones: [
      "Founded in 1996 in honor of Nicholas G. J. Ballanta",
      "Graduated hundreds of musicians into local and international careers",
      "Hosts the annual Ballanta Music Festival",
      "Curriculum blending Western classical and African musical traditions",
    ],
    impact: [
      "Scholarships for underprivileged youth",
      "Instruments provided to students in need",
      "Preservation of Sierra Leonean musical heritage",
      "Pathway to national and international music careers",
    ],
    flotMerchant: "Ballanta Academy of Music",
  },
  {
    _id: "program-goodwill",
    title: "The Goodwill Children Foundation Sierra Leone",
    order: 3,
    featured: false,
    description:
      "Care, education, and healthcare for orphaned and vulnerable children across Sierra Leone.",
    longDescription:
      "The Goodwill Children Foundation Sierra Leone is a grassroots nonprofit dedicated to transforming the lives of orphaned, abandoned, and vulnerable children. The foundation provides safe shelter, nutritious meals, school fees, uniforms, and learning materials, alongside access to basic healthcare and psychosocial support. Its programs go beyond immediate relief — focusing on long-term outcomes like keeping children in school, supporting single-parent households, and equipping young people with skills for adulthood. With a small but committed local team, every dollar goes further on the ground. Your donation helps feed a child, keep them in school, or cover a critical medical bill.",
    imagePath: "public/goodwill.webp",
    imageAlt:
      "The Goodwill Children Foundation Sierra Leone delivering donations",
    raised: "$0",
    goal: "$10k",
    percent: 0,
    location: "Sierra Leone",
    startDate: "Active",
    beneficiaries: "Orphaned & vulnerable children",
    milestones: [
      "Supports orphaned and vulnerable children across Sierra Leone",
      "School fees, uniforms, and learning materials provided",
      "Nutrition, shelter, and healthcare support",
      "Community-based model with local Sierra Leonean leadership",
    ],
    impact: [
      "Children kept in school",
      "Meals and shelter for vulnerable kids",
      "Access to basic healthcare",
      "Psychosocial and community support",
    ],
    flotMerchant: "Goodwill Children Foundation",
  },
];

async function uploadImage(filePath: string, filename: string) {
  const buf = readFileSync(resolve(filePath));
  const asset = await client.assets.upload("image", buf, { filename });
  return asset._id;
}

async function main() {
  console.log(`→ Seeding ${programs.length} programs to ${projectId}/${dataset}`);

  for (const p of programs) {
    console.log(`\n• ${p.title}`);
    console.log(`  uploading image (${p.imagePath})…`);
    const assetId = await uploadImage(p.imagePath, p.imagePath.split("/").pop()!);

    const doc = {
      _id: p._id,
      _type: "program",
      title: p.title,
      order: p.order,
      featured: p.featured,
      description: p.description,
      longDescription: p.longDescription,
      coverImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: p.imageAlt,
      },
      raised: p.raised,
      goal: p.goal,
      percent: p.percent,
      location: p.location,
      startDate: p.startDate,
      beneficiaries: p.beneficiaries,
      milestones: p.milestones,
      impact: p.impact,
      flotMerchant: p.flotMerchant,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ saved as ${p._id}`);
  }

  console.log("\n✅ Seed complete. View at https://www.sanity.io/manage");
}

main().catch((err) => {
  console.error("\n❌ Seed failed:", err);
  process.exit(1);
});
