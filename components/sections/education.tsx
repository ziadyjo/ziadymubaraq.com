import { Fragment } from "react";
import type { Education as EducationEntry } from "@/types";
import { EDUCATION } from "@/data/education";
import { MetaList } from "@/components/ui/meta-list";

export function Education() {
  return (
    <div className="flex flex-col">
      {EDUCATION.map((item, index) => (
        <Fragment key={item.degree}>
          {index > 0 && <hr className="border-t border-button-secondary-border" />}
          <EducationCard {...item} />
        </Fragment>
      ))}
    </div>
  );
}

function EducationCard({
  degree,
  period,
  institution,
  location,
  description,
}: EducationEntry) {
  return (
    <article className="flex flex-col gap-3 py-6 first:pt-0">
      <h3 className="text-lg text-foreground-primary">{degree}</h3>
      <MetaList items={[period, institution, location]} />
      <p className="text-base text-foreground-tertiary">{description}</p>
    </article>
  );
}
