"use client";

import { ArcadeBoard } from "./arcade-board";
import { ArcadeStatus } from "./arcade-status";
import { useColumns } from "./use-columns";
import { useConnectFour } from "./use-connect-four";

export function Arcade() {
  const columns = useColumns();
  // Remount on a breakpoint change so the board re-initialises at the new
  // width — no reset effect needed.
  return <ArcadeGame key={columns} columns={columns} />;
}

function ArcadeGame({ columns }: { columns: number }) {
  const game = useConnectFour(columns);

  return (
    <section className="w-full pt-10" aria-label="Connect Four mini-game">
      <ArcadeStatus game={game} />
      <ArcadeBoard game={game} />
    </section>
  );
}
