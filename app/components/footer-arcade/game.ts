export const ROWS = 5;
export const DESKTOP_COLUMNS = 11;
export const MOBILE_COLUMNS = 7;

export type Player = "player" | "computer";
export type Cell = Player | null;
export type Board = Cell[][];

export const COLOR_PALETTE = [
  "#c46686",
  "#6a98bc",
  "#cbcadb",
  "#788c5d",
] as const;

export function getColumnsForWidth(width: number) {
  return width > 1024 ? DESKTOP_COLUMNS : MOBILE_COLUMNS;
}

export function createBoard(columns: number): Board {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: columns }, () => null),
  );
}

export function canMove(board: Board, col: number) {
  return board[0]?.[col] === null;
}

export function getLowestRow(board: Board, col: number) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === null) return row;
  }
  return -1;
}

export function dropPiece(board: Board, col: number, player: Player) {
  const row = getLowestRow(board, col);
  if (row === -1) return { board, row: -1 };

  const next = board.map((line) => [...line]);
  next[row][col] = player;
  return { board: next, row };
}

function checkDirection(
  board: Board,
  row: number,
  col: number,
  rowDir: number,
  colDir: number,
  player: Player,
) {
  const cells: [number, number][] = [[row, col]];
  let r = row + rowDir;
  let c = col + colDir;

  while (
    r >= 0 &&
    r < ROWS &&
    c >= 0 &&
    c < (board[0]?.length ?? 0) &&
    board[r][c] === player
  ) {
    cells.push([r, c]);
    r += rowDir;
    c += colDir;
  }

  r = row - rowDir;
  c = col - colDir;
  while (
    r >= 0 &&
    r < ROWS &&
    c >= 0 &&
    c < (board[0]?.length ?? 0) &&
    board[r][c] === player
  ) {
    cells.push([r, c]);
    r -= rowDir;
    c -= colDir;
  }

  return cells.length >= 4 ? cells : [];
}

export function checkWin(board: Board, row: number, col: number) {
  const player = board[row][col];
  if (!player) return { won: false, cells: [] as [number, number][] };

  const directions: [number, number][] = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];

  for (const [rowDir, colDir] of directions) {
    const cells = checkDirection(board, row, col, rowDir, colDir, player);
    if (cells.length >= 4) return { won: true, cells };
  }

  return { won: false, cells: [] as [number, number][] };
}

export function checkDraw(board: Board) {
  return board[0].every((cell) => cell !== null);
}

function checkWinAt(board: Board, row: number, col: number, player: Player) {
  return checkWin(board, row, col).won && board[row][col] === player;
}

function evaluateBoard(board: Board) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < board[0].length; col++) {
      const player = board[row][col];
      if (player && checkWinAt(board, row, col, player)) {
        return player === "computer" ? 1000 : -1000;
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
  isMaximizing: boolean,
) {
  const score = evaluateBoard(board);
  if (score !== 0) return score;
  if (depth === 0 || checkDraw(board)) return 0;

  const columns = board[0].length;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let col = 0; col < columns; col++) {
      if (!canMove(board, col)) continue;
      const row = getLowestRow(board, col);
      board[row][col] = "computer";
      const next = minimax(board, depth - 1, alpha, beta, false);
      board[row][col] = null;
      maxEval = Math.max(maxEval, next);
      alpha = Math.max(alpha, next);
      if (beta <= alpha) break;
    }
    return maxEval;
  }

  let minEval = Infinity;
  for (let col = 0; col < columns; col++) {
    if (!canMove(board, col)) continue;
    const row = getLowestRow(board, col);
    board[row][col] = "player";
    const next = minimax(board, depth - 1, alpha, beta, true);
    board[row][col] = null;
    minEval = Math.min(minEval, next);
    beta = Math.min(beta, next);
    if (beta <= alpha) break;
  }
  return minEval;
}

export function findBestMove(board: Board) {
  const columns = board[0].length;

  for (let col = 0; col < columns; col++) {
    if (!canMove(board, col)) continue;
    const row = getLowestRow(board, col);
    board[row][col] = "computer";
    const won = checkWin(board, row, col).won;
    board[row][col] = null;
    if (won) return col;
  }

  for (let col = 0; col < columns; col++) {
    if (!canMove(board, col)) continue;
    const row = getLowestRow(board, col);
    board[row][col] = "player";
    const blocked = checkWin(board, row, col).won;
    board[row][col] = null;
    if (blocked) return col;
  }

  let bestCol = -1;
  let bestScore = -Infinity;

  for (let col = 0; col < columns; col++) {
    if (!canMove(board, col)) continue;
    const row = getLowestRow(board, col);
    board[row][col] = "computer";
    const score = minimax(board, 4, -Infinity, Infinity, false);
    board[row][col] = null;
    if (score > bestScore) {
      bestScore = score;
      bestCol = col;
    }
  }

  if (bestCol !== -1) return bestCol;

  const preferred = [2, 3, 1, 4, 0, 5, 6, 7, 8, 9, 10];
  for (const col of preferred) {
    if (col < columns && canMove(board, col)) return col;
  }

  return -1;
}

export function pickPair<T>(items: readonly T[]) {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]] as const;
}
