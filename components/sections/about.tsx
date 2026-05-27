import { PROFILE } from "@/data/profile";

const { facts, bio } = PROFILE.about;

export function About() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 border-b border-button-secondary-background pb-4">
        <h2 className="text-base font-medium text-foreground-primary">About</h2>
        <ul>
          {facts.map((fact) => (
            <li key={fact} className="text-foreground-tertiary">
              {fact}
            </li>
          ))}
        </ul>
      </div>
      {bio.map((paragraph) => (
        <p key={paragraph} className="pt-4 text-foreground-tertiary">
          {paragraph}
        </p>
      ))}
    </>
  );
}
