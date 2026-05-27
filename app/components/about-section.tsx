export function AboutSection() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 border-b border-button-secondary-background pb-4">
        <div>
          <h2 className="text-md font-medium text-foreground-primary">About</h2>
        </div>
        <ul>
          <li>
            <p className="text-foreground-tertiary">Full-Stack Engineer</p>
          </li>
          <li>
            <p className="text-foreground-tertiary">Based in Jakarta</p>
          </li>
          <li>
            <p className="text-foreground-tertiary">5+ Years Experience</p>
          </li>
          <li>
            <p className="text-foreground-tertiary">Open to Work</p>
          </li>
        </ul>
      </div>
      <p className="text-foreground-tertiary pt-4">Obsessed with AI before it was cool. I build multi-agent systems, RAG pipelines, and AI-powered SaaS platforms that businesses run on 24/7.</p>
      <p className="text-foreground-tertiary pt-4">Right now? Pushing Claude Code and Codex so hard. No fluff.</p>
    </>
  );
}
