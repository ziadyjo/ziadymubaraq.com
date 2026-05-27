import { Fragment } from "react";
import type { WorkExperience } from "@/types";
import { WORK_EXPERIENCE } from "@/data/work";
import { MetaList } from "@/components/ui/meta-list";

export function Work() {
  return (
    <div className="flex flex-col">
      {WORK_EXPERIENCE.map((item, index) => (
        <Fragment key={item.company}>
          {index > 0 && <hr className="border-t border-button-secondary-border" />}
          <WorkCard {...item} />
        </Fragment>
      ))}
    </div>
  );
}

function WorkCard({
  role,
  period,
  company,
  location,
  description,
  current,
}: WorkExperience) {
  return (
    <article className="flex flex-col gap-3 py-6 first:pt-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-lg text-foreground-primary">{role}</h3>
        {current && (
          <span className="rounded-md bg-[#c96442] px-2 py-0.5 text-sm text-foreground-primary">
            Current
          </span>
        )}
      </div>

      <MetaList items={[period, company, location]} />

      <div className="flex flex-col gap-2">
        {description.map((paragraph) => (
          <p key={paragraph} className="text-base text-foreground-tertiary">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
