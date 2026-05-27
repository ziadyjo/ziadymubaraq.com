"use client";

import { Fragment } from "react";
import { CalendarDays, GraduationCap, MapPin } from "lucide-react";

type Education = {
  degree: string;
  period: string;
  institution: string;
  location: string;
  description: string;
};

const EDUCATION: Education[] = [
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
];

export function EducationSection() {
  return (
    <div className="flex flex-col">
      {EDUCATION.map((item, index) => (
        <Fragment key={item.degree}>
          {index > 0 && (
            <hr className="border-t border-button-secondary-border" />
          )}
          <EducationItem {...item} />
        </Fragment>
      ))}
    </div>
  );
}

function EducationItem({
  degree,
  period,
  institution,
  location,
  description,
}: Education) {
  return (
    <article className="flex flex-col gap-3 py-6 first:pt-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h4 className="text-lg text-foreground-primary">{degree}</h4>
      </div>

      <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 text-md md:text-sm text-foreground-tertiary">
        <dd>{period}</dd>
        <span aria-hidden className="text-foreground-tertiary">&middot;</span>
        <dd>{institution}</dd>
        <span aria-hidden className="text-foreground-tertiary">&middot;</span>
        <dd>{location}</dd>
      </dl>

      <p className="text-md text-foreground-tertiary">{description}</p>
    </article>
  );
}
