"use client";

import { AnimatePresence, motion } from "motion/react";
import { GlyphIcon } from "./glyph-icon";
import type { ConnectFour } from "./use-connect-four";

interface ArcadeStatusProps {
  game: ConnectFour;
}

export function ArcadeStatus({ game }: ArcadeStatusProps) {
  const { status, resultMessage, currentPlayer, glyphs, colors, moveCount, reset } = game;

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <AnimatePresence mode="wait">
        {resultMessage ? (
          <motion.button
            key="result"
            type="button"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={reset}
            className="cursor-pointer rounded-full border border-button-tertiary-border-hover px-4 py-2 text-base text-foreground-primary transition-colors hover:bg-background-secondary"
          >
            {resultMessage} Play again
          </motion.button>
        ) : (
          <div key="status" className="overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={currentPlayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="flex items-center gap-2 text-base text-foreground-primary"
              >
                <span>{currentPlayer === "player" ? "Your turn" : "CPU's turn"}</span>
                {status === "playing" && (
                  <GlyphIcon
                    glyph={glyphs[currentPlayer]}
                    color={colors[currentPlayer]}
                    size={10}
                  />
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>

      <MovesCounter count={moveCount} />
    </div>
  );
}

function MovesCounter({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 text-base text-foreground-primary">
      <span>Moves</span>
      <div className="relative min-w-8 overflow-hidden rounded-md border border-button-secondary-border px-2 py-0.5 text-center tabular-nums">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="block text-foreground-primary"
          >
            {count.toString().padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
