import { groq } from "next-sanity";

export const programsQuery = groq`
  *[_type == "program"] | order(coalesce(order, 9999) asc, _createdAt asc) {
    _id,
    title,
    featured,
    description,
    longDescription,
    "coverImage": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    raised,
    goal,
    percent,
    location,
    startDate,
    beneficiaries,
    milestones,
    impact,
    flotMerchant
  }
`;

export type ProgramDoc = {
  _id: string;
  title: string;
  featured?: boolean;
  description: string;
  longDescription: string;
  coverImage: string;
  coverImageAlt?: string;
  raised: string;
  goal: string;
  percent: number;
  location?: string;
  startDate?: string;
  beneficiaries?: string;
  milestones?: string[];
  impact?: string[];
  flotMerchant?: string;
};
