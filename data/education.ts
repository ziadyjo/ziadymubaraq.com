import type { Education } from "@/types";

export const EDUCATION = [
  {
    degree: "Apple Developer Academy",
    period: "2023",
    institution: "Infinite Learning",
    location: "Indonesia",
    description:
      "A ten-month immersive program in app development, design, and entrepreneurship across the Apple ecosystem.",
  },
  {
    degree: "BSc in Computer Science",
    period: "2019",
    institution: "Indonesia University of Education",
    location: "Indonesia",
    description:
      "The Bachelor told me everything about the fundamentals of computer science.",
  },
] as const satisfies readonly Education[];
