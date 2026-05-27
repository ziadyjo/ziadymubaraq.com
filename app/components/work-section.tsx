"use client";

import { Fragment } from "react";

type Work = {
  role: string;
  period: string;
  company: string;
  location: string;
  description: string[];
  current?: boolean;
};

const WORK: Work[] = [
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
];

export function WorkSection() {
  return (
    <div className="flex flex-col">
      {WORK.map((item, index) => (
        <Fragment key={item.role}>
          {index > 0 && (
            <hr className="border-t border-button-secondary-border" />
          )}
          <WorkItem {...item} />
        </Fragment>
      ))}
    </div>
  );
}

function WorkItem({
  role,
  period,
  company,
  location,
  description,
  current,
}: Work) {
  return (
    <article className="flex flex-col gap-3 py-6 first:pt-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h4 className="text-lg text-foreground-primary">{role}</h4>
        {current && (
          <span className="rounded-md bg-[#c96442] px-2 py-0.5 text-sm text-foreground">
            Current
          </span>
        )}
      </div>

      <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 text-md md:text-sm text-foreground-tertiary">
        <dd>{period}</dd>
        <span aria-hidden className="text-foreground-tertiary">&middot;</span>
        <dd>{company}</dd>
        <span aria-hidden className="text-foreground-tertiary">&middot;</span>
        <dd>{location}</dd>
      </dl>

      <div className="flex flex-col gap-2">
        {description.map((paragraph) => (
          <p key={paragraph} className="text-md text-foreground-tertiary">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
