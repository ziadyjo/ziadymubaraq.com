/**
 * Pure Connect-Four game logic — no React, no rendering. The board is a plain
 * mutable grid so the minimax search can explore moves in place (each trial
 * move is undone before returning), which keeps the AI allocation-free.
 */

export const ROWS = 5;
export const DESKTOP_COLUMNS = 11;
export const MOBILE_COLUMNS = 7;
export const CONNECT = 4;

/** Minimax search depth for the computer opponent. */
const SEARCH_DEPTH = 4;
const WIN_SCORE = 1000;

export type Player = "player" | "computer";
export type Cell = Player | null;
export type Board = Cell[][];
export type CellPosition = [row: number, column: number];
export type GameStatus = "playing" | "won" | "lost" | "draw";

export interface WinResult {
  won: boolean;
  cells: CellPosition[];
}

/** Directions to scan for a win: horizontal, vertical, and both diagonals. */
const DIRECTIONS: readonly CellPosition[] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [1, -1],
];

export function getColumnsForWidth(width: number): number {
  return width > 1024 ? DESKTOP_COLUMNS : MOBILE_COLUMNS;
}

export function createBoard(columns: number): Board {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: columns }, (): Cell => null),
  );
}

export function canMove(board: Board, column: number): boolean {
  return board[0]?.[column] === null;
}

/** Lowest empty row in a column, or -1 if the column is full. */
export function getLowestRow(board: Board, column: number): number {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][column] === null) return row;
  }
  return -1;
}

export function dropPiece(
  board: Board,
  column: number,
  player: Player,
): { board: Board; row: number } {
  const row = getLowestRow(board, column);
  if (row === -1) return { board, row: -1 };

  const next = board.map((line) => [...line]);
  next[row][column] = player;
  return { board: next, row };
}

function collectLine(
  board: Board,
  row: number,
  column: number,
  rowStep: number,
  columnStep: number,
  player: Player,
): CellPosition[] {
  const cells: CellPosition[] = [[row, column]];
  const columns = board[0]?.length ?? 0;

  for (const sign of [1, -1] as const) {
    let r = row + rowStep * sign;
    let c = column + columnStep * sign;
    while (r >= 0 && r < ROWS && c >= 0 && c < columns && board[r][c] === player) {
      cells.push([r, c]);
      r += rowStep * sign;
      c += columnStep * sign;
    }
  }

  return cells;
}

export function checkWin(board: Board, row: number, column: number): WinResult {
  const player = board[row][column];
  if (!player) return { won: false, cells: [] };

  for (const [rowStep, columnStep] of DIRECTIONS) {
    const cells = collectLine(board, row, column, rowStep, columnStep, player);
    if (cells.length >= CONNECT) return { won: true, cells };
  }

  return { won: false, cells: [] };
}

export function checkDraw(board: Board): boolean {
  return board[0].every((cell) => cell !== null);
}

function isWinningMove(board: Board, column: number, player: Player): boolean {
  const row = getLowestRow(board, column);
  if (row === -1) return false;
  board[row][column] = player;
  const { won } = checkWin(board, row, column);
  board[row][column] = null;
  return won;
}

function evaluateBoard(board: Board): number {
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < board[0].length; column++) {
      const player = board[row][column];
      if (player && checkWin(board, row, column).won) {
        return player === "computer" ? WIN_SCORE : -WIN_SCORE;
      }
    }
  }
  return 0;
}

function minimax(
  board: Board,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
): number {
  const score = evaluateBoard(board);
  if (score !== 0) return score;
  if (depth === 0 || checkDraw(board)) return 0;

  const columns = board[0].length;
  const player: Player = maximizing ? "computer" : "player";
  let best = maximizing ? -Infinity : Infinity;

  for (let column = 0; column < columns; column++) {
    if (!canMove(board, column)) continue;
    const row = getLowestRow(board, column);
    board[row][column] = player;
    const evaluation = minimax(board, depth - 1, alpha, beta, !maximizing);
    board[row][column] = null;

    if (maximizing) {
      best = Math.max(best, evaluation);
      alpha = Math.max(alpha, evaluation);
    } else {
      best = Math.min(best, evaluation);
      beta = Math.min(beta, evaluation);
    }
    if (beta <= alpha) break;
  }

  return best;
}

/** Column preference order, favouring the centre, used as a last resort. */
const COLUMN_PREFERENCE = [2, 3, 1, 4, 0, 5, 6, 7, 8, 9, 10];

export function findBestMove(board: Board): number {
  const columns = board[0].length;

  // 1. Take an immediate win, 2. block the opponent's immediate win.
  for (const threat of ["computer", "player"] as const) {
    for (let column = 0; column < columns; column++) {
      if (isWinningMove(board, column, threat)) return column;
    }
  }

  // 3. Otherwise search for the highest-scoring move.
  let bestColumn = -1;
  let bestScore = -Infinity;
  for (let column = 0; column < columns; column++) {
    if (!canMove(board, column)) continue;
    const row = getLowestRow(board, column);
    board[row][column] = "computer";
    const score = minimax(board, SEARCH_DEPTH, -Infinity, Infinity, false);
    board[row][column] = null;
    if (score > bestScore) {
      bestScore = score;
      bestColumn = column;
    }
  }
  if (bestColumn !== -1) return bestColumn;

  // 4. Fallback: first playable column by centre preference.
  for (const column of COLUMN_PREFERENCE) {
    if (column < columns && canMove(board, column)) return column;
  }
  return -1;
}

/** Fisher–Yates shuffle, returning the first two items as a fixed pair. */
export function pickPair<T>(items: readonly T[]): readonly [T, T] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return [shuffled[0], shuffled[1]] as const;
}
