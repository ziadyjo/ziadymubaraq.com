"use client";

import { AnimatePresence, motion } from "motion/react";
import { CELL_COLOR } from "./constants";
import { GlyphIcon } from "./glyph-icon";
import type { ConnectFour } from "./use-connect-four";

interface ArcadeBoardProps {
  game: ConnectFour;
}

export function ArcadeBoard({ game }: ArcadeBoardProps) {
  const { board, canPlay, hoverColumn, glyphs, colors } = game;
  const columns = board[0]?.length ?? 0;

  return (
    <div
      className="mt-4 grid gap-2 overflow-hidden"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      onMouseLeave={() => game.setHoverColumn(null)}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          const winning = game.isWinningCell(rowIndex, columnIndex);
          const hovered = canPlay && hoverColumn === columnIndex;
          const glyph = cell ? glyphs[cell] : null;
          const color = cell ? colors[cell] : "";

          return (
            <motion.button
              key={`${rowIndex}:${columnIndex}`}
              type="button"
              disabled={!canPlay}
              onMouseEnter={() => game.setHoverColumn(columnIndex)}
              onClick={() => game.play(columnIndex)}
              className="relative aspect-square cursor-pointer rounded-md disabled:cursor-default"
              animate={{
                backgroundColor: hovered
                  ? CELL_COLOR.hover
                  : winning
                    ? CELL_COLOR.winning
                    : CELL_COLOR.empty,
                scale: winning ? [1, 1.06, 1] : 1,
              }}
              transition={{
                backgroundColor: { duration: 0.1, ease: "easeOut" },
                scale: winning
                  ? { duration: 0.45, ease: "easeOut", delay: 0.05 }
                  : { duration: 0.1 },
              }}
              whileTap={canPlay ? { scale: 0.9 } : undefined}
              aria-label={`Column ${columnIndex + 1}, row ${rowIndex + 1}`}
            >
              <AnimatePresence>
                {glyph && (
                  <motion.span
                    key="glyph"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    initial={{ y: `-${(rowIndex + 1) * 100}%`, opacity: 0 }}
                    animate={
                      winning
                        ? { y: 0, opacity: 1, scale: [1, 1.18, 0.94, 1.06, 1] }
                        : { y: 0, opacity: 1, scale: 1 }
                    }
                    transition={
                      winning
                        ? {
                            y: { type: "spring", stiffness: 600, damping: 38 },
                            opacity: { duration: 0.08 },
                            scale: { duration: 0.55, ease: "easeOut", delay: 0.05 },
                          }
                        : {
                            y: { type: "spring", stiffness: 550, damping: 36, mass: 1.1 },
                            opacity: { duration: 0.08 },
                          }
                    }
                  >
                    <GlyphIcon glyph={glyph} color={color} size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        }),
      )}
    </div>
  );
}
