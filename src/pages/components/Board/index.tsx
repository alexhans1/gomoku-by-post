import React, { useState } from "react";
import party from "party-js";
import { boardSize } from "../../../constants";
import { Matrix, Player, Position } from "../../../interfaces";
import { isGameOver } from "../../../utils/game";
import "./styles.scss";

const classNameMap = { x: "boardCellCross", o: "boardCellCircle" };
const initialMatrix = Array(boardSize).fill(Array(boardSize).fill(null));
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
    <section>
      <div className="board">
        <div className="text-white flex justify-center items-center mx-auto mb-2">
          <button
            className="mr-auto cursor-pointer bg-green-600 hover:bg-green-700 rounded px-2 py-1"
            onClick={handleNewGame}
          >
            New
          </button>
          <button
            className="cursor-pointer bg-green-600 hover:bg-green-700 rounded px-2"
            onClick={handleGoBack}
          >
            {"<"}
          </button>
          <button
            className="cursor-pointer bg-green-600 hover:bg-green-700 rounded px-2 ml-2"
            onClick={handleGoForward}
            disabled={replayIndex === 0}
          >
            {">"}
          </button>
        </div>
        {matrix.map((row, x) => {
          return (
            <div key={`row_${x}`} className="boardRow">
              {row.map((cell, y) => {
                const isPartOfWinningStreak = !!winningStreak?.find(
                  ([wx, wy]) => wx === x && wy === y
                );
                return (
                  <div
                    key={`cell_${x}_${y}`}
                    className={`boardCol cursor-pointer ${
                      isPartOfWinningStreak ? "bg-green-100" : ""
                    }`}
                    onClick={(e) => {
                      handleCellClick(x, y, e);
                    }}
                  >
                    <div className={classNameMap[cell]} />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Board;
