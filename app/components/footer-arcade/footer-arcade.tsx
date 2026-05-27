"use client";

import type { LucideIcon } from "lucide-react";
import {
  Circle,
  Diamond,
  Hexagon,
  Hourglass,
  Square,
  Star,
  Triangle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  COLOR_PALETTE,
  DESKTOP_COLUMNS,
  type Board,
  type Player,
  checkDraw,
  checkWin,
  createBoard,
  dropPiece,
  findBestMove,
  getColumnsForWidth,
  pickPair,
} from "./engine";

const GLYPHS: { id: string; Icon: LucideIcon; className?: string }[] = [
  { id: "triangle", Icon: Triangle, className: "rotate-180" },
  { id: "hourglass", Icon: Hourglass },
  { id: "diamond", Icon: Diamond },
  { id: "circle", Icon: Circle },
  { id: "square", Icon: Square },
  { id: "star", Icon: Star },
  { id: "hexagon", Icon: Hexagon },
  { id: "zap", Icon: Zap },
];

const EMPTY_CELL = "#3a3a3a";
const WINNING_CELL = "#ffffff";

type GlyphConfig = (typeof GLYPHS)[number];

function GlyphIcon({
  glyph,
  color,
  size = 20,
}: {
  glyph: GlyphConfig;
  color: string;
  size?: number;
}) {
  const { Icon, className } = glyph;
  return (
    <Icon
      className={className}
      size={size * 3}
      strokeWidth={2.2}
      style={{ color }}
      aria-hidden
      fill={color}
    />
  );
}

