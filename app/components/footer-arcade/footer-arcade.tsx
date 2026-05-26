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
} from "./game";

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
  const [currentPlayer, setCurrentPlayer] = useState<Player>("player");
  const [gameActive, setGameActive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [winningCells, setWinningCells] = useState<[number, number][]>([]);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [playerGlyph, setPlayerGlyph] = useState(GLYPHS[0]);
  const [computerGlyph, setComputerGlyph] = useState(GLYPHS[1]);
  const [playerColor, setPlayerColor] = useState<string>(COLOR_PALETTE[0]);
  const [computerColor, setComputerColor] = useState<string>(COLOR_PALETTE[1]);
  const [falling, setFalling] = useState<{
    col: number;
    row: number;
    player: Player;
  } | null>(null);
  const boardRef = useRef(board);

  boardRef.current = board;

  const startGame = useCallback((nextColumns: number) => {
    const [nextPlayerGlyph, nextComputerGlyph] = pickPair(GLYPHS);
    const [nextPlayerColor, nextComputerColor] = pickPair(COLOR_PALETTE);

    setColumns(nextColumns);
    setBoard(createBoard(nextColumns));
    setCurrentPlayer("player");
    setGameActive(true);
    setIsProcessing(false);
    setMoveCount(0);
    setHoverCol(null);
    setWinningCells([]);
    setResultMessage(null);
    setFalling(null);
    setPlayerGlyph(nextPlayerGlyph);
    setComputerGlyph(nextComputerGlyph);
    setPlayerColor(nextPlayerColor);
    setComputerColor(nextComputerColor);
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

      setMoveCount((count) => count + 1);

      let step = 0;
      const animateDrop = () => {
        setFalling({ col, row: step, player });

        if (step < row) {
          step += 1;
          window.setTimeout(animateDrop, 120);
          return;
        }

        boardRef.current = nextBoard;
        setBoard(nextBoard);
        setFalling(null);

        window.setTimeout(() => {
          const win = checkWin(nextBoard, row, col);
          if (win.won) {
            endGame(
              player === "player" ? "You win!" : "CPU wins.",
              win.cells,
            );
            return;
          }

          if (checkDraw(nextBoard)) {
            endGame("Draw.", []);
            return;
          }

          const nextPlayer: Player =
            player === "player" ? "computer" : "player";
          setCurrentPlayer(nextPlayer);

          if (nextPlayer === "computer") {
            window.setTimeout(() => {
              const cpuCol = findBestMove(boardRef.current);
              if (cpuCol !== -1) {
                applyMove(cpuCol, "computer");
              } else {
                setIsProcessing(false);
              }
            }, 500);
          } else {
            setIsProcessing(false);
          }
        }, 100);
      };

      animateDrop();
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

  const activeGlyph =
    currentPlayer === "player" ? playerGlyph : computerGlyph;
  const activeColor =
    currentPlayer === "player" ? playerColor : computerColor;

  return (
    <section className="w-full border-t border-border-tertiary pt-10">
      <h2 className="text-center font-serif font-medium text-3xl text-foreground-primary py-12">
        Footer arcade
      </h2>

      <div className="mt-6 flex items-center justify-between gap-4">
        {resultMessage ? (
          <button
            type="button"
            onClick={() => startGame(columns)}
            className="rounded-full border border-border-primary px-4 py-2 text-md text-foreground-primary transition-colors hover:bg-background-secondary cursor-pointer"
          >
            {resultMessage} Play again
          </button>
        ) : (
          <p className="flex items-center gap-2 text-md text-foreground-primary">
            <span>
              {currentPlayer === "player" ? "Your turn" : "CPU's turn"}
            </span>
            {gameActive && (
              <GlyphIcon glyph={activeGlyph} color={activeColor} size={10} />
            )}
          </p>
        )}

        <div className="flex items-center gap-2 text-md text-foreground-primary">
          <span>Moves</span>
          <span className="min-w-8 rounded-md border border-border-secondary px-2 py-0.5 text-center text-foreground-primary tabular-nums">
            {moveCount.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <div
        className="mt-4 grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        onMouseLeave={() => setHoverCol(null)}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isWinning = winningSet.has(`${rowIndex}-${colIndex}`);
            const isHovered = hoverCol === colIndex && gameActive;

            let glyph: GlyphConfig | null = null;
            let color = "";

            if (
              falling &&
              falling.col === colIndex &&
              falling.row === rowIndex
            ) {
              glyph = falling.player === "player" ? playerGlyph : computerGlyph;
              color = falling.player === "player" ? playerColor : computerColor;
            } else if (cell === "player") {
              glyph = playerGlyph;
              color = playerColor;
            } else if (cell === "computer") {
              glyph = computerGlyph;
              color = computerColor;
            }

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                disabled={!gameActive || isProcessing}
                onMouseEnter={() => setHoverCol(colIndex)}
                onClick={() => handleColumnClick(colIndex)}
                className="relative aspect-square rounded-md transition-[background-color,opacity] disabled:cursor-default cursor-pointer"
                style={{
                  backgroundColor: isHovered
                    ? "#555"
                    : isWinning
                      ? WINNING_CELL
                      : EMPTY_CELL,
                  opacity: 1,
                }}

                aria-label={`Column ${colIndex + 1}, row ${rowIndex + 1}`}
              >
                {glyph && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <GlyphIcon glyph={glyph} color={color} size={18} />
                  </span>
                )}
              </button>
            );
          }),
        )}
      </div>
    </section>
  );
}
