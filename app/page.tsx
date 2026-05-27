"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { AboutSection } from "./components/about-section";
import { EducationSection } from "./components/education-section";
import { FooterArcade } from "./components/footer-arcade";
import { ProjectsSection } from "./components/projects-section";
import { SiteMenu } from "./components/site-menu";
import { WorkSection } from "./components/work-section";

const contactLinkClass =
  "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-foreground-secondary transition-colors hover:bg-background-tertiary hover:text-foreground-primary";

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: REVEAL_EASE },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: REVEAL_EASE },
  },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background-primary font-sans">
      <SiteMenu />
      <main className="flex w-full max-w-3xl flex-1 flex-col bg-background-primary px-10 py-16 md:px-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex w-full flex-col gap-4"
        >
          {/* Header */}
          <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:items-start">
            <motion.div variants={fadeUp}>
              <h1 className="font-serif text-5xl font-medium text-foreground-primary">
                <span className="block whitespace-nowrap sm:hidden">Ziady Mubaraq</span>
                <span className="hidden sm:block">Ziady</span>
                <span className="hidden sm:block">Mubaraq</span>
              </h1>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="hidden flex-col sm:flex sm:justify-self-end"
            >
              <motion.div
                variants={scaleIn}
                className="relative mb-4 flex h-[120px] w-[120px] items-center justify-center"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-12"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)
                    `,
                    backgroundSize: "32px 32px",
                    WebkitMaskImage:
                      "radial-gradient(ellipse at center, black 35%, transparent 78%)",
                    maskImage:
                      "radial-gradient(ellipse at center, black 35%, transparent 78%)",
                  }}
                />
                <div className="relative h-[120px] w-[120px] overflow-hidden rounded-2xl border border-button-secondary-background">
                  <Image
                    src="/avatar.webp"
                    alt="Ziady Mubaraq"
                    fill
                    sizes="120px"
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>
              <AboutSection />
            </motion.div>

            <motion.div variants={fadeUp} className="sm:hidden">
              <AboutSection />
            </motion.div>
          </div>

          {/* Work */}
          <motion.div id="work" variants={fadeUp} className="scroll-mt-20 flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:gap-x-8 py-16">
            <div className="sm:sticky sm:top-20 sm:self-start">
              <h3 className="text-3xl font-medium">Work</h3>
            </div>
            <div>
              <WorkSection />
            </div>
          </motion.div>

          {/* Education */}
          <motion.div id="education" variants={fadeUp} className="scroll-mt-20 flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:gap-x-8 py-16">
            <div className="sm:sticky sm:top-20 sm:self-start">
              <h3 className="text-3xl font-medium">Education</h3>
            </div>
            <div>
              <EducationSection />
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div id="projects" variants={fadeUp} className="scroll-mt-20 flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:gap-x-8 py-16">
            <div className="sm:sticky sm:top-20 sm:self-start">
              <h3 className="text-3xl font-medium">Projects</h3>
            </div>
            <div>
              <ProjectsSection />
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div id="contact" variants={fadeUp} className="scroll-mt-20 flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:items-start sm:gap-x-8 py-16 border-b border-button-secondary-background">
            <div className="sm:sticky sm:top-20 sm:self-start">
              <h3 className="text-3xl font-medium">Contact</h3>
            </div>
            <ul className="flex flex-col gap-1">
              <li>
                <Link href="mailto:ziady.mubaraq@gmail.com" className={contactLinkClass}>
                  Mail <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/ziadyjo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLinkClass}
                >
                  GitHub <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/ziadyjo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLinkClass}
                >
                  LinkedIn <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.x.com/ziadyjo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLinkClass}
                >
                  X <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 text-md text-foreground-tertiary">
              <span>&copy; {new Date().getFullYear()}</span>
              <span aria-hidden className="text-button-tertiary-border-hover">&middot;</span>
              <span className="inline-flex items-center gap-1">
                Made with
                <Heart className="h-3.5 w-3.5 fill-current" aria-label="love" />
              </span>
            </span>
          </motion.div>

          <motion.div variants={fadeUp}>
            <FooterArcade />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
