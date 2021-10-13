import React, { useState } from "react";
import party from "party-js";
import { boardSize } from "../../../constants";
import { Matrix, Player, Position } from "../../../interfaces";
import { isGameOver } from "../../../utils/game";
import "./styles.scss";

const cellIconColors = {
  default: { x: "bg-yellow-400", o: "border-blue-200" },
  winning: { x: "bg-yellow-200", o: "border-blue-100" },
};

const getCellClassName = (cell: Player, isWinningCell: boolean) => {
  let className = {
    x: "boardCellCross ",
    o: "boardCellCircle ",
  }[cell];
  className += isWinningCell
    ? cellIconColors.winning[cell]
    : cellIconColors.default[cell];
  return className;
};

const initialMatrix: Matrix = Array(boardSize).fill(
  Array(boardSize).fill(null)
);
const startingPlayer = "x";
const Board = () => {
  const [matrix, setMatrix] = useState(initialMatrix);
  const [turn, setTurn] = useState<Player>(startingPlayer);
  const [winningPlayer, setWinningPlayer] = useState<Player | undefined>();
  const [winningStreak, setWinningStreak] = useState<Position[] | undefined>();
  const [lastMoves, setLastMoves] = useState<[Player, Position][]>([]);
  const [replayIndex, setReplayIndex] = useState(0);

  const swapMoves = () => {
    setTurn(turn === "x" ? "o" : "x");
  };

  const checkWinner = (
    newMatrix: Matrix,
    [x, y]: Position,
    event?: React.MouseEvent
  ) => {
    const [winner, streak] = isGameOver(newMatrix, [x, y]) || [];
    if (winner) {
      event && party.confetti(event.nativeEvent);
      setWinningPlayer(winner);
      setWinningStreak(streak);
    }
  };

  const handleGoBack = () => {
    const newMatrix = [...matrix];
    const [, [x, y]] = lastMoves[lastMoves.length - 1 - replayIndex];
    newMatrix[x][y] = null;
    swapMoves();
    setReplayIndex(replayIndex + 1);
    if (winningPlayer) {
      setWinningPlayer(undefined);
      setWinningStreak(undefined);
    }
  };

  const handleGoForward = () => {
    const newMatrix = [...matrix];
    const [player, [x, y]] = lastMoves[lastMoves.length - replayIndex];
    newMatrix[x][y] = player;
    checkWinner(newMatrix, [x, y]);
    swapMoves();
    setReplayIndex(replayIndex - 1);
  };

  const handleNewGame = () => {
    setMatrix(initialMatrix);
    setWinningPlayer(undefined);
    setWinningStreak(undefined);
    setTurn(startingPlayer);
    setLastMoves([]);
    setReplayIndex(0);
  };

  const handleCellClick = (x: number, y: number, event: React.MouseEvent) => {
    if (matrix[x][y]) return;
    if (winningPlayer) return;
    const newMatrix = matrix.map((row, i) => {
      if (i !== x) return row;
      return row.map((cell, j) => {
        if (j !== y) return cell;
        return turn;
      });
    });
    setMatrix(newMatrix);
    checkWinner(newMatrix, [x, y], event);
    swapMoves();
    if (replayIndex > 0) {
      setLastMoves([...lastMoves.slice(0, -replayIndex), [turn, [x, y]]]);
      setReplayIndex(0);
    } else {
      setLastMoves([...lastMoves, [turn, [x, y]]]);
    }
  };

  return (
    <section className="w-full p-6 md:max-w-4xl md:p-0">
      <div className="mt-6 m-auto xl:max-w-xl">
        <div className="text-gray-50 flex justify-center items-center mx-auto mb-2 text-xl">
          <button
            className="mr-auto cursor-pointer bg-gray-600 hover:bg-gray-700 rounded px-2 py-1"
            onClick={handleNewGame}
          >
            New
          </button>
          <button
            className="cursor-pointer bg-gray-600 hover:bg-gray-700 rounded px-2"
            onClick={handleGoBack}
          >
            {"<"}
          </button>
          <button
            className="cursor-pointer bg-gray-600 hover:bg-gray-700 rounded px-2 ml-2"
            onClick={handleGoForward}
            disabled={replayIndex === 0}
          >
            {">"}
          </button>
        </div>
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}
        >
          {matrix.map((row, x) => {
            return row.map((cell, y) => {
              const isPartOfWinningStreak = !!winningStreak?.find(
                ([wx, wy]) => wx === x && wy === y
              );
              return (
                <div
                  key={`cell_${x}_${y}`}
                  className={`cell cursor-pointer rounded-sm flex items-center justify-center bg-gray-700`}
                  style={{ aspectRatio: "1" }}
                  onClick={(e) => {
                    handleCellClick(x, y, e);
                  }}
                >
                  {cell && (
                    <div
                      className={getCellClassName(cell, isPartOfWinningStreak)}
                    />
                  )}
                </div>
              );
            });
          })}
        </div>
      </div>
    </section>
  );
};

export default Board;
