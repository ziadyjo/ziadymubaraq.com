import type { WorkExperience } from "@/types";

export const WORK_EXPERIENCE = [
  {
    role: "Full-Stack Engineer",
    period: "Sep 2024 - Present",
    company: "Lunash",
    location: "Indonesia",
    description: [
      "Built an AI-powered SaaS platform with agentic workflows scaling to 1,000 concurrent conversations.",
      "Owned the full stack across React and Node.js, backed by AWS infrastructure and queue-based processing.",
    ],
    current: true,
  },
  {
    role: "Full-Stack JavaScript Instructor",
    period: "Jan 2020 - Sep 2024",
    company: "Hacktiv8",
    location: "Indonesia",
    description: [
      "Promoted to Lead Phase Instructor, mentoring a team of 6–8 instructors and 1,000+ students through project-based learning.",
      "Delivered Full-Stack JavaScript and Front-End courses covering React, Node.js, Redux, React Native, GraphQL, TDD, Jest, and MongoDB.",
    ],
  },
] as const satisfies readonly WorkExperience[];
