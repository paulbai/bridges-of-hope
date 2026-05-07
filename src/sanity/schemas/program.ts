import { defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Featured (large card)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "longDescription",
      title: "Long description (modal)",
      type: "text",
      rows: 8,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "raised",
      title: "Amount raised (display string)",
      description: "E.g. '$0' or '$2,500'.",
      type: "string",
      initialValue: "$0",
    }),
    defineField({
      name: "goal",
      title: "Goal (display string)",
      description: "E.g. '$10k'.",
      type: "string",
      initialValue: "$10k",
    }),
    defineField({
      name: "percent",
      title: "Funding progress (0–100)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 0,
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start date / status",
      description: "Free text — e.g. '1995' or 'Active'.",
      type: "string",
    }),
    defineField({
      name: "beneficiaries",
      title: "Beneficiaries",
      type: "string",
    }),
    defineField({
      name: "milestones",
      title: "Milestones",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "impact",
      title: "Impact bullets",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "flotMerchant",
      title: "Flot merchant ID",
      description: "Used by the donate flow.",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "coverImage",
    },
  },
});
