"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
  type Board,
  type CellPosition,
  type GameStatus,
  type Player,
  checkDraw,
  checkWin,
  createBoard,
  dropPiece,
  findBestMove,
  pickPair,
} from "./engine";
import { COLOR_PALETTE, COMPUTER_THINK_MS, GLYPHS, type GlyphConfig } from "./constants";

type PlayerRecord<T> = Readonly<Record<Player, T>>;

interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  moveCount: number;
  winningCells: readonly CellPosition[];
  glyphs: PlayerRecord<GlyphConfig>;
  colors: PlayerRecord<string>;
}

type GameAction =
  | { type: "drop"; column: number; player: Player }
  | { type: "reset"; glyphs: PlayerRecord<GlyphConfig>; colors: PlayerRecord<string> };

const RESULT_MESSAGE: Record<Exclude<GameStatus, "playing">, string> = {
  won: "You win!",
  lost: "CPU wins.",
  draw: "Draw.",
};

function pairToRecord<T>([player, computer]: readonly [T, T]): PlayerRecord<T> {
  return { player, computer };
}

function createInitialState(columns: number): GameState {
  return {
    board: createBoard(columns),
    currentPlayer: "player",
    status: "playing",
    moveCount: 0,
    winningCells: [],
    // Deterministic on first render so SSR and hydration agree; `reset`
    // randomises afterwards from an event handler.
    glyphs: { player: GLYPHS[0], computer: GLYPHS[1] },
    colors: { player: COLOR_PALETTE[0], computer: COLOR_PALETTE[1] },
  };
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "drop": {
      const { column, player } = action;
      if (state.status !== "playing" || player !== state.currentPlayer) return state;

      const { board, row } = dropPiece(state.board, column, player);
      if (row === -1) return state; // column full — ignore

      const moveCount = state.moveCount + 1;
      const { won, cells } = checkWin(board, row, column);
      if (won) {
        return {
          ...state,
          board,
          moveCount,
          status: player === "player" ? "won" : "lost",
          winningCells: cells,
        };
      }
      if (checkDraw(board)) {
        return { ...state, board, moveCount, status: "draw" };
      }
      return {
        ...state,
        board,
        moveCount,
        currentPlayer: player === "player" ? "computer" : "player",
      };
    }
    case "reset":
      return {
        ...createInitialState(state.board[0].length),
        glyphs: action.glyphs,
        colors: action.colors,
      };
  }
}

export interface ConnectFour {
  board: Board;
  status: GameStatus;
  currentPlayer: Player;
  moveCount: number;
  glyphs: PlayerRecord<GlyphConfig>;
  colors: PlayerRecord<string>;
  /** True when the human may drop a piece (their turn, game in progress). */
  canPlay: boolean;
  /** End-of-game message, or `null` while playing. */
  resultMessage: string | null;
  hoverColumn: number | null;
  isWinningCell: (row: number, column: number) => boolean;
  setHoverColumn: (column: number | null) => void;
  play: (column: number) => void;
  reset: () => void;
}

export function useConnectFour(columns: number): ConnectFour {
  const [state, dispatch] = useReducer(reducer, columns, createInitialState);
  const [hoverColumn, setHoverColumn] = useState<number | null>(null);

  // The computer's turn: think briefly, then drop. Dispatching inside the
  // timeout (rather than synchronously) keeps this effect free of cascading
  // renders; the cleanup cancels a pending move if the game changes first.
  useEffect(() => {
    if (state.status !== "playing" || state.currentPlayer !== "computer") return;

    const timer = window.setTimeout(() => {
      const column = findBestMove(state.board);
      if (column !== -1) dispatch({ type: "drop", column, player: "computer" });
    }, COMPUTER_THINK_MS);

    return () => window.clearTimeout(timer);
  }, [state.status, state.currentPlayer, state.board]);

  const winningKeys = useMemo(
    () => new Set(state.winningCells.map(([row, column]) => `${row}:${column}`)),
    [state.winningCells],
  );

  const isWinningCell = useCallback(
    (row: number, column: number) => winningKeys.has(`${row}:${column}`),
    [winningKeys],
  );

  const play = useCallback((column: number) => {
    dispatch({ type: "drop", column, player: "player" });
  }, []);

  const reset = useCallback(() => {
    setHoverColumn(null);
    dispatch({
      type: "reset",
      glyphs: pairToRecord(pickPair(GLYPHS)),
      colors: pairToRecord(pickPair(COLOR_PALETTE)),
    });
  }, []);

  return {
    board: state.board,
    status: state.status,
    currentPlayer: state.currentPlayer,
    moveCount: state.moveCount,
    glyphs: state.glyphs,
    colors: state.colors,
    canPlay: state.status === "playing" && state.currentPlayer === "player",
    resultMessage: state.status === "playing" ? null : RESULT_MESSAGE[state.status],
    hoverColumn,
    isWinningCell,
    setHoverColumn,
    play,
    reset,
  };
}
