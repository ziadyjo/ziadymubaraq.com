"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PROFILE } from "@/data/profile";
import { fadeUp, scaleIn } from "@/lib/motion";
import { About } from "./about";

const { firstName, lastName, fullName, avatar } = PROFILE;

export function Hero() {
  return (
    <div className="flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:items-start">
      <motion.div variants={fadeUp}>
        <h1 className="font-serif text-5xl font-medium text-foreground-primary">
          <span className="block whitespace-nowrap sm:hidden">{fullName}</span>
          <span className="hidden sm:block">{firstName}</span>
          <span className="hidden sm:block">{lastName}</span>
        </h1>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="hidden flex-col sm:flex sm:justify-self-end"
      >
        <motion.div
          variants={scaleIn}
          className="relative mb-4 flex items-center justify-center"
          style={{ height: avatar.size, width: avatar.size }}
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
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-button-secondary-background">
            <Image
              src={avatar.src}
              alt={fullName}
              fill
              sizes={`${avatar.size}px`}
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
        <About />
      </motion.div>

      <motion.div variants={fadeUp} className="sm:hidden">
        <About />
      </motion.div>
    </div>
  );
}
