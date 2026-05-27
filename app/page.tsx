"use client";

import { motion } from "motion/react";
import { Arcade } from "@/components/arcade";
import { Section } from "@/components/layout/section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Work } from "@/components/sections/work";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background-primary font-sans">
      <SiteHeader />
      <main className="flex w-full max-w-3xl flex-1 flex-col bg-background-primary px-10 py-16 md:px-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex w-full flex-col gap-4"
        >
          <Hero />

          <Section id="work" title="Work">
            <Work />
          </Section>

          <Section id="education" title="Education">
            <Education />
          </Section>

          <Section id="projects" title="Projects">
            <Projects />
          </Section>

          <Section
            id="contact"
            title="Contact"
            className="border-b border-button-secondary-background"
          >
            <Contact />
          </Section>

          <motion.div variants={fadeUp}>
            <SiteFooter />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Arcade />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
