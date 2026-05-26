import { div } from "motion/react-client"

export function AboutSection() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 border-b border-border-tertiary pb-4">
        <div>
          <h2 className="text-md font-medium text-foreground-primary">About</h2>
        </div>
        <ul>
          <li>
            <p className="text-foreground-secondary">Full-Stack Engineer</p>
          </li>
          <li>
            <p className="text-foreground-secondary">Based in Jakarta</p>
          </li>
          <li>
            <p className="text-foreground-secondary">5+ Years Experience</p>
          </li>
          <li>
            <p className="text-foreground-secondary">Open to Work</p>
          </li>
        </ul>
      </div>
      <p className="text-foreground-secondary pt-4">Obsessed with AI before it was cool. I build multi-agent systems, RAG pipelines, and production AI systems that businesses run on 24/7. No fluff.</p>
    </>
  );
}
