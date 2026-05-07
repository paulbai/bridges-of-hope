import { client } from "@/sanity/client";
import { programsQuery, type ProgramDoc } from "@/sanity/queries";
import HomeClient, { type ProgramInput } from "./HomeClient";

// Re-fetch from Sanity at most every 60 seconds in production.
export const revalidate = 60;

function toProgramInput(p: ProgramDoc, idx: number): ProgramInput {
  // First / featured card spans 2x2 in the bento grid; others span 2 cols.
  const className = p.featured || idx === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-2";

  return {
    title: p.title,
    description: p.description,
    longDescription: p.longDescription,
    raised: p.raised ?? "$0",
    goal: p.goal ?? "$10k",
    percent: p.percent ?? 0,
    imgSrc: p.coverImage,
    imgAlt: p.coverImageAlt ?? p.title,
    location: p.location ?? "",
    startDate: p.startDate ?? "",
    beneficiaries: p.beneficiaries ?? "",
    milestones: p.milestones ?? [],
    impact: p.impact ?? [],
    flotMerchant: p.flotMerchant ?? p.title,
    className,
    featured: Boolean(p.featured) || idx === 0,
  };
}

export default async function Page() {
  const docs = await client.fetch<ProgramDoc[]>(programsQuery);
  const programs = docs.map(toProgramInput);
  return <HomeClient programs={programs} />;
}