export function FooterArcade() {
  const [columns, setColumns] = useState(DESKTOP_COLUMNS);
  const [board, setBoard] = useState<Board>(() => createBoard(DESKTOP_COLUMNS));
  const [boardKey, setBoardKey] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("player");
  const [gameActive, setGameActive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  // Seed deterministically so SSR and the first client render agree; the
  // random pair is chosen after mount in the effect below.
  const [[playerGlyph, computerGlyph], setGlyphs] = useState<
    readonly [GlyphConfig, GlyphConfig]
  >(() => [GLYPHS[0], GLYPHS[1]]);
  const [[playerColor, computerColor], setColors] = useState<
    readonly [string, string]
  >(() => [COLOR_PALETTE[0], COLOR_PALETTE[1]]);
  const boardRef = useRef(board);

  boardRef.current = board;

  useEffect(() => {
    setGlyphs(pickPair(GLYPHS));
    setColors(pickPair(COLOR_PALETTE));
  }, []);

  const startGame = useCallback((nextColumns: number) => {
    setColumns(nextColumns);
    setBoard(createBoard(nextColumns));
    setBoardKey((k) => k + 1);
    setCurrentPlayer("player");
    setGameActive(true);
    setIsProcessing(false);
    setMoveCount(0);
    setHoverCol(null);
    setWinningCells([]);
    setResultMessage(null);
    setGlyphs(pickPair(GLYPHS));
    setColors(pickPair(COLOR_PALETTE));
  }, []);

  useEffect(() => {
    const onResize = () => {
      const nextColumns = getColumnsForWidth(window.innerWidth);
      setColumns((current) => {
        if (current !== nextColumns) {
          startGame(nextColumns);
        }
        return nextColumns;
      });
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [startGame]);

  const endGame = useCallback((message: string, cells: [number, number][]) => {
    setGameActive(false);
    setIsProcessing(false);
    setWinningCells(cells);
    setResultMessage(message);
    setHoverCol(null);
  }, []);

  const applyMove = useCallback(
    (col: number, player: Player) => {
      const currentBoard = boardRef.current;
      const { board: nextBoard, row } = dropPiece(currentBoard, col, player);
      if (row === -1) return;

      setMoveCount((c) => c + 1);
      boardRef.current = nextBoard;
      setBoard(nextBoard);

      window.setTimeout(() => {
        const win = checkWin(nextBoard, row, col);
        if (win.won) {
          endGame(player === "player" ? "You win!" : "CPU wins.", win.cells);
          return;
        }

        if (checkDraw(nextBoard)) {
          endGame("Draw.", []);
          return;
        }

        const next: Player = player === "player" ? "computer" : "player";
        setCurrentPlayer(next);

        if (next === "computer") {
          window.setTimeout(() => {
            const cpuCol = findBestMove(boardRef.current);
            if (cpuCol !== -1) applyMove(cpuCol, "computer");
            else setIsProcessing(false);
          }, 300);
        } else {
          setIsProcessing(false);
        }
      }, 280);
    },
    [endGame],
  );

  const handleColumnClick = (col: number) => {
    if (!gameActive || isProcessing || currentPlayer !== "player") return;
    setIsProcessing(true);
    applyMove(col, "player");
  };

  const winningSet = useMemo(
    () => new Set(winningCells.map(([row, col]) => `${row}-${col}`)),
    [winningCells],
  );

  const activeGlyph = currentPlayer === "player" ? playerGlyph : computerGlyph;
  const activeColor = currentPlayer === "player" ? playerColor : computerColor;

  return (
    <section className="w-full pt-10">


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
              onClick={() => startGame(columns)}
              className="cursor-pointer rounded-full border border-button-tertiary-border-hover px-4 py-2 text-md text-foreground-primary transition-colors hover:bg-background-secondary"
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
                  className="flex items-center gap-2 text-md text-foreground-primary"
                >
                  <span>{currentPlayer === "player" ? "Your turn" : "CPU's turn"}</span>
                  {gameActive && (
                    <GlyphIcon glyph={activeGlyph} color={activeColor} size={10} />
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 text-md text-foreground-primary">
          <span>Moves</span>
          <div className="relative min-w-8 overflow-hidden rounded-md border border-button-secondary-border px-2 py-0.5 text-center tabular-nums">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={moveCount}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="block text-foreground-primary"
              >
                {moveCount.toString().padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div
        key={boardKey}
        className="mt-4 grid gap-2 overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        onMouseLeave={() => setHoverCol(null)}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isWinning = winningSet.has(`${rowIndex}-${colIndex}`);
            const isHovered = hoverCol === colIndex && gameActive;

            let glyph: GlyphConfig | null = null;
            let color = "";

            if (cell === "player") {
              glyph = playerGlyph;
              color = playerColor;
            } else if (cell === "computer") {
              glyph = computerGlyph;
              color = computerColor;
            }

            return (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                disabled={!gameActive || isProcessing}
                onMouseEnter={() => setHoverCol(colIndex)}
                onClick={() => handleColumnClick(colIndex)}
                className="relative aspect-square cursor-pointer rounded-md disabled:cursor-default"
                animate={{
                  backgroundColor: isHovered
                    ? "#555"
                    : isWinning
                      ? WINNING_CELL
                      : EMPTY_CELL,
                  scale: isWinning ? [1, 1.06, 1] : 1,
                }}
                transition={{
                  backgroundColor: { duration: 0.1, ease: "easeOut" },
                  scale: isWinning
                    ? { duration: 0.45, ease: "easeOut", delay: 0.05 }
                    : { duration: 0.1 },
                }}
                whileTap={gameActive && !isProcessing ? { scale: 0.9 } : undefined}
                aria-label={`Column ${colIndex + 1}, row ${rowIndex + 1}`}
              >
                <AnimatePresence>
                  {glyph && (
                    <motion.span
                      key={`glyph-${rowIndex}-${colIndex}`}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center"
                      initial={{ y: `-${(rowIndex + 1) * 100}%`, opacity: 0 }}
                      animate={
                        isWinning
                          ? { y: 0, opacity: 1, scale: [1, 1.18, 0.94, 1.06, 1] }
                          : { y: 0, opacity: 1, scale: 1 }
                      }
                      transition={
                        isWinning
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
    </section>
  );
}
